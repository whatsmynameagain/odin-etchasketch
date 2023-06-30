
let gridSize = 20;
let containerSize = 480;
let showBorders = true;
let bordersCSS, hoveredCell, mouseDown;
let cellColor, blackRGB = "rgb(0, 0, 0)";
let whiteRGB = "rgb(255, 255, 255)"

const Modes = {
    Default : 0,
    Rainbow : 1,
    Shading : 2
}
let mode = Modes.Default;

const container = document.querySelector('#container')
const bordersCheckbox = document.querySelector('#borderscheckbox')
bordersCheckbox.checked = true;
const gridSizeLabel = document.querySelector("#gridsize");
const btnClear = document.querySelector("#clear");
const btnOptions = document.querySelector("#modes");
const sizeSlider = document.querySelector("#gridsizeslider");
sizeSlider.setAttribute("value", gridSize);


//draw or erase when hovering over a cell and pressing ctrl or shift
document.addEventListener('keydown', (e) => {
    if (!hoveredCell) { return }
    if (e.ctrlKey) { drawOnCell(hoveredCell) }  
    if (e.shiftKey) { hoveredCell.style.backgroundColor = whiteRGB }
});


//draw when clicking on a cell
document.addEventListener('mousedown', (e) => { 
    mouseDown = true;
    if (!hoveredCell) { return }
    drawOnCell(hoveredCell)
});


document.addEventListener('mouseup', () => mouseDown = false);


//reset hoveredCell when the cursor exits the conainer
document.querySelector("#content").addEventListener('mouseover', () => {
    hoveredCell = null;
});


//disable dragging
document.addEventListener("dragstart", (e) => {
    e.preventDefault();
});


bordersCheckbox.addEventListener('click', () => {
    showBorders = !showBorders;
    toggleBorders();
});


btnClear.addEventListener('click', () => {
    let children = document.querySelectorAll(".block");
    if (children.length) { 
        children.forEach ( child => {
            child.style.backgroundColor = whiteRGB;
        })    
    }
});


btnOptions.addEventListener("change", (e) => {
    switch (e.target.value) {
        case "default": 
            mode = Modes.Default;
            break;
        case "rainbow":
            mode = Modes.Rainbow;
            break;
        case "shading":
            mode = Modes.Shading;
            break;
        default:
            console.log("oh no");
    }
});


function toggleBorders() {
    let children = document.querySelectorAll(".block");
    if (children.length) { 
        //gotta go though all cells except the first one, and querySelectorAll returns a NodeList, which complicates things
        //so, gotta create an array from the NodeList and iterate through a sliced version that skips the first element
        Array.from(children).slice(1).forEach ( child => {
            child.classList.toggle("noborders") 
            child.classList.toggle("borders")
        })    
    }
}


sizeSlider.addEventListener('input', (e) => {
    gridSize = e.target.value
    gridSizeLabel.textContent = `Grid size: ${gridSize}`;
});


sizeSlider.addEventListener('mouseup', () => {
    initialize();
});


function randomInt(max) {
    return Math.floor(Math.random() * max);
}


function randomRGB() {
    return `rgb(${randomInt(256)}, ${randomInt(256)}, ${randomInt(256)})`;
}


function fillContainer(size) {
    //clear existing blocks
    let children = document.querySelectorAll(".block");
    if (children.length != 0) { 
        children.forEach ( child => 
            child.remove() ) 
    }
    let blockSize = parseFloat((containerSize/gridSize).toFixed(4));
    let className = "borders";
    for (let i=0; i<size*size; i++) {
        let childDiv = document.createElement('div');
        childDiv.classList.add("block");
        //avoid overlapping borders between cells and the container 
        if (i == 0) { className = "noborders" }
        else if (i >= 0 && i <= size-1) { className = "borderstop"; }
        else if (i % size == 0) { className = "bordersleft"; }
        else { className = "borders"; }

        if (showBorders) { childDiv.classList.add(className); }
        else { childDiv.classList.add("noborders"); }
        childDiv.setAttribute("style", `
            height: ${blockSize}px; 
            width: ${blockSize}px;
            `
        );
        childDiv.addEventListener('mouseover', (e) => {
            hoveredCell = childDiv;
            if (e.ctrlKey || mouseDown) { drawOnCell(e.target) } 
            if (e.shiftKey) { e.target.style.backgroundColor = whiteRGB}
            
            e.stopPropagation();
        });
        container.appendChild(childDiv);
    } 
}


//assumes cell.style.backgroundColor is either in 'rgb(r, g, b)' format or null
//could add an option for reverse shading (lighten) eventually
function drawOnCell(cell) {
    switch (mode) {
        case Modes.Rainbow:
            cellColor = randomRGB();
            break;
        case Modes.Shading:
            if (cell.style.backgroundColor) { 
                const values = getRGBValue(cell.style.backgroundColor);
                let clampedValues = values.map((n) => Math.min(Math.max(n-26, 0), 255)); //just in case css complains about < 0 or > 255 values
                cellColor = `rgb(${clampedValues[0]}, ${clampedValues[1]}, ${clampedValues[2]})`
            } else {
                cellColor = 'rgb(229, 229, 229)';
            }
            break;
        case Modes.Default:
            cellColor = blackRGB;        
    }
    cell.style.backgroundColor = cellColor;
}


function getRGBValue(str) {
    return str.substring(4, str.length-1) //remove 'rgb('  and ')'
            .replace(/ /g, '') //remove empty spaces
            .split(",") //create array splitting at ','
            .map(Number); //convert str numbers into... numbers
}


function initialize() {
    container.setAttribute("style", `
        width: ${containerSize}px;
        height: ${containerSize}px;
        grid-template-columns: repeat(${gridSize}, 1fr);
        grid-template-rows: repeat(${gridSize}, 1fr);
        `
    )   
    gridSizeLabel.textContent = `Grid size: ${gridSize}`;
    fillContainer(gridSize);
}

btnOptions.value = "default";
initialize();