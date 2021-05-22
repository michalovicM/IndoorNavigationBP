/**
*  Autocomplete engine for better search. Administrator can fill array grapfPlaces[]
 * with names of the places user can see.
**/

let graphPlaces = ["Hlavný Vchod", "Knižnica","Vrátnica E", "Podateľňa", "Jedáleň", "Bufet B", "Vrátnica A","Blok A"
    ,"Blok B","Blok C","Blok D","Blok E"];

function autocomplete(inp, arr) {
    let currentFocus;
    inp.addEventListener("input", function() {
        let auto, b, value = this.value;
        closeAllLists();
        if (!value) { return false;}
        currentFocus = -1;
        auto = document.createElement("DIV");
        auto.setAttribute("id", this.id + "autocomplete-list");
        auto.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(auto);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, value.length).toUpperCase() === value.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, value.length) + "</strong>";
                b.innerHTML += arr[i].substr(value.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function() {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                auto.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
            currentFocus++;
            addActiveClass(x);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActiveClass(x);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActiveClass(item) {
        if (!item) return false;
        removeActiveClass(item);
        if (currentFocus >= item.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (item.length - 1);
        item[currentFocus].classList.add("autocomplete-active");
    }
    function removeActiveClass(item) {
        for (let i = 0; i < item.length; i++) {
            item[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(element) {
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (element !== x[i] && element !== inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("mySource"), graphPlaces);
autocomplete(document.getElementById("myTarget"), graphPlaces);

function getNextFloor(){
    let floor;
    for( let x = 0; x < finalSVGArray.length; x++){
        if(currentStartID === finalSVGArray[x].ID) {
            if(currentStartID !== finalSVGArray[x+1].ID) {
                floor = finalSVGArray[x+1].ID;
                break;
            }
        }
    }
    return floor;
}
function getCaptionForNextFloor(){
    let floor = getNextFloor();
    if(captions[0][floor].caption.match(/prízemii/g))
        floor = 0;
    else if(captions[0][floor].caption.match(/-1/g))
        floor = -1;
    else if(captions[0][floor].caption.match(/-2/g))
        floor = -2;
    else {
        floor = captions[0][floor].caption.match(/\d/)[0];
    }
    return floor;
}
function getCaptionStairs(){
    let floor, prewFloor = getCaptionForNextFloor();
    if(captions[0][currentStartID].caption.match(/prízemii/g))
        floor = 0;
    else if(captions[0][currentStartID].caption.match(/-1/g))
        floor = -1;
    else if(captions[0][currentStartID].caption.match(/-2/g))
        floor = -2;
    else {
        floor = captions[0][currentStartID].caption.match(/\d/)[0];
    }
    if(floor > prewFloor)
        return "dolu";
    else
        return "hore";
}

function currentFloor(){
    let floor;
    if(captions[0][currentStartID].caption.match(/prízemii/g))
        floor = 0;
    else if(captions[0][currentStartID].caption.match(/-1/g))
        floor = -1;
    else if(captions[0][currentStartID].caption.match(/-2/g))
        floor = -2;
    else {
        floor = captions[0][currentStartID].caption.match(/\d/)[0];
    }
    return floor;
}