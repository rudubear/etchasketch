const DEFAULT_GRID_SIDE_LENGTH = 16;
const DEFAULT_SELECTED_COLOR = "#CC0000";

let isRandomMarkerColor = false ;
let mouseButtonIsPressed = undefined;

const etchASketchPad = document.getElementById("etchASketch")
const dontTriggerDefault = (e) => {e.preventDefault()};
const toggleRandomColorsButton = document.getElementById("btn_toggleRandomColors");
const selectedColor = document.getElementById("selectedColor");
const myAudio = document.getElementById("myaudio");

etchASketchPad.addEventListener("mousemove", captureMouseButtonState);
etchASketchPad.addEventListener("drag", (e) => {console.log(e)});
etchASketchPad.addEventListener("dragstart", dontTriggerDefault);

populateEtchASketch(DEFAULT_GRID_SIDE_LENGTH);

function populateEtchASketch(gridSideLength){
    console.log(`Populating Etch-A-Sketch Grid at ${gridSideLength}x${gridSideLength}`);
    etchASketchPad.textContent = "";
    for(let x = 0; x< gridSideLength**2 ; x++){
        const square = document.createElement('div');
        square.classList += `square`;
        
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
    if(mouseButtonIsPressed) {
        markSquares(e, isRandomMarkerColor ? getRandomColor() : selectedColor["value"]);
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
    return `rgb(${red},${green},${blue})`;
}

function toggleRandomColors(){
    if(isRandomMarkerColor) {
        isRandomMarkerColor = false;
        toggleRandomColorsButton.textContent = "Random Color";
    }
    else {
        isRandomMarkerColor = true;
        toggleRandomColorsButton.textContent = "Single Color";
    }
}


function resetEtchASketch(){
    populateEtchASketch(DEFAULT_GRID_SIDE_LENGTH);
    isRandomMarkerColor = false;
    toggleRandomColorsButton.textContent = "Single Color";
    selectedColor["value"] = DEFAULT_SELECTED_COLOR;
}

function setGridSize(){
    let newGridSize = prompt("Please Enter a new Grid Length (1-100)");
    if (Number.isInteger(Number(newGridSize)) && newGridSize !== "" && newGridSize !== null) {
        populateEtchASketch(newGridSize);
    }
    else {
        populateEtchASketch(DEFAULT_GRID_SIDE_LENGTH);
    }
}

function toggleAudio(){
    console.log(myAudio);
    console.log(myAudio.duration);
    console.log(myAudio.currentTime);
    if(myAudio.currentTime){
        myAudio.pause();
        myAudio.currentTime = 0;
    }
    else {
        myAudio.play();
    }
}



