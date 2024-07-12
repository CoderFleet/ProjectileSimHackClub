const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const angleInput = document.getElementById('angle');
const velocityInput = document.getElementById('velocity');
const gravityInput = document.getElementById('gravity');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const angleValue = document.getElementById('angleValue');
const velocityValue = document.getElementById('velocityValue');
const gravityValue = document.getElementById('gravityValue');

let angle = parseInt(angleInput.value);
let velocity = parseInt(velocityInput.value);
let g = parseFloat(gravityInput.value);
let x = 0;
let y = canvas.height;
let t = 0;
let vx = velocity * Math.cos(angle * Math.PI / 180);
let vy = -velocity * Math.sin(angle * Math.PI / 180);

angleInput.addEventListener('input', () => {
  angle = parseInt(angleInput.value);
  angleValue.textContent = angle;
});

velocityInput.addEventListener('input', () => {
  velocity = parseInt(velocityInput.value);
  velocityValue.textContent = velocity;
});

gravityInput.addEventListener('input', () => {
  g = parseFloat(gravityInput.value);
  gravityValue.textContent = g.toFixed(2);
});

resetButton.addEventListener('click', () => {
  x = 0;
  y = canvas.height;
  t = 0;
  vx = velocity * Math.cos(angle * Math.PI / 180);
  vy = -velocity * Math.sin(angle * Math.PI / 180);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

startButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(draw);
});

function draw() {
  x += vx * t;
  y += vy * t + 0.5 * g * t * t;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#f00';
  ctx.fill();

  if (x < canvas.width && y > 0) {
    t += 0.1;
    requestAnimationFrame(draw);
  } else {
    x = 0;
    y = canvas.height;
    t = 0;
    vx = velocity * Math.cos(angle * Math.PI / 180);
    vy = -velocity * Math.sin(angle * Math.PI / 180);
  }
}
