
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");

let reset = document.querySelector('span');
let imgBox = document.querySelector('.img-box');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// This selector is correct
let filters = document.querySelectorAll("ul li input");

// --- This part was fine ---
window.onload = function() {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}

upload.onchange = function() {
    // Reset filters every time a new image is uploaded
    resetFilters();

    // Show all the buttons and image box
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';

    // Read the file and set it as the image source
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function() {
        img.src = file.result;
    }
}

// This function runs when the img.src is set
img.onload = function() {
    // Set canvas dimensions to match the image
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // Hide the original <img> element so only the canvas is visible
    img.style.display = 'none';
}


// Function to apply all filters at once
function applyFilters() {
    
    // --- FIX 1: Apply filter directly to 'ctx', not 'ctx.style' ---
    ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
    `;

    // Re-draw the original image onto the canvas with the filters applied
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}


// Add an event listener to every slider
filters.forEach(filter => {
    filter.addEventListener('input', applyFilters);
});


// Functionality for Reset button
function resetFilters() {
    // Reset all the slider values to their defaults
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';

    // Remove all filters from the context
    ctx.filter = 'none';
    
    // Re-draw the original image (or apply the 'none' filter)
    applyFilters(); 
}

download.onclick = function() {
    
    download.href = canvas.toDataURL(); 
    
    
    download.download = 'edited-image.png'; 
}