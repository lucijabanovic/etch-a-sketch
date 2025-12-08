let container = document.querySelector("#container");
let styles = getComputedStyle(container);
let slider = document.querySelector("#slider");
let sliderText = document.querySelector("#slide-container > p");
let rainbow = document.querySelector("#rainbow");
let darken = document.querySelector("#darken");
let buttons = document.querySelectorAll(".button");
let erase = document.querySelector("#erase");
let clearBtn = document.querySelector("#clear");

let canvasSize = parseInt(styles.width);
let numPixels = slider.value;

let isRainbow = false;
let isDarken = false;
let isErase = false;
let prevNode = null;

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
            
            let darkStep = 0.1;

            pixel.addEventListener("mousedown", () => {
                if (isErase) {
                    pixel.style.backgroundColor = 'white';
                    darkStep = 0.1;
                } else if (isRainbow) {
                    pixel.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                } else if (isDarken) {
                    pixel.style.backgroundColor = `rgba(0, 0, 0, ${darkStep})`;
                    if (darkStep < 1) {
                        darkStep += 0.1;
                    }
                } else {
                    pixel.style.backgroundColor = 'black';
                }
                isMouseDown = true;
            });

            pixel.addEventListener("mouseup", () => {
                isMouseDown = false;
            });

            pixel.addEventListener("mouseover", () => {
                if (isMouseDown) {
                    if (isErase) {
                        pixel.style.backgroundColor = 'white';
                        darkStep = 0.1;
                    } else if (isRainbow) {
                        pixel.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                    } else if (isDarken) {
                        pixel.style.backgroundColor = `rgba(0, 0, 0, ${darkStep})`;
                        if (darkStep < 1) {
                            darkStep += 0.1;
                        }
                    } else {
                        pixel.style.backgroundColor = 'black';
                    }
                }
            });
        }
    }
}

function clear() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

drawGrid(numPixels);

slider.addEventListener("input", () => {
    sliderText.textContent = `${slider.value}x${slider.value}`;
    numPixels = slider.value;
    clear();
    drawGrid(numPixels);
});

clearBtn.addEventListener("click", () => {
    clear();
    drawGrid(numPixels);
});

erase.addEventListener("click", () => {
    if (isErase) {
        erase.classList.remove("active");
        if (prevNode != null) {
            prevNode.classList.add("active");
            if (prevNode.getAttribute("id") == "rainbow") {
                isRainbow = true;
            }
            if (prevNode.getAttribute("id") == "darken") {
                isDarken = true;
            }
        }

        isErase = false;
    } else {
        buttons.forEach((btn) => {
            if (btn.classList.contains("active")) {
                prevNode = btn;
            }
            btn.classList.remove("active");
        });
        erase.classList.add("active");
        isRainbow = false;
        isDarken = false;
        isErase = true;
    }
});

buttons.forEach(function(node) {
    if (node.getAttribute("id") != "erase" && node.getAttribute("id") != "clear") {
        node.addEventListener("click", () => {

            if (node.classList.contains("active")) {
                node.classList.remove("active");
                isDarken = false;
                isRainbow = false;
                prevNode = null;
            } else {
                buttons.forEach((btn) => {
                    btn.classList.remove("active");
                });

                node.classList.add("active");

                if (node.getAttribute("id") == "rainbow") {
                    isRainbow = true;
                    isDarken = false;
                    isErase = false;
                } else if (node.getAttribute("id") == "darken") {
                    isDarken = true;
                    isRainbow = false;
                    isErase = false;
                }
            }

            clear();
            drawGrid(numPixels);

        });
    }   
});






