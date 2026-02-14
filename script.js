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

// CORAZÓN
function dibujarCorazon(x, y, t) {
  ctx.fillStyle = "#d64562";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - t, y - t,
                    x - t * 1.5, y + t / 2,
                    x, y + t);
  ctx.bezierCurveTo(x + t * 1.5, y + t / 2,
                    x + t, y - t,
                    x, y);
  ctx.fill();
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const baseX = canvas.width / 2;
  const baseY = canvas.height;

  // CRECIMIENTO
  if (crecimiento < alturaMaxima) {
    crecimiento += 1.5;
  }

  // TRONCO
  const grosorBase = 40;
  const grosorArriba = 16;

  const grosorActual =
    grosorBase - (crecimiento / alturaMaxima) *
    (grosorBase - grosorArriba);

  ctx.fillStyle = "#6b3e26";
  ctx.beginPath();
  ctx.moveTo(baseX - grosorBase / 2, baseY);
  ctx.lineTo(baseX + grosorBase / 2, baseY);
  ctx.lineTo(baseX + grosorActual / 2, baseY - crecimiento);
  ctx.lineTo(baseX - grosorActual / 2, baseY - crecimiento);
  ctx.closePath();
  ctx.fill();

  // GENERAR MUCHAS RAMAS EN DIFERENTES ALTURAS
  if (ramas.length < 18 && crecimiento > 80) {
    let alturaRandom = baseY - Math.random() * crecimiento;

    ramas.push({
      x: baseX,
      y: alturaRandom,
      largo: 0,
      direccion: Math.random() > 0.5 ? 1 : -1,
      inclinacion: Math.random() * 0.5 + 0.3
    });
  }

  // DIBUJAR RAMAS
  ramas.forEach(rama => {
    if (rama.largo < 120) {
      rama.largo += 1.5;
    }

    ctx.strokeStyle = "#6b3e26";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(rama.x, rama.y);
    ctx.lineTo(
      rama.x + rama.largo * rama.direccion,
      rama.y - rama.largo * rama.inclinacion
    );
    ctx.stroke();

    // MUCHOS MÁS CORAZONES
    if (rama.largo > 90 && Math.random() < 0.4) {
      hojas.push({
        x: rama.x + rama.largo * rama.direccion,
        y: rama.y - rama.largo * rama.inclinacion,
        tamaño: Math.random() * 10 + 6
      });
    }
  });

  // DIBUJAR CORAZONES
  hojas.forEach(h => {
    dibujarCorazon(h.x, h.y, h.tamaño);
  });

  requestAnimationFrame(animar);
}

animar();
