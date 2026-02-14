const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let seedY = 0;
let growing = false;
let trunkHeight = 0;
let branches = [];
let hearts = [];
let hue = 0;

const centerX = canvas.width / 2;
const groundY = canvas.height - 150;

/* 🌱 SEMILLA */
function drawSeed() {
  ctx.fillStyle = "brown";
  ctx.beginPath();
  ctx.arc(centerX, seedY, 6, 0, Math.PI * 2);
  ctx.fill();
}

/* 🌳 TRONCO */
function drawTrunk() {
  ctx.fillStyle = "#6b2e1a";
  ctx.fillRect(centerX - 15, groundY - trunkHeight, 30, trunkHeight);
}

/* 🌿 RAMAS REALES */
function createBranches() {
  for (let i = 0; i < 8; i++) {
    branches.push({
      angle: -Math.PI/2 + (Math.random() - 0.5),
      length: 0,
      maxLength: 100 + Math.random() * 50,
      side: i % 2 === 0 ? -1 : 1
    });
  }
}

function drawBranches() {
  ctx.strokeStyle = "#6b2e1a";
  ctx.lineWidth = 6;

  branches.forEach(branch => {
    if (branch.length < branch.maxLength) branch.length += 1.5;

    const startX = centerX;
    const startY = groundY - trunkHeight + 50;

    const endX = startX + branch.side * branch.length;
    const endY = startY - branch.length * 0.8;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    if (branch.length >= branch.maxLength - 5) {
      hearts.push({
        x: endX,
        y: endY,
        size: 8 + Math.random() * 8
      });
    }
  });
}

/* ❤️ CORAZONES */
function drawHeart(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size,
                    x - size, y - size,
                    x - size, y);
  ctx.bezierCurveTo(x - size, y + size,
                    x, y + size * 1.5,
                    x, y + size * 2);
  ctx.bezierCurveTo(x, y + size * 1.5,
                    x + size, y + size,
                    x + size, y);
  ctx.bezierCurveTo(x + size, y - size,
                    x, y - size,
                    x, y);
  ctx.fill();
}

/* 🌈 COPA LLENA */
function createCrown() {
  for (let i = 0; i < 400; i++) {
    hearts.push({
      x: centerX + (Math.random() - 0.5) * 300,
      y: groundY - trunkHeight - 100 + (Math.random() - 0.5) * 200,
      size: 6 + Math.random() * 10
    });
  }
}

/* 🎬 ANIMACIÓN */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (seedY < groundY) {
    seedY += 4;
    drawSeed();
  } else {
    if (!growing) {
      growing = true;
    }

    if (trunkHeight < 220) {
      trunkHeight += 2;
    } else if (branches.length === 0) {
      createBranches();
    }

    drawTrunk();
    drawBranches();

    hearts.forEach((heart, index) => {
      hue += 0.05;
      const color = `hsl(${(hue + index) % 360}, 80%, 60%)`;
      drawHeart(heart.x, heart.y, heart.size, color);
    });

    if (hearts.length < 350 && trunkHeight >= 220) {
      createCrown();
    }
  }

  requestAnimationFrame(animate);
}

animate();

/* ⏳ CONTADOR */
const inicio = new Date("2023-01-01");

function actualizarContador() {
  const ahora = new Date();
  const diff = ahora - inicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("tiempo").innerText =
    `${dias} días, ${horas}h ${minutos}m ${segundos}s`;
}

setInterval(actualizarContador, 1000);
actualizarContador();
