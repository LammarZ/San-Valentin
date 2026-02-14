const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const groundY = canvas.height - 120;

let seedY = 0;
let trunkHeight = 0;
let branches = [];
let hearts = [];

function drawSeed() {
  ctx.fillStyle = "#5c2b18";
  ctx.beginPath();
  ctx.arc(centerX, seedY, 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawTrunk() {
  ctx.fillStyle = "#6b2e1a";
  ctx.fillRect(centerX - 18, groundY - trunkHeight, 36, trunkHeight);
}

function createBranches() {
  for (let i = 0; i < 12; i++) {
    branches.push({
      length: 0,
      maxLength: 60 + Math.random() * 60,
      side: i % 2 === 0 ? -1 : 1,
      heartSpawned: false
    });
  }
}

function drawBranches() {
  ctx.strokeStyle = "#6b2e1a";
  ctx.lineWidth = 5;

  branches.forEach(branch => {
    if (branch.length < branch.maxLength) {
      branch.length += 1.2;
    }

    const startX = centerX;
    const startY = groundY - trunkHeight + 40;

    const endX = startX + branch.side * branch.length;
    const endY = startY - branch.length * 0.9;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    if (branch.length > branch.maxLength * 0.8 && !branch.heartSpawned) {
      for (let i = 0; i < 8; i++) {
        hearts.push({
          x: endX + (Math.random() - 0.5) * 50,
          y: endY + (Math.random() - 0.5) * 50,
          size: 5 + Math.random() * 5,
          hue: Math.random() * 360
        });
      }
      branch.heartSpawned = true;
    }
  });
}

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

function growCrown() {
  if (hearts.length < 400) {
    for (let i = 0; i < 3; i++) {
      hearts.push({
        x: centerX + (Math.random() - 0.5) * 280,
        y: groundY - trunkHeight - 120 + (Math.random() - 0.5) * 200,
        size: 5 + Math.random() * 7,
        hue: Math.random() * 360
      });
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (seedY < groundY) {
    seedY += 3;
    drawSeed();
  } else {

    if (trunkHeight < 220) {
      trunkHeight += 1.3;
    } else if (branches.length === 0) {
      createBranches();
    }

    drawTrunk();
    drawBranches();

    hearts.forEach(heart => {
      heart.hue += 0.1;
      drawHeart(heart.x, heart.y, heart.size, heart.hue);
    });

    if (trunkHeight >= 220) {
      growCrown();
    }
  }

  requestAnimationFrame(animate);
}

animate();

const inicio = new Date("2023-06-08T00:00:00");

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
