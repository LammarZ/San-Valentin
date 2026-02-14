const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ===== CONTADOR =====
const inicio = new Date("2023-06-08T00:00:00");

function actualizarContador() {
  const ahora = new Date();
  const diferencia = ahora - inicio;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("tiempo").textContent =
    `${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
}

setInterval(actualizarContador, 1000);

// ===== ÁRBOL =====

function dibujarCorazon(x, y, tamaño) {
  ctx.fillStyle = "#d6336c";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - tamaño/2, y - tamaño/2,
                    x - tamaño, y + tamaño/3,
                    x, y + tamaño);
  ctx.bezierCurveTo(x + tamaño, y + tamaño/3,
                    x + tamaño/2, y - tamaño/2,
                    x, y);
  ctx.fill();
}

function dibujarArbol() {
  const baseX = canvas.width * 0.25;
  const baseY = canvas.height;

  // Tronco natural
  ctx.beginPath();
  ctx.moveTo(baseX - 40, baseY);
  ctx.lineTo(baseX - 20, baseY - 250);
  ctx.lineTo(baseX + 20, baseY - 250);
  ctx.lineTo(baseX + 40, baseY);
  ctx.closePath();
  ctx.fillStyle = "#7b4b2a";
  ctx.fill();

  // Ramas curvas
  for (let i = 0; i < 6; i++) {
    let altura = baseY - 200 - (i * 20);
    ctx.beginPath();
    ctx.moveTo(baseX, altura);
    ctx.quadraticCurveTo(baseX - 80 - (i*10), altura - 40, baseX - 120 - (i*10), altura - 80);
    ctx.strokeStyle = "#7b4b2a";
    ctx.lineWidth = 5 - i*0.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(baseX, altura);
    ctx.quadraticCurveTo(baseX + 80 + (i*10), altura - 40, baseX + 120 + (i*10), altura - 80);
    ctx.stroke();
  }

  // COPA de corazones (bola arriba)
  const copaY = baseY - 270;
  for (let i = 0; i < 80; i++) {
    let angle = Math.random() * Math.PI * 2;
    let radius = 80 + Math.random() * 30;
    let x = baseX + Math.cos(angle) * radius;
    let y = copaY + Math.sin(angle) * radius;
    dibujarCorazon(x, y, 12);
  }
}

dibujarArbol();
