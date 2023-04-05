

let gridSize = 20;
let containerSize = 480;
let showBorders = true;
let bordersCSS, hoveredCell, hoveredBtn, mouseDown;

const container = document.querySelector('#container')
const bordersCheckbox = document.querySelector('#borderscheckbox')
bordersCheckbox.checked = true;
const gridSizeLabel = document.querySelector("#gridsize");
const btnClear = document.querySelector("#clear");
const sizeSlider = document.querySelector("#gridsizeslider");
sizeSlider.setAttribute("value", gridSize);


//draw or erase when hovering over a cell and pressing ctrl or shift
document.addEventListener('keydown', (e) => {
    if (!hoveredCell) { return };
    if (e.ctrlKey) { hoveredCell.classList.add("paintedblack") }  
    if (e.shiftKey) { hoveredCell.classList.remove("paintedblack") }
});


//draw when clicking on a cell
document.addEventListener('mousedown', (e) => { 
    mouseDown = true;
    if (!hoveredCell) { return };
    hoveredCell.classList.add("paintedblack");
});


document.addEventListener('mouseup', () => mouseDown = false);


//reset hoveredCell when the cursor exits the conainer
document.querySelector("#content").addEventListener('mouseover', () => {
    hoveredCell = null;
    hoveredBtn = null;
    //btnHeld = null;
});


//disable dragging
document.addEventListener("dragstart", (e) => {
    e.preventDefault();
})


bordersCheckbox.addEventListener('click', () => {
    showBorders = !showBorders;
    toggleBorders();
})


btnClear.addEventListener('click', () => {
    let children = document.querySelectorAll(".blockdefault");
    if (children.length != 0) { 
        children.forEach ( child => {
            child.removeAttribute("style");
            child.classList.remove("paintedblack");
            //this breaks once random colors are implemented
        })    
    }; 
})


function toggleBorders() {
    let children = document.querySelectorAll(".blockdefault");
    if (children.length != 0) { 
        children.forEach ( child => {
            child.classList.toggle("noborders") 
            child.classList.toggle("borders")
        })    
    }; 
}


sizeSlider.addEventListener('input', (e) => {
    gridSize = e.target.value
    gridSizeLabel.textContent = `Grid size: ${gridSize}`;
});

sizeSlider.addEventListener('mouseup', () => {
    initialize();
});


function fillContainer(size) {
    //clear existing blocks
    let children = document.querySelectorAll(".blockdefault");
    if (children.length != 0) { 
        children.forEach ( child => 
            child.remove() ) 
    }; 
    let blockSize = parseFloat((containerSize/gridSize).toFixed(4));
    let className = "borders";
    for (let i=0; i<size*size; i++) {
        let childDiv = document.createElement('div');
        childDiv.classList.add("blockdefault");
        //avoid overlapping borders between cells and the container 
        if (i == 0) { className = "noborders" }
        else if (i >= 0 && i <= size-1) { className = "borderstop"; }
        else if (i % size == 0) { className = "bordersleft"; }
        else { className = "borders"; };

        if (showBorders) { childDiv.classList.add(className); }
        else { childDiv.classList.add("noborders"); }
        childDiv.setAttribute("style", `
            height: ${blockSize}px; 
            width: ${blockSize}px;
            `
        );
        childDiv.addEventListener('mouseover', (e) => {
            hoveredCell = childDiv;
            //this fails if other colors are added inline
            //probably going to have to switch to all inline and keep the colors saved as variables
            if (e.ctrlKey || mouseDown) { e.target.classList.add("paintedblack") }  
            if (e.shiftKey) { e.target.classList.remove("paintedblack") }
            e.stopPropagation();
        });
        container.appendChild(childDiv);
    } 
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


initialize();