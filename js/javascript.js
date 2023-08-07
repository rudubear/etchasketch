//Constants for setting page to default colors and gridsize
const DEFAULT_MARKER_COLOR = "white"
const DEFAULT_SIDE_PANEL_COLOR = "brown";
const DEFAULT_SQUARE_HOVER_COLOR = "darkorange";
const DEFAULT_PAGE_BG_COLOR = "blanchedalmond";
const DEFAULT_BODY_COLOR = "burlywood";
const DEFAULT_GRID_SIDE_LENGTH = 16;


const etchASketchPad = document.getElementById("etchASketch")
const gridSideLength = 33;
const dontTriggerDefault = (e) => {e.preventDefault()};

let mouseButtonIsPressed = undefined;


etchASketchPad.addEventListener("mousemove", captureMouseButtonState);
etchASketchPad.addEventListener("drag", (e) => {console.log(e)});
etchASketchPad.addEventListener("dragstart", dontTriggerDefault);


populateEtchASketch(DEFAULT_GRID_SIDE_LENGTH);


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
        markSquares(e, DEFAULT_MARKER_COLOR);
    }
}

function markSquares(e, MARKER_COLOR) {
    const selectedSquare = e.srcElement;
    selectedSquare.style.backgroundColor = MARKER_COLOR;
}

function setGridSize(){
    let newGridSize = prompt("Please Enter a new Grid Length (1-100");
    if (Number.isInteger(Number(newGridSize))) {
        etchASketchPad.textContent = "";
        populateEtchASketch(newGridSize);
    }
}

function populateEtchASketch(gridSideLength){
    console.log(`Populating Etch-A-Sketch Grid at ${gridSideLength}x${gridSideLength}`);
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



