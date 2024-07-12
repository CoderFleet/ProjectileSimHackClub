const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const angleInput = document.getElementById('angle');
const velocityInput = document.getElementById('velocity');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const angleValue = document.getElementById('angleValue');
const velocityValue = document.getElementById('velocityValue');

const g = 9.81; // gravitational acceleration (m/s^2)
let angle = parseInt(angleInput.value); // initial angle in degrees
let velocity = parseInt(velocityInput.value); // initial velocity in m/s

// Update angle value display
angleInput.addEventListener('input', () => {
  angle = parseInt(angleInput.value);
  angleValue.textContent = angle;
});

// Update velocity value display
velocityInput.addEventListener('input', () => {
  velocity = parseInt(velocityInput.value);
  velocityValue.textContent = velocity;
});

// Reset simulation
resetButton.addEventListener('click', () => {
  // Implement reset functionality (to be added in future stages)
});

// Start simulation
startButton.addEventListener('click', () => {
  // Implement start functionality (to be added in future stages)
});
