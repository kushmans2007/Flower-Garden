const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const gallery = document.getElementById("gallery");

let drawing = false;
let currentColor = document.getElementById("colorPicker").value;
let isEraser = false;

// Load saved flowers on page load
window.onload = loadFlowers;

// Drawing Events
canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
});
canvas.addEventListener("mousemove", draw);

document.getElementById("colorPicker").addEventListener("input", function() {
    currentColor = this.value;
    isEraser = false;
});

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = isEraser ? "white" : currentColor;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function setBrush() {
    isEraser = false;
}

function setEraser() {
    isEraser = true;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveFlower() {
    const name = document.getElementById("flowerName").value;
    if (name === "") {
        alert("Please enter flower name 🌸");
        return;
    }

    const imageData = canvas.toDataURL();
    const flower = { name: name, image: imageData };

    let flowers = JSON.parse(localStorage.getItem("flowers")) || [];
    flowers.push(flower);
    localStorage.setItem("flowers", JSON.stringify(flowers));

    displayFlower(flower);
    clearCanvas();
    document.getElementById("flowerName").value = "";
}

function loadFlowers() {
    let flowers = JSON.parse(localStorage.getItem("flowers")) || [];
    flowers.forEach(displayFlower);
}

function displayFlower(flower) {
    const div = document.createElement("div");
    div.className = "gallery-item";

    div.innerHTML = `
        <img src="${flower.image}">
        <p>${flower.name}</p>
    `;

    gallery.appendChild(div);
}