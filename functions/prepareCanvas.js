/**
 * svgArray[]
 * SVG have to be sort like floorID = SVG Name = Index in svgArray
 * because we use concrete ID when drawing concrete path for concrete floor with concrete points
 * */
let svgArray = ["svg/A00.svg", "svg/B00.svg", "svg/C00.svg", "svg/D00.svg", "svg/E00.svg","svg/E01.svg",
    "svg/B01.svg","svg/C01.svg","svg/C11.svg","svg/E0N1.svg","svg/E0N2.svg","svg/E2NP.svg","svg/E2NP2.svg",
    "svg/E3NP.svg","svg/E3NP2.svg","svg/E4NP.svg","svg/E4NP2.svg","svg/E5NP.svg","svg/E5NP2.svg",
    "svg/E6NP.svg","svg/E6NP2.svg","svg/E7NP.svg","svg/E7NP2.svg","svg/E8NP.svg","svg/D2NP.svg","svg/D2NP2.svg",
    "svg/D3NP.svg","svg/D4NP.svg","svg/D4NP2.svg","svg/D5NP.svg","svg/D5NP2.svg","svg/D6NP.svg","svg/D6NP2.svg",
    "svg/D7NP.svg","svg/D7NP2.svg","svg/D8NP.svg","svg/C2NP.svg","svg/C2NP2.svg","svg/C3NP.svg","svg/C3NP2.svg",
    "svg/C4NP.svg","svg/C4NP2.svg","svg/C5NP.svg","svg/C5NP2.svg","svg/C6NP.svg","svg/C6NP2.svg","svg/C7NP.svg",
    "svg/C7NP2.svg","svg/C8NP.svg","svg/C9NP.svg","svg/B2NP.svg","svg/B2NP2.svg","svg/B3NP.svg","svg/B3NP2.svg",
    "svg/B4NP.svg","svg/B4NP2.svg","svg/B5NP.svg","svg/B5NP2.svg","svg/B6NP.svg","svg/B6NP2.svg",
    "svg/B7NP.svg","svg/B7NP2.svg","svg/B8NP.svg","svg/A2NP.svg","svg/A3NP.svg","svg/A3NP2.svg",
    "svg/A4NP.svg","svg/A4NP2.svg","svg/A5NP.svg","svg/A5NP2.svg","svg/A6NP.svg","svg/A6NP2.svg",
    "svg/A7NP.svg","svg/A7NP2.svg","svg/A8NP.svg","svg/A9NP.svg"];
/**
 * path for rendering
 */
let path = SVG(document.getElementById('path'));
let circle = SVG(document.getElementById('circle'));
let xFinish = SVG(document.getElementById('xFinish'));
/**
 * Create element for SVG
 */
let mySVG = document.getElementById('myImg');
/**
 * Set arrows next and previous invisible at the beginning
 */
let next = document.getElementById("next");
next.style.display = "none";
let prev = document.getElementById("prev");
prev.style.display = "none";

/**
 * In finalSVGArray we save concrete info about final path such as ID of the floor
 * or coordinates X and Y for rendering the path.
 * Data is selected from JSON file coordinates.json.
 * */

let currentStartID;
function prepareCanvas(){
    let checker = 0;
    currentStartID = finalSVGArray[0].ID;
    for(let node in finalSVGArray) {
        if(finalSVGArray[node].ID === currentStartID){
            checker++;
        }
    }
    if(checker === finalSVGArray.length){
        prev.style.display = "none";
        next.style.display = "none";
    }
    else{
        prev.style.display = "none";
        next.style.display = "block";
    }
}

function invalidInput(){
    $('path').remove();
    $('circle').remove();
    xFinish.clear();
    mySVG.setAttribute("src", "svg/startLogo.svg");
    prev.style.display = "none";
    next.style.display = "none";
}