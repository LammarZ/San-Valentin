const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const groundY = canvas.height - 180;

let seedY = 0;
let trunkHeight = 0;
let branches = [];
let hearts = [];
let crownCreated = false;

/* 🌱 SEMILLA */
function drawSeed() {
  ctx.fillStyle = "#5c2b18";
  ctx.beginPath();
  ctx.arc(centerX, seedY, 6, 0, Math.PI * 2);
  ctx.fill();
}

/* 🌳 TRONCO */
function drawTrunk() {
  ctx.fillStyle = "#6b2e1a";
  ctx.fillRect(centerX - 20, groundY - trunkHeight, 40, trunkHeight);
}

/* 🌿 CREAR RAMAS */
function createBranches() {
  for (let i = 0; i < 10; i++) {
    branches.push({
      angle: -Math.PI/2 + (Math.random() - 0.5),
      length: 0,
      maxLength: 80 + Math.random() * 60,
      side: i % 2 === 0 ? -1 : 1,
      heartSpawned: false
    });
  }
}

/* 🌿 DIBUJAR RAMAS */
function drawBranches() {
  ctx.strokeStyle = "#6b2e1a";
  ctx.lineWidth = 6;

  branches.forEach(branch => {
    if (branch.length < branch.maxLength) {
      branch.length += 1.2;
    }

    const startX = centerX;
    const startY = groundY - trunkHeight + 40;

    const endX = startX + branch.side * branch.length;
    const endY = startY - branch.length * 0.8;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    /* ❤️ Aparecen corazones cuando la rama madura */
    if (branch.length > branch.maxLength * 0.8 && !branch.heartSpawned) {
      for (let i = 0; i < 15; i++) {
        hearts.push({
          x: endX + (Math.random() - 0.5) * 40,
          y: endY + (Math.random() - 0.5) * 40,
          size: 6 + Math.random() * 6,
          hue: Math.random() * 360
        });
      }
      branch.heartSpawned = true;
    }
  });
}

/* ❤️ DIBUJAR CORAZÓN */
function drawHeart(x, y, size, hue) {
  ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
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

/* 🌈 COPA PROGRESIVA */
function growCrown() {
  if (hearts.length < 400) {
    for (let i = 0; i < 5; i++) {
      hearts.push({
        x: centerX + (Math.random() - 0.5) * 350,
        y: groundY - trunkHeight - 120 + (Math.random() - 0.5) * 200,
        size: 6 + Math.random() * 8,
        hue: Math.random() * 360
      });
    }
  }
}

/* 🎬 ANIMACIÓN */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (seedY < groundY) {
    seedY += 3;
    drawSeed();
  } else {

    if (trunkHeight < 240) {
      trunkHeight += 1.5;
    } else if (branches.length === 0) {
      createBranches();
    }

    drawTrunk();
    drawBranches();

    /* corazones con color suave */
    hearts.forEach(heart => {
      heart.hue += 0.2; // cambio MUY suave
      drawHeart(heart.x, heart.y, heart.size, heart.hue);
    });

    if (trunkHeight >= 240) {
      growCrown();
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
