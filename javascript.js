

let gridSize = 16;

function fillContainer(size) {
    for (let i=0; i<size*size; i++) {
        let childDiv = document.createElement('div');
        childDiv.classList.add("block");
        document.querySelector('#container').appendChild(childDiv);
    }
}

fillContainer(gridSize);