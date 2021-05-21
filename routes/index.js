let express = require('express');
const bodyParser = require('body-parser');
let router = express.Router();

router.use(express.static(__dirname));

// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* Parsovanie JSON file */

const fs = require('fs');
let rawData = fs.readFileSync('jsonFiles/graph.json');
graph = JSON.parse(rawData);

let rawCoordinates = fs.readFileSync('jsonFiles/coordinates.json');
coordinates = JSON.parse(rawCoordinates);

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

router.post('/', function (req, res) {

    let shortestDistanceNode = (distances, visited) => {
        let shortest = null;
        for (let node in distances) {
            let currentIsShortest =
                shortest === null || distances[node] < distances[shortest];
            if (currentIsShortest && !visited.includes(node)) {
                shortest = node;
            }
        }
        return shortest;
    };
    
    let startNode = req.body.mySource;
    let endNode = req.body.myTarget;

    let j = 0; let i = 0;
    while (j < coordinates.coordinates.length ){
        if(endNode === coordinates.coordinates[j].place)
            break;
        j++;
    }
    while (i < coordinates.coordinates.length ){
        if(startNode === coordinates.coordinates[i].place)
            break;
        i++;
    }
    if(j >= coordinates.coordinates.length  && i >= coordinates.coordinates.length){
        res.send("invalidSourceAndTarget");
    }
    if (j >= coordinates.coordinates.length ){
        res.send("invalidTarget");
    }
    if (i >= coordinates.coordinates.length){
        res.send("invalidSource");
    }

    let distances = {};
    distances[endNode] = "Infinity";
    distances = Object.assign(distances, graph[startNode]);
    let parents = { endNode: null };
    for (let child in graph[startNode]) {
        parents[child] = startNode;
    }
    let visited = [];
    let node = shortestDistanceNode(distances, visited);
    while (node) {
        let distance = distances[node];
        let children = graph[node];
        for (let child in children) {
            if (String(child) === String(startNode)) {
                continue;
            } else {
                let newdistance = distance + children[child];
                if (!distances[child] || distances[child] > newdistance) {
                    distances[child] = newdistance;
                    parents[child] = node;
                }
            }
        }
        visited.push(node);
        node = shortestDistanceNode(distances, visited);
    }
    let shortestPath;
    shortestPath = [coordinates.coordinates[j]];
    let parent = parents[endNode];
    while (parent) {
        let i = 0;
        while(parent !== coordinates.coordinates[i].place ){
            i++;
        }
        shortestPath.push(coordinates.coordinates[i]);
        parent = parents[parent];
    }
    shortestPath.reverse();
    res.send(shortestPath);
});


module.exports = router;
