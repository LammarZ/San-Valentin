const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let alturaMaxima = canvas.height * 0.45;
let crecimiento = 0;

let ramas = [];
let hojas = [];

// CONTADOR
function actualizarContador() {
  const inicio = new Date("2023-06-08T00:00:00");
  const ahora = new Date();
  const diferencia = ahora - inicio;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("tiempo").innerText =
    `${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos`;
}

setInterval(actualizarContador, 1000);

// DIBUJAR CORAZÓN
function dibujarCorazon(x, y, tamaño) {
  ctx.fillStyle = "#d64562";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - tamaño, y - tamaño,
                    x - tamaño * 1.5, y + tamaño / 2,
                    x, y + tamaño);
  ctx.bezierCurveTo(x + tamaño * 1.5, y + tamaño / 2,
                    x + tamaño, y - tamaño,
                    x, y);
  ctx.fill();
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // TRONCO (más ancho abajo)
  if (crecimiento < alturaMaxima) {
    crecimiento += 1.2;
  }

  const baseX = canvas.width / 2;
  const baseY = canvas.height;

  const grosorBase = 30;
  const grosorArriba = 8;
  const grosorActual = grosorBase - (crecimiento / alturaMaxima) * (grosorBase - grosorArriba);

  ctx.fillStyle = "#6b3e26";
  ctx.beginPath();
  ctx.moveTo(baseX - grosorBase / 2, baseY);
  ctx.lineTo(baseX + grosorBase / 2, baseY);
  ctx.lineTo(baseX + grosorActual / 2, baseY - crecimiento);
  ctx.lineTo(baseX - grosorActual / 2, baseY - crecimiento);
  ctx.closePath();
  ctx.fill();

  // RAMAS
if (crecimiento > 60 && ramas.length < 14) {
  let alturaRandom = baseY - Math.random() * crecimiento;

  ramas.push({
    x: baseX,
    y: alturaRandom,
    largo: 0,
    direccion: Math.random() > 0.5 ? 1 : -1,
    angulo: Math.random() * 0.5 + 0.3
  });
}
  ramas.forEach(rama => {
  if (rama.largo < 100) {
    rama.largo += 1.2;
  }

  ctx.strokeStyle = "#6b3e26";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(rama.x, rama.y);
  ctx.lineTo(
    rama.x + rama.largo * rama.direccion,
    rama.y - rama.largo * rama.angulo
  );
  ctx.stroke();

  // MÁS CORAZONES
  if (rama.largo > 80 && Math.random() < 0.2) {
    hojas.push({
      x: rama.x + rama.largo * rama.direccion,
      y: rama.y - rama.largo * rama.angulo,
      tamaño: Math.random() * 8 + 6
    });
  }
});
  hojas.forEach(hoja => {
    dibujarCorazon(hoja.x, hoja.y, hoja.tamaño);
  });

  requestAnimationFrame(animar);
}

animar();
