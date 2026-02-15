body {
  margin: 0;
  overflow: hidden;
  font-family: Arial, sans-serif;
  background: #e9e4da;
}

/* TITULO */
.titulo {
  text-align: center;
  font-size: 42px;
  margin-top: 20px;
}

/* MENSAJE */
.mensaje {
  position: absolute;
  top: 100px;
  left: 60px;
  width: 40%;
  font-size: 20px; /* más grande pero sin exagerar */
  line-height: 1.6;
}

/* FOTOS */
.fotos {
  position: absolute;
  bottom: 40px;
  left: 50px;
  display: flex;
  gap: 15px;
}

.fotos img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* CONTADOR */
.contador-amor {
  position: fixed;
  bottom: 20px;
  left: 30px;
  font-size: 20px; /* más grande */
  background: rgba(255,255,255,0.8);
  padding: 12px 18px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* CANVAS ARBOL */
canvas {
  position: absolute;
  right: 0;
  bottom: 0;
}
