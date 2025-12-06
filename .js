let container = document.querySelector("#container");
let styles = getComputedStyle(container);
let slider = document.querySelector("#slider");
let sliderText = document.querySelector("#slide-container > p");

let canvasSize = parseInt(styles.width);
numPixels = slider.value;

function drawGrid(numPixels) {

    let pixelSize = canvasSize / numPixels;
    let isMouseDown = false;

    for (let i = 0; i < numPixels; i++) {
        let subContainer = document.createElement("div");
        subContainer.style.width = `${canvasSize}px`;
        subContainer.style.height = `${pixelSize}px`;
        subContainer.style.display = 'flex';
        container.appendChild(subContainer);
        for (let j = 0; j < numPixels; j++) {
            let pixel = document.createElement("div");
            pixel.style.width = `${pixelSize}px`;
            pixel.style.width = `${pixelSize}px`;
            subContainer.appendChild(pixel);

            pixel.addEventListener("mousedown", () => {
                pixel.style.backgroundColor = 'grey';
                isMouseDown = true;
            });

            pixel.addEventListener("mouseup", () => {
                isMouseDown = false;
            });

            pixel.addEventListener("mouseover", () => {
                if (isMouseDown) {
                    pixel.style.backgroundColor = 'grey';
                }
            });
        }
    }
}

drawGrid(numPixels);

slider.addEventListener("input", () => {
    sliderText.textContent = `${slider.value}x${slider.value}`;
    numPixels = slider.value;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    drawGrid(numPixels);
});



