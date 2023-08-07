//Constants for setting page to default colors and gridsize
const DEFAULT_MARKER_COLOR = "white"
const DEFAULT_SIDE_PANEL_COLOR = "brown";
const DEFAULT_SQUARE_HOVER_COLOR = "darkorange";
const DEFAULT_PAGE_BG_COLOR = "blanchedalmond";
const DEFAULT_ETCHASKETCH_COLOR = "burlywood";
const DEFAULT_GRID_SIDE_LENGTH = 16;

let isRandomMarkerColor = false ;
let mouseButtonIsPressed = undefined;

const etchASketchPad = document.getElementById("etchASketch")
const dontTriggerDefault = (e) => {e.preventDefault()};
const toggleRandomColorsButton = document.getElementById("btn_toggleRandomColors");
const selectedColor = document.getElementById("selectedColor");



etchASketchPad.addEventListener("mousemove", captureMouseButtonState);
etchASketchPad.addEventListener("drag", (e) => {console.log(e)});
etchASketchPad.addEventListener("dragstart", dontTriggerDefault);


populateEtchASketch(DEFAULT_GRID_SIDE_LENGTH);

function populateEtchASketch(gridSideLength){
    console.log(`Populating Etch-A-Sketch Grid at ${gridSideLength}x${gridSideLength}`);
    for(let x = 0; x< gridSideLength**2 ; x++){
        const square = document.createElement('div');
        square.classList += `square`;
        
        //square.style.backgroundColor = DEFAULT_ETCHASKETCH_COLOR;
        //adding an XY coordinate mapping via attributes to the divs. No use for these right now but might use them later.
        square.setAttribute("data-coordX",`${x % gridSideLength}`);
        square.setAttribute("data-coordY",`${Math.floor(x/gridSideLength)}`);
        
        //setting growth and shrinkage of squares
        const squareSideLengthFlexBasis = Math.floor((100/gridSideLength) * 100) / 100;
        square.style.flexBasis = `${squareSideLengthFlexBasis}%`;
        square.style.flexGrow = 1;
        etchASketchPad.appendChild(square);
    }
}


function captureMouseButtonState(e){
    if (e.buttons > 0) {
        mouseButtonIsPressed = true;
    }
    else if (e.buttons === 0) {
        mouseButtonIsPressed = false;
    }
    else {
        console.log("what happened here");
    }
    //console.log(mouseButtonIsPressed);
    if(mouseButtonIsPressed) {
        markSquares(e, isRandomMarkerColor ? getRandomColor() : DEFAULT_MARKER_COLOR);
    }
}

function markSquares(e, MARKER_COLOR) {
    const selectedSquare = e.srcElement;
    selectedSquare.style.backgroundColor = MARKER_COLOR;
    getRandomColor();
}

function getRandomColor(){
    let red = Math.floor(Math.random()*255);
    let green = Math.floor(Math.random()*255);
    let blue = Math.floor(Math.random()*255);
    console.log(`R = ${red} G = ${green} B = ${blue}`);
    return `rgb(${red},${green},${blue})`;
}

function toggleRandomColors(){
    if(isRandomMarkerColor) {
        isRandomMarkerColor = false;
        toggleRandomColorsButton.textContent = "Single Color";
    }
    else {
        isRandomMarkerColor = true;
        toggleRandomColorsButton.textContent = "Random Color";
    }

    console.log(selectedColor);
}

function setMarkerColor(){
//TODO:
}

function resetEtchASketch(){
    populateEtchASketch(DEFAULT_GRID_SIDE_LENGTH);
    isRandomMarkerColor = false;
    toggleRandomColorsButton.textContent = "Random Color";
}

function setGridSize(){
    let newGridSize = prompt("Please Enter a new Grid Length (1-100");
    if (Number.isInteger(Number(newGridSize)) && newGridSize !== "" && newGridSize !== null) {
        etchASketchPad.textContent = "";
        populateEtchASketch(newGridSize);
    }
    else {
        etchASketchPad.textContent = "";
        populateEtchASketch(DEFAULT_GRID_SIDE_LENGTH);
    }
}



