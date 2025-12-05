let container = document.querySelector("#container");
let styles = getComputedStyle(container);

let numPixels = 100;

let canvasSize = parseInt(styles.width);
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
        // pixel.style.border = '1px solid red';
        subContainer.appendChild(pixel);

        pixel.addEventListener("mousedown", () => {
            pixel.style.backgroundColor = 'red';
            isMouseDown = true;
        });

        pixel.addEventListener("mouseup", () => {
            isMouseDown = false;
        });

        pixel.addEventListener("mouseover", () => {
            if (isMouseDown) {
                pixel.style.backgroundColor = 'red';
            }
        });

    }
}


