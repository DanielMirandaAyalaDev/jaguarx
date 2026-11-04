window.DATOS_COMENTARIOS = {
    "comentarios": [
      {
        "usuario": "Ana Lopez",
        "texto": "El producto llegó a tiempo y en perfectas condiciones. Muy satisfecha con la compra.",
        "calificación": 5
      },
      {
        "usuario": "Carlos Ruiz",
        "texto": "Buen producto, pero el envío fue más lento de lo esperado.",
        "calificación": 3
      },
      {
        "usuario": "María García",
        "texto": "Excelente calidad del producto. Recomendaría este artículo a mis amigos.",
        "calificación": 5
      },
      {
        "usuario": "Juan Pérez",
        "texto": "Producto de buena calidad, aunque el precio era un poco elevado.",
        "calificación": 3
      },
      {
        "usuario": "Lucia delgado",
        "texto": "Excelente,me uniré a su comunidad",
        "calificación": 5
      },
      {
        "usuario": "Marcos Sotelo",
        "texto": "Interesantes productos, me encanta la variedad, arriba la izquierda",
        "calificación": 5
      },
      {
        "usuario": "Jaime Torres",
        "texto": "Producto muy bueno, lo recomiendo a todos.",
        "calificación": 5
      },
      {
        "usuario": "Marlene Rojas",
        "texto": "Pensé que vendían papas pero me quedé por el excelente diseño",
        "calificación": 4
      },
      {
        "usuario": "Felipe Mendoza",
        "texto": "Las recomendaciones que me dan para los hyrox me fueron muy útiles",
        "calificación": 4
      },
      {
        "usuario": "Sofía Martínez",
        "texto": "En la última competición se hizo del baño una participante y ganó",
        "calificación": 3
      },
      {
        "usuario": "Cesar Bono",
        "texto": "Muy chida la página, me siento bien lion cuando compro algo de aquí",
        "calificación": 5
      },
      {
        "usuario": "Wilson Rivas",
        "texto": "Oigame pero discúlpeme, los productos de aqui son simplemente de otra calidad exquisita al tacto y a la vista",
        "calificación": 5
      },
      {
        "usuario": "María Beatriz 25",
        "texto": "Me quedaron muy bien los tenis que pedí,además me llegaron super rápido hasta Colombia",
        "calificación": 5
      },
      {
        "usuario": "LucitaEmoxxita",
        "texto": "Muy cool tdos los productos, o sea así muy top,we",
        "calificación": 5
      },
      {
        "usuario": "Corazón de jeus0456",
        "texto": "Diosito bendiga a todos los que hacen realidad esto, ayer saqué a pasear al santito de mi cuadra con los tenis y no me sacaron juanetes",
        "calificación": 5
      },
      {
        "usuario": "Pepe Lechero",
        "texto": "Está muy bonito sacar a pasear a mi vaca con esta ropa bien ligerita",
        "calificación": 5
      },
      {
        "usuario": "María Fernanda",
        "texto": "Me encantó el producto, llegó en perfectas condiciones y la atención al cliente fue excelente.",
        "calificación": 5
      },
      {
        "usuario": "Luis Hernández",
        "texto": "El producto no cumplió con mis expectativas, esperaba algo de mejor calidad.",
        "calificación": 2
      },
      {
        "usuario": "Sofía Ramírez",
        "texto": "Muy buena experiencia de compra, volveré a comprar en esta tienda.",
        "calificación": 5
      },
      {
        "usuario": "Diego Torres",
        "texto": "El producto es bueno, pero el precio es un poco alto para lo que ofrece.",
        "calificación": 3
      },
      {
        "usuario": "Valeria Gómez",
        "texto": "Excelente servicio al cliente, resolvieron mis dudas rápidamente.",
        "calificación": 5
      },
      {
        "usuario": "Javier Morales",
        "texto": "El envío fue rápido y el producto llegó en buen estado.",
        "calificación": 4
      },
      {
        "usuario": "Isabel Fernández",
        "texto": "No estoy satisfecha con la compra, el producto no es como lo esperaba.",
        "calificación": 2
      },
      {
        "usuario": "Ricardo Sánchez",
        "texto": "Muy buena calidad y diseño del producto, lo recomiendo.",
        "calificación": 5
      },
      {
        "usuario": "Andrea Castillo50",
        "texto": "El producto llegó dañado.",
        "calificación": 1
      },
      {
        "usuario": "Fernando López",
        "texto": "Excelente experiencia de compra, volveré a comprar en esta tienda.",
        "calificación": 5
      },
      {
        "usuario": "Gabriela Torres",
        "texto": "El producto es bueno, pero el envío tardó más de lo esperado.",
        "calificación": 3
      },
      {
        "usuario": "Miguel Ramírez",
        "texto": "Muy satisfecho con la compra, el producto cumple con lo prometido.",
        "calificación": 5
      }
    ]
  };

  function estrellas(calificacion) {
    const n = Math.max(0, Math.min(5, Math.round(Number(calificacion) || 0)));
    return "★".repeat(n) + "☆".repeat(5 - n);
  }
  
  function obtenerCalificacion(comentario) {
    return Number(comentario["calificación"] ?? comentario.calificacion ?? 0);
  }
  
  function crearComentario(comentario) {
    const calificacion = obtenerCalificacion(comentario);
  
    const item = document.createElement("li");
    item.innerHTML = `
      <article class="card text-bg-dark border-secondary">
        <div class="card-body d-flex gap-3">
          <span class="badge rounded-circle text-bg-warning fs-5 align-self-start" aria-hidden="true"></span>
          <div class="flex-grow-1">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-1">
              <h3 class="h6 fw-bold mb-0"></h3>
              <span class="text-warning" role="img"></span>
            </div>
            <p class="card-text mb-0"></p>
          </div>
        </div>
      </article>`;
  
    const usuario = (comentario.usuario || "Anónimo").trim();
    item.querySelector(".rounded-circle").textContent = usuario.charAt(0).toUpperCase();
    item.querySelector("h3").textContent = usuario;
  
    const calif = item.querySelector('[role="img"]');
    calif.textContent = estrellas(calificacion);
    calif.setAttribute("aria-label", `Calificación: ${calificacion} de 5`);
  
    item.querySelector(".card-text").textContent = comentario.texto;
    return item;
  }
  
  function cargarComentarios() {
    const foro = document.querySelector('[aria-labelledby="titulo-foro"]');
    if (!foro) return;
    const lista = foro.querySelector("ol");
    const contador = foro.querySelector(".badge");
  
    try {
      // Los datos vienen de data/comentarios.js
      const { comentarios = [] } = window.DATOS_COMENTARIOS ?? {};
      if (comentarios.length === 0) throw new Error("No hay comentarios. Revisa que data/comentarios.js esté cargado.");
  
      lista.replaceChildren(...comentarios.map(crearComentario));
  
      if (contador) {
        const total = comentarios.length;
        const suma = comentarios.reduce((acc, c) => acc + obtenerCalificacion(c), 0);
        contador.textContent = `${total} comentarios · ★ ${(suma / total).toFixed(1)}`;
      }
    } catch (error) {
      console.error(error);
      if (contador) contador.remove();
      const mensaje = document.createElement("li");
      mensaje.className = "text-white-50";
      mensaje.textContent = `No se pudieron cargar los comentarios: ${error.message}`;
      lista.replaceChildren(mensaje);
    }
  }
  
  cargarComentarios();