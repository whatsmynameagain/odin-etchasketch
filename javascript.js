

let gridSize = 20;
let containerSize = 480;
let showBorders = true;
let bordersCSS, hoveredCell, hoveredBtn, mouseDown, btnHeld;
let btnIntervalActive = false;

const container = document.querySelector('#container')
const bordersCheckbox = document.querySelector('#bordersCheckbox')
bordersCheckbox.checked = true;

const gridSizeLabel = document.querySelector("#gridsize");
const btnGridSizeDownFast = document.querySelector("#gsizedownfast");
const btnGridSizeDown = document.querySelector("#gsizedown");
const btnGridSizeUp = document.querySelector("#gsizeup");
const btnGridSizeUpFast = document.querySelector("#gsizeupfast");


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


btnGridSizeDownFast.addEventListener('mousedown', (e) => { 
    mouseDown = true;
    hoveredBtn = e.target;
    if (gridSize > 1) { gridSize-- };
    btnGridSizeDown.disabled = btnGridSizeDownFast.disabled = gridSize == 1 ? true : false;
    btnGridSizeUp.disabled = btnGridSizeUpFast.disabled = gridSize == 100 ? true : false;
    if (!btnIntervalActive) {
        btnIntervalActive = true;
        let btnInterval = setInterval( () => {
            if (mouseDown && gridSize > 1 && hoveredBtn === e.target) {
                gridSize--;
                gridSizeLabel.textContent = `Grid size: ${gridSize}`;
            } else {
                clearInterval(btnInterval);
                btnIntervalActive = false;
            } 
            btnGridSizeDown.disabled = btnGridSizeDownFast.disabled = gridSize == 1 ? true : false;
            btnGridSizeUp.disabled = btnGridSizeUpFast.disabled = gridSize == 100 ? true : false;
        }, 75 );  
    }
});
btnGridSizeDownFast.addEventListener('mouseup', (e) => { 
    initialize();
});
btnGridSizeDown.addEventListener('click', () => {
    if (gridSize > 1) { gridSize-- };
    btnGridSizeDown.disabled = btnGridSizeDownFast.disabled = gridSize == 1 ? true : false;
    btnGridSizeUp.disabled = btnGridSizeUpFast.disabled = gridSize == 100 ? true : false;
    initialize();
});


btnGridSizeUpFast.addEventListener('mousedown', (e) => { 
    mouseDown = true;
    hoveredBtn = e.target;
    if (gridSize < 100) { gridSize++ };
    btnGridSizeUp.disabled = btnGridSizeUpFast.disabled = gridSize == 100 ? true : false;
    btnGridSizeDown.disabled = btnGridSizeDownFast.disabled = gridSize == 1 ? true : false;
    if (!btnIntervalActive) {
        btnIntervalActive = true;
        let btnInterval = setInterval( () => {
            if (mouseDown && gridSize < 100 && hoveredBtn === e.target) {
                gridSize++;
                gridSizeLabel.textContent = `Grid size: ${gridSize}`;
            } else {
                clearInterval(btnInterval);
                btnIntervalActive = false;
            }
            btnGridSizeUp.disabled = btnGridSizeUpFast.disabled = gridSize == 100 ? true : false;
            btnGridSizeDown.disabled = btnGridSizeDownFast.disabled = gridSize == 1 ? true : false;
        }, 75 );
    }   
});
btnGridSizeUpFast.addEventListener('mouseup', (e) => { 
    initialize();
});
btnGridSizeUp.addEventListener('click', () => { 
    if (gridSize < 100) { gridSize++ };
    btnGridSizeUp.disabled = btnGridSizeUpFast.disabled = gridSize == 100 ? true : false;
    btnGridSizeDown.disabled = btnGridSizeDownFast.disabled = gridSize == 1 ? true : false;
    initialize();
});


bordersCheckbox.addEventListener('click', () => {
    showBorders = !showBorders;
    toggleBorders();
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