const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const angleInput = document.getElementById('angle');
const velocityInput = document.getElementById('velocity');
const gravityInput = document.getElementById('gravity');
const airResistanceInput = document.getElementById('airResistance');
const speedInput = document.getElementById('speed');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const angleValue = document.getElementById('angleValue');
const velocityValue = document.getElementById('velocityValue');
const gravityValue = document.getElementById('gravityValue');
const airResistanceValue = document.getElementById('airResistanceValue');
const speedValue = document.getElementById('speedValue');
const infoBox = document.getElementById('infoBox');
const physicsProperties = document.getElementById('physicsProperties');

let angle = parseInt(angleInput.value);
let velocity = parseInt(velocityInput.value);
let g = parseFloat(gravityInput.value);
let airResistance = parseFloat(airResistanceInput.value);
let simulationSpeed = parseFloat(speedInput.value);
let x = 0;
let y = canvas.height;
let t = 0;
let vx = velocity * Math.cos(angle * Math.PI / 180);
let vy = -velocity * Math.sin(angle * Math.PI / 180);
let trajectory = [];

angleInput.addEventListener('input', () => {
  angle = parseInt(angleInput.value);
  angleValue.textContent = angle;
  updatePhysicsProperties();
});

velocityInput.addEventListener('input', () => {
  velocity = parseInt(velocityInput.value);
  velocityValue.textContent = velocity;
  updatePhysicsProperties();
});

gravityInput.addEventListener('input', () => {
  g = parseFloat(gravityInput.value);
  gravityValue.textContent = g.toFixed(2);
  updatePhysicsProperties();
});

airResistanceInput.addEventListener('input', () => {
  airResistance = parseFloat(airResistanceInput.value);
  airResistanceValue.textContent = airResistance.toFixed(2);
});

speedInput.addEventListener('input', () => {
  simulationSpeed = parseFloat(speedInput.value);
  speedValue.textContent = simulationSpeed.toFixed(1);
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
  const airResistanceFactor = -0.5 * airResistance * velocity;

  vx += airResistanceFactor * vx;
  vy += (g + airResistanceFactor * vy) * t;

  x += vx * t;
  y += vy * t + 0.5 * g * t * t;

  trajectory.push({ x, y });

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(trajectory[0].x, trajectory[0].y);
  for (let i = 1; i < trajectory.length; i++) {
    const point = trajectory[i];
    ctx.lineTo(point.x, point.y);
  }
  ctx.strokeStyle = getRandomColor();
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#f00';
  ctx.fill();

  updateInfoBox();

  if (x < canvas.width && y > 0) {
    t += 0.1 * simulationSpeed;
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
    <strong>Air Resistance:</strong> ${airResistance.toFixed(2)}<br>
    <strong>Simulation Speed:</strong> ${simulationSpeed.toFixed(1)}x<br>
    <strong>Time:</strong> ${t.toFixed(1)} s<br>
    <strong>Position:</strong> (${x.toFixed(1)}, ${y.toFixed(1)})
  `;
}

function updatePhysicsProperties() {
  const complementaryAngle = 90 - angle;
  const range = (velocity * velocity * Math.sin(2 * angle * Math.PI / 180)) / g;
  const maxHeight = (velocity * velocity * Math.pow(Math.sin(angle * Math.PI / 180), 2)) / (2 * g);
  const timeOfFlight = (2 * velocity * Math.sin(angle * Math.PI / 180)) / g;

  physicsProperties.innerHTML = `
    <li><strong>Complementary Angle:</strong> ${complementaryAngle.toFixed(2)} degrees</li>
    <li><strong>Range:</strong> ${range.toFixed(2)} meters</li>
    <li><strong>Maximum Height:</strong> ${maxHeight.toFixed(2)} meters</li>
    <li><strong>Time of Flight:</strong> ${timeOfFlight.toFixed(2)} seconds</li>
  `;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
