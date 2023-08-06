const DEFAULT_MARKER_COLOR = "white"
const DEFAULT_SIDE_PANEL_COLOR = "brown";
const DEFAULT_SQUARE_HOVER_COLOR = "darkorange";
const DEFAULT_PAGE_BG_COLOR = "blanchedalmond";
const DEFAULT_BODY_COLOR = "burlywood";


const etchASketchPad = document.getElementById("etchASketch")
const gridSideLength = 33;
const dontTriggerDefault = (e) => {e.preventDefault()};

let mouseButtonIsPressed = undefined;

etchASketchPad.addEventListener("mousemove", captureMouseButtonState);
etchASketchPad.addEventListener("drag", (e) => {console.log(e)});
etchASketchPad.addEventListener("dragstart", dontTriggerDefault);


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

console.log(etchASketchPad);

populateEtchASketch(16);

function setGridSize(){
    let newGridSize = prompt("Please Enter a new Grid Length (1-100");
    if (Number.isInteger(Number(newGridSize))) {
        etchASketchPad.textContent = "";
        populateEtchASketch(newGridSize);
        console.log(`resetting grid to ${newGridSize}x${newGridSize}`)
    }
    console.log(newGridSize);
}

function populateEtchASketch(gridSideLength){
    for(let x = 0; x< gridSideLength**2 ; x++){
        const square = document.createElement('div');
        square.setAttribute("draggable","false");

        square.classList += `square`;
        
        //adding an XY coordinate mapping via attributes to the divs. No use for these right now but might use them later.
        square.setAttribute("data-coordX",`${x % gridSideLength}`);
        square.setAttribute("data-coordY",`${Math.floor(x/gridSideLength)}`);
        const squareSideLengthFlexBasis = Math.floor((100/gridSideLength) * 100) / 100;
        //console.log(newFlexBasis);
        square.style.flexBasis = `${squareSideLengthFlexBasis}%`;
        etchASketchPad.appendChild(square);
    }
}



