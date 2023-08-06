const MARKER_COLOR = "white"
const SIDE_PANEL_COLOR = "brown";
const SQUARE_HOVER_COLOR = "darkorange";
const PAGE_BG_COLOR = "blanchedalmond";
const BODY_COLOR = "burlywood";


const etchASketchPad = document.getElementById("etchASketch")
const gridSideLength = 16;

let mouseButtonIsPressed = undefined;

etchASketchPad.addEventListener("mousemove", captureMouseButtonState);

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
    console.log(mouseButtonIsPressed);

    if(mouseButtonIsPressed) {
        markSquares(e);
    }
}

function markSquares(e) {
    const selectedSquare = e.srcElement;
    selectedSquare.style.backgroundColor = MARKER_COLOR;

}


etchASketchPad.addEventListener("click",markSquare)
etchASketchPad.addEventListener("mousedown", mouseDownFunction);

function mouseDownFunction(e) {
    //console.log(e);
    console.log(e.srcElement);
    const markedSquare = e.srcElement;
    markedSquare.style.backgroundColor = MARKER_COLOR;

    //const selectedSquare = document.querySelector(`div[data-coordX]`)
}

function markSquare(e) {
    console.log(e)
}

console.log(etchASketchPad);

populateEtchASketch();

function populateEtchASketch(){
    for(let x = 0; x< gridSideLength**2 ; x++){
        const square = document.createElement('div');
        square.classList += `square`;
        
        //adding an XY coordinate mapping via attributes to the divs. No use for these right now but might use them later.
        square.setAttribute("data-coordX",`${x % gridSideLength}`);
        square.setAttribute("data-coordY",`${Math.floor(x/gridSideLength)}`);
        const squareSideLengthFlexBasis = Math.round((100/gridSideLength) * 100) / 100;
        //console.log(newFlexBasis);
        square.style.flexBasis = `${squareSideLengthFlexBasis}%`;
        etchASketchPad.appendChild(square);
    }
}



