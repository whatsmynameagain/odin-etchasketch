

let gridSize = 41;
let containerSize = 480;
let showBorders = true;
let bordersCSS;

const container = document.querySelector('#container')
const bordersCheckbox = document.querySelector('#bordersCheckbox')
bordersCheckbox.checked = true;

const gridSizeLabel = document.querySelector("#gridsize");
const btnGridSizeDown = document.querySelector("#gsizedown");
const btnGridSizeUp = document.querySelector("#gsizeup");

btnGridSizeDown.addEventListener('click', () => { 
    if (gridSize > 1) {
        gridSize--
    }
    btnGridSizeDown.disabled = gridSize == 0 ? true : false;
    btnGridSizeUp.disabled = gridSize == 100 ? true : false;
    initialize();
})

btnGridSizeUp.addEventListener('click', () => { 
    if (gridSize < 100) {
        gridSize++
    } 
    btnGridSizeUp.disabled = gridSize == 100 ? true : false;
    btnGridSizeDown.disabled = gridSize == 0 ? true : false;
    
    
    initialize();
})

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


    //let blockSize = Math.floor(containerSize/gridSize);
    let blockSize = parseFloat((containerSize/gridSize).toFixed(4));
    console.log(blockSize);
    for (let i=0; i<size*size; i++) {
        let childDiv = document.createElement('div');
        childDiv.classList.add("blockdefault");
        if (showBorders) { childDiv.classList.add("borders"); }
        else {childDiv.classList.add("noborders");}
        
        childDiv.setAttribute("style", `
            height: ${blockSize}px; 
            width: ${blockSize}px;
            `
        );
        
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