

let gridSize = 16;
let showBorders = true;
let bordersCSS;
const containerSize = 480;
const container = document.querySelector('#container')
const bordersCheckbox = document.querySelector('#bordersCheckbox')

bordersCheckbox.addEventListener('click', () => {
    showBorders = !showBorders;
    toggleBorders();
})

function toggleBorders() {
    let children = document.querySelectorAll(".blockdefault");
    if (children.length != 0) { 
        
        if (showBorders) {
            children.forEach ( child => {
                child.classList.remove("blocknoborders") 
                child.classList.add("blockborders")
            })
        } else {
            children.forEach ( child => {
                child.classList.remove("blockborders")
                child.classList.add("blocknoborders") 
            })
        }
        
        
    }; 
}

function fillContainer(size) {
    let children = document.querySelectorAll(".block");
    let blockSize = Math.floor(containerSize/gridSize);
    bordersCSS = showBorders ? "border: 1px solid grey;" : "";
    if (children.length != 0) { 
        children.foreach ( child => 
            child.remove() ) 
    }; 

    for (let i=0; i<size*size; i++) {
        let childDiv = document.createElement('div');
        childDiv.classList.add("blockdefault");
        childDiv.classList.add("blockborders");
       /* childDiv.setAttribute("style", `
            height: ${blockSize}px; 
            width: ${blockSize}px;
            `) 
        */
        container.appendChild(childDiv);
    }
 
    
}

fillContainer(gridSize);