window.DATOS_PRODUCTOS = {
    "productos": [
      {
        "imagen": "img/tenis-running.png",
        "nombre": "Tenis Running Basic",
        "precio": 1299,
        "descripcion": "Tenis ligeros y cómodos para iniciar entrenamientos de running y HYROX.",
        "nivel": "Principiante"
      },
      {
        "imagen": "img/playera-training.png",
        "nombre": "Playera Training Dry Fit",
        "precio": 399,
        "descripcion": "Playera deportiva transpirable de secado rápido para entrenamientos funcionales.",
        "nivel": "Principiante"
      },
      {
        "imagen": "img/botella-deportiva.png",
        "nombre": "Botella Deportiva 750 ml",
        "precio": 249,
        "descripcion": "Botella reutilizable y resistente para mantenerte hidratado durante tus entrenamientos.",
        "nivel": "Principiante"
      },
      {
        "imagen": "img/cuerda-saltar.png",
        "nombre": "Cuerda de Salto Speed",
        "precio": 349,
        "descripcion": "Cuerda ajustable para mejorar coordinación, resistencia cardiovascular y velocidad.",
        "nivel": "Principiante"
      },
      {
        "imagen": "img/short-training.png",
        "nombre": "Short Training Performance",
        "precio": 549,
        "descripcion": "Short deportivo ligero y flexible para sesiones de fuerza y entrenamiento funcional.",
        "nivel": "Amateur"
      },
      {
        "imagen": "img/bandas-resistencia.png",
        "nombre": "Bandas de Resistencia",
        "precio": 449,
        "descripcion": "Set de bandas elásticas para ejercicios de fuerza, movilidad y activación muscular.",
        "nivel": "Amateur"
      },
      {
        "imagen": "img/calcetas-grip.png",
        "nombre": "Calcetas Grip Training",
        "precio": 299,
        "descripcion": "Calcetas deportivas con agarre y soporte para entrenamientos de alta intensidad.",
        "nivel": "Amateur"
      },
      {
        "imagen": "img/tenis-performance.png",
        "nombre": "Tenis HYROX Performance",
        "precio": 2499,
        "descripcion": "Calzado de alto rendimiento con estabilidad y tracción para carreras y ejercicios funcionales.",
        "nivel": "Pro"
      },
      {
        "imagen": "img/chaleco-peso.png",
        "nombre": "Chaleco con Peso Ajustable",
        "precio": 1899,
        "descripcion": "Chaleco de entrenamiento con carga ajustable para desarrollar fuerza y resistencia.",
        "nivel": "Pro"
      },
      {
        "imagen": "img/mochila-deportiva.png",
        "nombre": "Mochila Training Pro",
        "precio": 999,
        "descripcion": "Mochila deportiva resistente con compartimentos para ropa, calzado y accesorios.",
        "nivel": "Pro"
      },
      {
        "imagen": "img/kettlebell-hyrox.png",
        "nombre": "Kettlebell HYROX 24 kg",
        "precio": 1499,
        "descripcion": "Pesa rusa de 24 kg para entrenamientos de fuerza, resistencia y movimientos funcionales.",
        "nivel": "Pro"
      },
      {
        "imagen": "img/wall-ball-hyrox.png",
        "nombre": "Wall Ball HYROX 9 kg",
        "precio": 1199,
        "descripcion": "Balón medicinal de 9 kg para sentadillas con lanzamiento y entrenamiento funcional.",
        "nivel": "Amateur"
      },
      {
        "imagen": "img/sandbag-hyrox.png",
        "nombre": "Sandbag HYROX 20 kg",
        "precio": 1899,
        "descripcion": "Saco de entrenamiento de 20 kg con asas reforzadas para cargas y desplazamientos.",
        "nivel": "Pro"
      },
      {
        "imagen": "img/cajon-pliometrico-hyrox.png",
        "nombre": "Cajón Pliométrico HYROX",
        "precio": 2199,
        "descripcion": "Cajón de entrenamiento para saltos, step-ups y desarrollo de potencia de piernas.",
        "nivel": "Amateur"
      },
      {
        "imagen": "img/trineo-hyrox.png",
        "nombre": "Trineo de Empuje HYROX",
        "precio": 6999,
        "descripcion": "Trineo de entrenamiento diseñado para ejercicios de empuje y arrastre de fuerza.",
        "nivel": "Pro"
      }
    ]
  };

  const RUTA_RAIZ = "../"; // las imágenes vienen como "img/archivo.png", relativas a la raíz del proyecto
  const CLAVE_CARRITO = "jaguarx-carrito"; // nombre con el que se guarda el carrito en el navegador
  
  const formatoPrecio = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
  const precioMXN = (cantidad) => `${formatoPrecio.format(cantidad)} MXN`;
  
  let productos = [];
  let carrito = leerCarrito(); // { "Nombre del producto": cantidad }
  
  function leerCarrito() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || {};
    } catch {
      return {};
    }
  }
  
  function guardarCarrito() {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }
  
  function buscarProducto(nombre) {
    return productos.find((p) => p.nombre === nombre);
  }
  
  function lineasDelCarrito() {
    return Object.entries(carrito)
      .map(([nombre, cantidad]) => ({ producto: buscarProducto(nombre), cantidad }))
      .filter((linea) => linea.producto);
  }
  
  function agregarAlCarrito(nombre) {
    carrito[nombre] = (carrito[nombre] || 0) + 1;
    ocultarAviso();
    actualizarCarrito();
  }
  
  function cambiarCantidad(nombre, diferencia) {
    const nueva = (carrito[nombre] || 0) + diferencia;
    if (nueva <= 0) delete carrito[nombre];
    else carrito[nombre] = nueva;
    actualizarCarrito();
  }
  
  function quitarDelCarrito(nombre) {
    delete carrito[nombre];
    actualizarCarrito();
  }
  
  function vaciarCarrito() {
    carrito = {};
    ocultarAviso();
    actualizarCarrito();
  }
  
  function comprar() {
    const lineas = lineasDelCarrito();
    if (lineas.length === 0) return;
  
    const total = lineas.reduce((suma, l) => suma + l.producto.precio * l.cantidad, 0);
    const piezas = lineas.reduce((suma, l) => suma + l.cantidad, 0);
  
    carrito = {};
    actualizarCarrito();
  
    const aviso = document.getElementById("carrito-aviso");
    aviso.textContent = `¡Compra realizada! Compraste ${piezas} ${piezas === 1 ? "producto" : "productos"} por ${precioMXN(total)}. Gracias por tu compra.`;
    aviso.classList.remove("d-none");
    aviso.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  
  function ocultarAviso() {
    document.getElementById("carrito-aviso")?.classList.add("d-none");
  }
  
  function crearLineaCarrito({ producto, cantidad }) {
    const item = document.createElement("li");
    item.className = "list-group-item bg-dark text-white border-secondary d-flex flex-wrap align-items-center gap-2";
    item.dataset.nombre = producto.nombre;
    item.innerHTML = `
      <div class="flex-grow-1">
        <p class="linea-nombre fw-semibold mb-0"></p>
        <p class="linea-precio small text-white-50 mb-0"></p>
      </div>
      <div class="btn-group btn-group-sm" role="group">
        <button type="button" class="btn btn-outline-light" data-accion="restar" aria-label="Quitar uno">−</button>
        <span class="linea-cantidad btn btn-outline-light disabled"></span>
        <button type="button" class="btn btn-outline-light" data-accion="sumar" aria-label="Agregar uno">+</button>
      </div>
      <span class="linea-subtotal fw-bold text-warning"></span>
      <button type="button" class="btn btn-sm btn-outline-danger" data-accion="quitar">✕</button>`;
  
    item.querySelector(".linea-nombre").textContent = producto.nombre;
    item.querySelector(".linea-precio").textContent = `${precioMXN(producto.precio)} c/u`;
    item.querySelector(".linea-cantidad").textContent = cantidad;
    item.querySelector(".linea-subtotal").textContent = precioMXN(producto.precio * cantidad);
    item.querySelector('[data-accion="quitar"]').setAttribute("aria-label", `Quitar ${producto.nombre} del carrito`);
    return item;
  }
  
  function actualizarCarrito() {
    // Limpia productos que ya no existen en los datos
    Object.keys(carrito).forEach((nombre) => {
      if (!buscarProducto(nombre)) delete carrito[nombre];
    });
    guardarCarrito();
  
    const lineas = lineasDelCarrito();
    const piezas = lineas.reduce((suma, l) => suma + l.cantidad, 0);
    const total = lineas.reduce((suma, l) => suma + l.producto.precio * l.cantidad, 0);
  
    const lista = document.getElementById("carrito-lista");
    const vacio = document.getElementById("carrito-vacio");
    const contador = document.getElementById("carrito-contador");
    const totalTexto = document.getElementById("carrito-total");
    const botonComprar = document.getElementById("carrito-comprar");
    const botonVaciar = document.getElementById("carrito-vaciar");
  
    lista.replaceChildren(...lineas.map(crearLineaCarrito));
    lista.classList.toggle("d-none", lineas.length === 0);
    vacio.classList.toggle("d-none", lineas.length > 0);
  
    contador.textContent = piezas;
    totalTexto.textContent = precioMXN(total);
    botonComprar.disabled = lineas.length === 0;
    botonVaciar.disabled = lineas.length === 0;
  }
  
  // Si una imagen no existe, muestra un aviso en lugar del ícono roto
  function sinImagen(img) {
    const aviso = document.createElement("div");
    aviso.className = "d-flex align-items-center justify-content-center text-secondary small";
    aviso.textContent = "Imagen próximamente";
    img.replaceWith(aviso);
  }
  
  function crearTarjeta(producto, indice) {
    const tarjeta = document.createElement("article");
    tarjeta.id = `producto-${indice + 1}`;
    tarjeta.className = "card text-bg-dark border-secondary flex-shrink-0 col-10 col-md-5 col-lg-4";
    tarjeta.innerHTML = `
      <div class="ratio ratio-4x3 bg-light rounded-top">
        <img class="object-fit-contain p-3" loading="lazy">
      </div>
      <div class="card-body d-flex flex-column">
        <span class="badge text-bg-secondary align-self-start mb-2"></span>
        <h2 class="card-title h4"></h2>
        <p class="card-text flex-grow-1"></p>
        <p class="producto-precio text-warning fw-bold fs-4 mb-0"></p>
        <button type="button" class="btn btn-warning fw-bold mt-3">Agregar al carrito</button>
      </div>`;
  
    const img = tarjeta.querySelector("img");
    img.addEventListener("error", () => sinImagen(img));
    img.src = RUTA_RAIZ + producto.imagen;
    img.alt = producto.nombre;
  
    const nivel = tarjeta.querySelector(".badge");
    if (producto.nivel) nivel.textContent = producto.nivel;
    else nivel.remove();
  
    tarjeta.querySelector(".card-title").textContent = producto.nombre;
    tarjeta.querySelector(".card-text").textContent = producto.descripcion;
    tarjeta.querySelector(".producto-precio").textContent = precioMXN(producto.precio);
  
    // Botón "Agregar al carrito"
    const boton = tarjeta.querySelector("button");
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.nombre);
      boton.textContent = "✓ Agregado";
      boton.classList.replace("btn-warning", "btn-success");
      setTimeout(() => {
        boton.textContent = "Agregar al carrito";
        boton.classList.replace("btn-success", "btn-warning");
      }, 1200);
    });
  
    return tarjeta;
  }
  
  function crearBotonNavegacion(indice) {
    const enlace = document.createElement("a");
    enlace.className = "producto_carrusel";
    enlace.href = `#producto-${indice + 1}`;
    enlace.textContent = indice + 1;
    return enlace;
  }
  
  function iniciarPagina() {
    const carrusel = document.querySelector('[aria-label="Carrusel de productos"]');
    const navegacion = document.querySelector('[aria-label="Ir a producto"]');
    if (!carrusel) return;
  
    try {
      // Los datos vienen de data/productos.js
      productos = (window.DATOS_PRODUCTOS ?? {}).productos ?? [];
      if (productos.length === 0) throw new Error("No hay productos. Revisa que data/productos.js esté cargado.");
  
      carrusel.replaceChildren(...productos.map(crearTarjeta));
  
      if (navegacion) {
        navegacion.querySelectorAll("a").forEach((a) => a.remove()); // conserva el texto "Desliza →"
        navegacion.append(...productos.map((_, i) => crearBotonNavegacion(i)));
      }
    } catch (error) {
      console.error(error);
      const mensaje = document.createElement("p");
      mensaje.className = "text-white-50";
      mensaje.textContent = `No se pudieron cargar los productos: ${error.message}`;
      carrusel.replaceChildren(mensaje);
    }
  
    // Botones del carrito
    document.getElementById("carrito-lista").addEventListener("click", (evento) => {
      const boton = evento.target.closest("[data-accion]");
      if (!boton) return;
      const nombre = boton.closest("li").dataset.nombre;
      if (boton.dataset.accion === "sumar") cambiarCantidad(nombre, 1);
      if (boton.dataset.accion === "restar") cambiarCantidad(nombre, -1);
      if (boton.dataset.accion === "quitar") quitarDelCarrito(nombre);
    });
    document.getElementById("carrito-vaciar").addEventListener("click", vaciarCarrito);
    document.getElementById("carrito-comprar").addEventListener("click", comprar);
  
    actualizarCarrito();
  }
  
  iniciarPagina();