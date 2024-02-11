///SCROLL EFFECT
let textTimeouts = {}; // Object to store timeouts for all text elements
let scrollTimeout; // Timeout for detecting when scrolling stops

// Function to replace text with random numbers
function replaceWithRandomNumbers(elementSelector) {
    const element = document.querySelector(elementSelector);
    const originalText = element.dataset.originalText;

    // Split the original text into an array of words
    const words = originalText.split(' ');

    // Generate random numbers for each word
    const randomNumbers = words.map(word => {
        // If the word contains punctuation, keep it as is
        if (/[.,!?]/.test(word)) return word;
        // Generate a random number between 0 and 9999
        return Math.floor(Math.random() * 10000);
    });

    // Replace the text content with the random numbers
    element.textContent = randomNumbers.join(' ');

    // Schedule the next update
    clearTimeout(textTimeouts[elementSelector]); // Clear the previous timeout
    textTimeouts[elementSelector] = setTimeout(() => revertToOriginalText(element), 5); // Revert text back after 200ms of inactivity
}

// Function to revert text back to original content
function revertToOriginalText(element) {
    element.textContent = element.dataset.originalText;
}

// Function to handle scrolling
function handleScroll() {
    clearTimeout(scrollTimeout); // Clear the timeout for detecting scrolling stops
    const textElements = document.querySelectorAll('.first-text, .about-text, .impossible-text, .impossible-content, .impossible-contentB, .time-altering-content, .try-now-content, .pF, .pS, .AND, .top-text, .top-textC, .top-textB, .bn, .crypto2x-text, .discription-title, .time-manipulation-text, .time-manipulation-text05');

    textElements.forEach(element => {
        replaceWithRandomNumbers("." + element.classList[0]); // Replace the text
        clearTimeout(textTimeouts["." + element.classList[0]]); // Clear the timeout for this element
    });

    // Set a new timeout to detect scrolling stops
    scrollTimeout = setTimeout(() => {
        // Revert all text elements to their original content
        textElements.forEach(element => revertToOriginalText(element));
    }, 5); // Wait for 200ms to consider scrolling stopped
}

// Listen for scroll events
window.addEventListener("scroll", handleScroll);

// Replace the text with random numbers initially if it's already in view on page load
window.addEventListener("load", function () {
    const textElements = document.querySelectorAll('.first-text, .about-text, .impossible-text, .impossible-content, .impossible-contentB, .time-altering-content, .try-now-content, .pF, .pS, .AND, .top-text, .top-textC, .top-textB, .bn, .crypto2x-text, .discription-title, .time-manipulation-text, .time-manipulation-text05');

    textElements.forEach(element => {
        element.dataset.originalText = element.textContent.trim(); // Store original text
        replaceWithRandomNumbers("." + element.classList[0]); // Replace the text initially
    });
});


//CLOCK 


let particles = [];
let circleRadius = 300; // Radius of the circle
let numParticles = 4000; // Total number of particles

let hourHandLength = 0.5 * circleRadius;
let minuteHandLength = 0.8 * circleRadius;
let secondHandLength = 0.9 * circleRadius;

let stepSize = 5; // Adjust the step size to space out particles along the clock hands
let interactionRadius = 100; // Interaction radius for the hover effect
let repulsionStrength = 20; // Strength of the repulsion force
let attractionStrength = 50; // Strength of the attraction force

function setup() {
    let canvas = createCanvas(windowWidth , windowHeight); // Set canvas size based on the diameter of the clock
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2); // Center the canvas within the window
    canvas.style('z-index', '-1'); // Place canvas behind other elements

    // Create particles inside the circle with varying density
    for (let i = 0; i < numParticles; i++) {
        // Calculate angle based on the current particle index
        let angle = map(i, 0, numParticles, 0, TWO_PI);
        // Calculate radius based on polar coordinates to increase density towards the center
        let r = circleRadius * sqrt(random()); // random() returns a value between 0 and 1
        // Convert polar coordinates to Cartesian coordinates
        let x = width / 2 + r * cos(angle);
        let y = height / 2 + r * sin(angle);
        // Create particle
        particles.push(new Particle(x, y));
    }
}


function draw() {
    // Set background color to rgb(11, 11, 11) again to refresh the background on every frame
    background(11, 11, 11);

    // Calculate current time
    let h = hour();
    let m = minute();
    let s = second();

    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display();
        particle.hover(mouseX, mouseY);
    }

    // Draw clock hands
    drawClockHands(h, m, s);
}

function drawClockHands(h, m, s) {
    // Hour hand
    let hourAngle = map(h % 12, 0, 12, 0, TWO_PI) - HALF_PI;
    drawLine(width / 2, height / 2, hourHandLength, hourAngle, 2, stepSize, 255); // White color

    // Minute hand
    let minuteAngle = map(m, 0, 60, 0, TWO_PI) - HALF_PI;
    drawLine(width / 2, height / 2, minuteHandLength, minuteAngle, 2, stepSize, 255); // White color

    // Second hand
    let secondAngle = map(s, 0, 60, 0, TWO_PI) - HALF_PI;
    drawLine(width / 2, height / 2, secondHandLength, secondAngle, 1, stepSize, 255); // White color
}

function hoverEffect(x, y, length, angle) {
    let distance = dist(x, y, mouseX, mouseY);
    if (distance < interactionRadius) {
        let force = p5.Vector.sub(createVector(mouseX, mouseY), createVector(x, y)); // Calculate the force vector (repulsion)
        force.normalize();
        let strength = map(distance, 0, interactionRadius, -attractionStrength, repulsionStrength); // Map distance to strength (attract if distance < interactionRadius)
        force.mult(strength); // Apply the force to the particle
        x += force.x;
        y += force.y;
    }
}

function drawLine(x, y, length, angle, weight, stepSize, strokeColor) {
    for (let i = 0; i <= length; i += stepSize) {
        let x1 = x + cos(angle) * i;
        let y1 = y + sin(angle) * i;
        let x2 = x + cos(angle) * (i + stepSize);
        let y2 = y + sin(angle) * (i + stepSize);
        strokeWeight(weight);
        stroke(strokeColor); // Set stroke color
        line(x1, y1, x2, y2);
    }
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.angle = atan2(y - height / 2, x - width / 2); // Initial angle relative to the center of the circle
        this.speed = map(dist(x, y, width / 2, height / 2), 0, circleRadius, 0.00125, 0.005); // Speed based on distance from center (quarter of the previous speed)
        this.size = 3; // Size of the square particle
    }

   
    update() {
        // Move the particle clockwise
        this.angle += this.speed;

        // Update position
        let newX = width / 2 + cos(this.angle) * dist(this.pos.x, this.pos.y, width / 2, height / 2);
        let newY = height / 2 + sin(this.angle) * dist(this.pos.x, this.pos.y, width / 2, height / 2);
        this.pos.set(newX, newY);
    }

    display() {
        noStroke();
        fill('#2EA658'); // Set particle color to #2EA658
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.size, this.size);
    }

    hover(mouseX, mouseY) {
        let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY); // Calculate the distance between the particle and the mouse cursor
        if (distance < interactionRadius) { // If the cursor is within the interaction radius
            let force = p5.Vector.sub(createVector(mouseX, mouseY), this.pos); // Calculate the force vector (repulsion)
            force.normalize(); // Normalize the force vector
            let strength = map(distance, 0, interactionRadius, 0, repulsionStrength); // Map distance to strength (attract if distance < interactionRadius)
            force.mult(strength); // Apply the force to the particle
            this.pos.add(force); // Update the position of the particle
        }
    }
}

