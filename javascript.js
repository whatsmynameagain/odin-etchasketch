

let gridSize = 41;
let containerSize = 480;
let showBorders = true;
let bordersCSS, hoveredCell, hoveredBtn, mouseDown, btnHeld, btnInterval;


const container = document.querySelector('#container')
const bordersCheckbox = document.querySelector('#bordersCheckbox')
bordersCheckbox.checked = true;

const gridSizeLabel = document.querySelector("#gridsize");
const btnGridSizeDown = document.querySelector("#gsizedown");
const btnGridSizeUp = document.querySelector("#gsizeup");


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


//intervals are being created en masse after multiple clicks and not cleared

btnGridSizeDown.addEventListener('mouseup', (e) => { 
    mouseDown = true;
    hoveredBtn = e.target;
    setTimeout(() => {
        btnInterval = setInterval( () => {
            if (mouseDown && gridSize > 1 && hoveredBtn === e.target) {
                gridSize--;
                gridSizeLabel.textContent = `Grid size: ${gridSize}`;
            } else {
                clearInterval(btnInterval);
            } 
            btnGridSizeDown.disabled = gridSize == 1 ? true : false;
            btnGridSizeUp.disabled = gridSize == 100 ? true : false;
        }, 
    100 );  
    }, 200);
})
btnGridSizeDown.addEventListener('click', () => {
    clearInterval(btnInterval); 
    if (gridSize > 1) { gridSize-- };
    btnGridSizeDown.disabled = gridSize == 1 ? true : false;
    btnGridSizeUp.disabled = gridSize == 100 ? true : false;
    initialize();
});


btnGridSizeUp.addEventListener('mouseup', (e) => { 
    mouseDown = true;
    hoveredBtn = e.target;
    setTimeout(() => {
        btnInterval = setInterval( () => {
            console.log("test");
            if (mouseDown && gridSize < 100 && hoveredBtn === e.target) {
                gridSize++;
                gridSizeLabel.textContent = `Grid size: ${gridSize}`;
            } else {
                clearInterval(btnInterval);
            }
            btnGridSizeUp.disabled = gridSize == 100 ? true : false;
            btnGridSizeDown.disabled = gridSize == 1 ? true : false;
        }, 
    100 );
    }, 200);
})
btnGridSizeUp.addEventListener('click', () => { 
    clearInterval(btnInterval);
    if (gridSize < 100) { gridSize++ };
    btnGridSizeUp.disabled = gridSize == 100 ? true : false;
    btnGridSizeDown.disabled = gridSize == 1 ? true : false;
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
    for (let i=0; i<size*size; i++) {
        let childDiv = document.createElement('div');
        childDiv.classList.add("blockdefault");
        if (showBorders) { childDiv.classList.add("borders"); }
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