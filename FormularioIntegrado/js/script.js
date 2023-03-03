document.addEventListener("DOMContentLoaded", function () {
  const textAreas = document.querySelectorAll(".mensaje");
  textAreas.forEach((textArea) => {
    document.addEventListener("load", animateText(textArea));
    textArea.addEventListener("focus", () => {
      if (
        textArea.value === "Deja aquí tu comentario. Gracias por tu visita!"
      ) {
        textArea.value = "";
      }
    });
    textArea.addEventListener("blur", () => {
      if (textArea.value === "") {
        animateText(textArea);
      }
    });
  });

  // canvas
  dibujarCanvas();
});

function animateText(textArea) {
  const text = "Deja aquí tu comentario. Gracias por tu visita!";
  const to = text.length,
    from = 0;

  animate({
    duration: 5000,
    timing: bounce,
    draw: function (progress) {
      let result = (to - from) * progress + from;
      textArea.value = text.slice(0, Math.ceil(result));
    },
  });
}

function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
    }
  }
}

function animate(options) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = options.timing(timeFraction);

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

// canvas
function cargarContextoCanvas(idCanvas) {
  let elemento = document.getElementById(idCanvas);
  if (elemento && elemento.getContext) {
    let contexto = elemento.getContext("2d");
    if (contexto) {
      return contexto;
    }
  }
  return false;
}

function dibujarCanvas() {
  let contexto = cargarContextoCanvas("canvas");
  if (contexto) {
    // dibujar una flecha hacia arriba
    contexto.strokeStyle = "rgba(0, 0, 255, 0.7)";
    contexto.lineWidth = 8;
    contexto.beginPath();
    contexto.arc(50, 50, 40, 0, Math.PI * 2, true); // Círculo externo
    contexto.moveTo(50, 80);
    contexto.lineTo(50, 25);
    contexto.moveTo(52, 25);
    contexto.lineTo(30, 45);
    contexto.moveTo(48, 25);
    contexto.lineTo(70, 45);
    contexto.stroke();
  }
}
