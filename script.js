<script>
  const inicio = new Date("2023-06-08T00:00:00");

  function actualizarTiempo() {
    const ahora = new Date();
    let diferencia = Math.floor((ahora - inicio) / 1000);

    const dias = Math.floor(diferencia / 86400);
    diferencia %= 86400;

    const horas = Math.floor(diferencia / 3600);
    diferencia %= 3600;

    const minutos = Math.floor(diferencia / 60);
    const segundos = diferencia % 60;

    document.getElementById("tiempo").textContent =
      `${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos`;
  }

  actualizarTiempo();
  setInterval(actualizarTiempo, 1000);
</script>
