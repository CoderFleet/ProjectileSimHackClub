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
const infoBox = document.getElementById('infoBox');

let angle = parseInt(angleInput.value);
let velocity = parseInt(velocityInput.value);
let g = parseFloat(gravityInput.value);
let x = 0;
let y = canvas.height;
let t = 0;
let vx = velocity * Math.cos(angle * Math.PI / 180);
let vy = -velocity * Math.sin(angle * Math.PI / 180);
let trajectory = [];

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
  trajectory = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateInfoBox();
});

startButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  trajectory = [];
  updateInfoBox();
  requestAnimationFrame(draw);
});

function draw() {
  x += vx * t;
  y += vy * t + 0.5 * g * t * t;

  trajectory.push({ x, y });

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw trajectory path
  ctx.beginPath();
  ctx.moveTo(trajectory[0].x, trajectory[0].y);
  for (let i = 1; i < trajectory.length; i++) {
    ctx.lineTo(trajectory[i].x, trajectory[i].y);
  }
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw projectile
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#f00';
  ctx.fill();

  // Update information box
  updateInfoBox();

  if (x < canvas.width && y > 0) {
    t += 0.1;
    requestAnimationFrame(draw);
  } else {
    x = 0;
    y = canvas.height;
    t = 0;
    vx = velocity * Math.cos(angle * Math.PI / 180);
    vy = -velocity * Math.sin(angle * Math.PI / 180);
    trajectory = [];
  }
}

function updateInfoBox() {
  infoBox.innerHTML = `
    <strong>Angle:</strong> ${angle} degrees<br>
    <strong>Velocity:</strong> ${velocity} m/s<br>
    <strong>Gravity:</strong> ${g.toFixed(2)} m/s²<br>
    <strong>Time:</strong> ${t.toFixed(1)} s<br>
    <strong>Position:</strong> (${x.toFixed(1)}, ${y.toFixed(1)})
  `;
}
