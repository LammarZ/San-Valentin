const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ================= CONTADOR =================

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

// ================= CORAZONES ARCOIRIS =================

let tiempoColor = 0;

function dibujarCorazon(x, y, tamaño) {
  const hue = (tiempoColor + x + y) % 360;
  ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;

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

// ================= ÁRBOL =================

let corazonesCopa = [];

function generarCopa(baseX, copaY) {
  corazonesCopa = [];
  for (let i = 0; i < 150; i++) {   // MUCHOS corazones
    let angle = Math.random() * Math.PI * 2;
    let radius = 90 + Math.random() * 40;

    corazonesCopa.push({
      x: baseX + Math.cos(angle) * radius,
      y: copaY + Math.sin(angle) * radius,
      size: 10 + Math.random() * 8
    });
  }
}

function dibujarArbol() {

  const baseX = canvas.width * 0.25;
  const baseY = canvas.height;
  const troncoAltura = 260;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Tronco natural ancho abajo fino arriba
  ctx.beginPath();
  ctx.moveTo(baseX - 50, baseY);
  ctx.lineTo(baseX - 20, baseY - troncoAltura);
  ctx.lineTo(baseX + 20, baseY - troncoAltura);
  ctx.lineTo(baseX + 50, baseY);
  ctx.closePath();
  ctx.fillStyle = "#7b4b2a";
  ctx.fill();

  // Ramas curvas reales
  for (let i = 0; i < 7; i++) {

    let altura = baseY - troncoAltura + 40 + i * 25;

    ctx.beginPath();
    ctx.moveTo(baseX, altura);
    ctx.quadraticCurveTo(
      baseX - 100 - i*15,
      altura - 60,
      baseX - 150 - i*10,
      altura - 120
    );
    ctx.strokeStyle = "#7b4b2a";
    ctx.lineWidth = 6 - i * 0.6;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(baseX, altura);
    ctx.quadraticCurveTo(
      baseX + 100 + i*15,
      altura - 60,
      baseX + 150 + i*10,
      altura - 120
    );
    ctx.stroke();
  }

  // COPA
  const copaY = baseY - troncoAltura - 40;

  if (corazonesCopa.length === 0) {
    generarCopa(baseX, copaY);
  }

  corazonesCopa.forEach(c => {
    dibujarCorazon(c.x, c.y, c.size);
  });

  tiempoColor += 1;
  requestAnimationFrame(dibujarArbol);
}

dibujarArbol();
