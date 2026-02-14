const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ================= CONTADOR ================= */

const inicio = new Date("2023-06-08T00:00:00");

function actualizarContador() {
  const ahora = new Date();
  const diff = ahora - inicio;

  const dias = Math.floor(diff / (1000*60*60*24));
  const horas = Math.floor((diff / (1000*60*60)) % 24);
  const minutos = Math.floor((diff / (1000*60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("tiempo").textContent =
    `${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
}

setInterval(actualizarContador, 1000);

/* ================= ÁRBOL ANIMADO ================= */

let hue = 0;
let semillaY = -20;
let creciendo = false;
let progreso = 0;

const centroX = canvas.width / 2;
const sueloY = canvas.height - 20;
const alturaFinal = 260;

let ramas = [];
let corazones = [];

/* Dibuja corazón arcoiris */
function dibujarCorazon(x, y, size) {
  ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size/2, y - size/2,
                    x - size, y + size/3,
                    x, y + size);
  ctx.bezierCurveTo(x + size, y + size/3,
                    x + size/2, y - size/2,
                    x, y);
  ctx.fill();
}

/* Genera ramas cuando el árbol crece */
function generarRamas(alturaActual) {

  if (ramas.length > 0) return;

  for (let i = 0; i < 7; i++) {
    let y = sueloY - alturaActual + 40 + i * 25;
    let largo = 70 + i * 20;

    ramas.push({
      x1: centroX,
      y1: y,
      x2: centroX - largo,
      y2: y - 80
    });

    ramas.push({
      x1: centroX,
      y1: y,
      x2: centroX + largo,
      y2: y - 80
    });
  }
}

/* Genera copa de corazones */
function generarCopa() {
  for (let i = 0; i < 250; i++) {
    let angle = Math.random() * Math.PI * 2;
    let radius = 100 + Math.random() * 50;

    corazones.push({
      x: centroX + Math.cos(angle) * radius,
      y: sueloY - alturaFinal - 60 + Math.sin(angle) * radius,
      size: 6 + Math.random() * 8
    });
  }
}

function animar() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* 1️⃣ Semilla cayendo */
  if (!creciendo) {
    ctx.fillStyle = "#5a381e";
    ctx.beginPath();
    ctx.arc(centroX, semillaY, 6, 0, Math.PI * 2);
    ctx.fill();

    semillaY += 3;

    if (semillaY >= sueloY - 5) {
      creciendo = true;
    }
  }

  /* 2️⃣ Crecimiento del tronco */
  if (creciendo && progreso < alturaFinal) {
    progreso += 2;
  }

  /* TRONCO */
  if (progreso > 0) {
    ctx.beginPath();
    ctx.moveTo(centroX - 30, sueloY);
    ctx.lineTo(centroX - 10, sueloY - progreso);
    ctx.lineTo(centroX + 10, sueloY - progreso);
    ctx.lineTo(centroX + 30, sueloY);
    ctx.closePath();
    ctx.fillStyle = "#7b4b2a";
    ctx.fill();
  }

  /* 3️⃣ Ramas aparecen progresivamente */
  if (progreso > 120) {
    generarRamas(progreso);

    ramas.forEach(r => {
      ctx.beginPath();
      ctx.moveTo(r.x1, r.y1);
      ctx.quadraticCurveTo(
        (r.x1 + r.x2) / 2,
        r.y1 - 40,
        r.x2,
        r.y2
      );
      ctx.strokeStyle = "#7b4b2a";
      ctx.lineWidth = 3;
      ctx.stroke();

      /* corazones naciendo de ramas */
      for (let i = 0; i < 5; i++) {
        let t = i / 5;
        let x = r.x1 + (r.x2 - r.x1) * t;
        let y = r.y1 + (r.y2 - r.y1) * t;
        dibujarCorazon(x, y, 5);
      }
    });
  }

  /* 4️⃣ Copa final */
  if (progreso >= alturaFinal) {
    if (corazones.length === 0) {
      generarCopa();
    }

    corazones.forEach(c => {
      dibujarCorazon(c.x, c.y, c.size);
    });
  }

  hue += 0.5;
  requestAnimationFrame(animar);
}

animar();
