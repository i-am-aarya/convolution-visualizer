// return a grid of size SIZE*SIZE, full of 0s
function initializeGrid(SIZE) {
    let grid = new Array(SIZE)
    for (let i=0; i<SIZE; i++) {
        grid[i] = new Array(SIZE).fill(0)
    }
    return grid
}

// console.log grid
function logGrid(grid) {
    grid.forEach((row, rowIndex) => {
        console.log(row.join(' '))
    })
}

// create cell
function createCell(element, defaultValue, classname, event, eventHandler) {
    let cell = document.createElement(element)
    cell.classList.add(classname)
    cell.addEventListener(event, eventHandler)
    cell.value = defaultValue
    return cell
}

// dot product
function getDotProduct(window, kernel) {
    let result = 0
    for(let i=0; i<KERNEL_SIZE; i++) {
        for(let j=0; j<KERNEL_SIZE; j++) {
            result += window[i][j] * kernel[i][j]
        }
    }
    return result
}