const etchASketchPad = document.getElementById("etchASketch")
const gridSideLength = 12;

etchASketchPad.addEventListener("click",markSquare)

console.log(etchASketchPad);

populateEtchASketch();

function populateEtchASketch(){
    for(let x = 0; x< gridSideLength**2 ; x++){
        const square = document.createElement('div');
        square.classList += `square`;
        const squareSideLengthFlexBasis = Math.round((100/gridSideLength) * 100) / 100;
        //console.log(newFlexBasis);
        square.style.flexBasis = `${squareSideLengthFlexBasis}%`;
        etchASketchPad.appendChild(square);
    }
}

function markSquare(e) {
    console.log(e)
}

