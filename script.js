// get elements
const image_input_grid = document.getElementById("image-input-grid")
const convolution_parameters = document.getElementById("convolution-parameters")
const convolution_output_wrapper = document.getElementById("convolution-output-wrapper")
const kernel_input_grid = document.getElementById("kernel-input-grid")
const convolution_output_grid = document.getElementById("convolution-output-grid")

// define constants
const IMAGE_SIZE = 20
// update kernel definition if this is changed
const KERNEL_SIZE = 2
const OUTPUT_SIZE = 18

// setup image input grid in css
image_input_grid.style.display = `grid`
image_input_grid.style.gridTemplateRows = `repeat(${IMAGE_SIZE}, 1fr)`
image_input_grid.style.gridTemplateColumns = `repeat(${IMAGE_SIZE}, 1fr)`


// initialize grids
let image_grid = initializeGrid(IMAGE_SIZE)

// for KERNEL_SIZE = 3
// let kernel = [
//     [-1, 0, 1],
//     [-1, 0, 1],
//     [-1, 0, 1]
// ]

// for KERNEL_SIZE = 2
let kernel = [
    [-1, -1],
    [1, 1]
]
let output = initializeGrid(OUTPUT_SIZE)


// display image grid
image_grid.forEach((row, i) => {
    row.forEach((element, j) => {
        let cell = createCell('div', element, 'image-pixel', 'click', function () {
            image_grid[i][j] = image_grid[i][j] === 0 ? 1 : 0
            this.classList.toggle('active')
        })
        image_input_grid.appendChild(cell)
    })
})

// setup kernel input grid in css
kernel_input_grid.style.display = `grid`
kernel_input_grid.style.gridTemplateRows = `repeat(${KERNEL_SIZE}, 1fr)`
kernel_input_grid.style.gridTemplateColumns = `repeat(${KERNEL_SIZE}, 1fr)`

// display kernel grid
kernel.forEach((row, i) => {
    row.forEach((element, j) => {
        let cell = createCell('input', element, 'kernel-element', 'change', function() {
            kernel[i][j] = this.value
        })
        kernel_input_grid.appendChild(cell)
    })
})

// setup output grid in css
convolution_output_grid.style.display = `grid`
convolution_output_grid.style.gridTemplateRows = `repeat(${OUTPUT_SIZE}, 1fr)`
convolution_output_grid.style.gridTemplateColumns = `repeat(${OUTPUT_SIZE}, 1fr)`

// display output grid
function updateOutputGrid() {
    convolution_output_grid.innerHTML = ''
    output.forEach((row, i) => {
        row.forEach((element, j) => {
            let cell = createCell('div', element, 'output-pixel', () => {})

            let alpha = Math.abs(element)

            if (element>0) {
                cell.style.backgroundColor = `rgba(255, 0, 0, ${alpha})`
            } else if (element<0) {
                cell.style.backgroundColor = `rgba(0, 0, 255, ${alpha})`
            } else {
                cell.style.backgroundColor = `black`
            }

            convolution_output_grid.appendChild(cell)
        })
    })
}

// CONVOLUTION OPERATION
function applyConvolution() {
    for(let i=0; i<OUTPUT_SIZE; i++) {
        for(let j=0; j<OUTPUT_SIZE; j++) {
            let window = image_grid.slice(i, i+KERNEL_SIZE).map(row => row.slice(j, j+KERNEL_SIZE))
            output[i][j] = getDotProduct(window, kernel)
        }
    }
    updateOutputGrid()
}


updateOutputGrid()