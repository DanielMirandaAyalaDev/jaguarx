window.DATOS_NOTICIAS = {
    "noticias": [
      {
        "fecha": "2026-11-02",
        "titulo": "Hunter McIntyre y Bianca Sierra triunfan en HYROX Ciudad de México",
        "descripcion": "Bianca Sierra ganó la categoría Pro femenil y Hunter McIntyre obtuvo la victoria en la categoría Pro varonil durante la competencia celebrada en el Centro Banamex.",
        "enlace": "https://mexicotv.mx/news/hyrox-ciudad-de-mexico-2026-resultados"
      },
      {
        "fecha": "2026-11-02",
        "titulo": "Hamburgo inaugura la nueva temporada Elite Series",
        "descripcion": "La competencia de Hamburgo marcó el inicio de una nueva etapa de la Elite Series, con Sean Noble y Joanna Wietrzyk como ganadores de sus respectivas carreras.",
        "enlace": "https://hyroxs.com/news/"
      },
      {
        "fecha": "2026-11-02",
        "titulo": "HYROX reúne a miles de atletas en Birmingham y Hamburgo",
        "descripcion": "Los eventos del fin de semana registraron una importante participación de atletas y comunidades deportivas.",
        "enlace": "https://hyroxs.com/news/"
      },
      {
        "fecha": "2026-11-02",
        "titulo": "Salt Lake City celebra su primera competencia HYROX",
        "descripcion": "La ciudad estadounidense recibió por primera vez una competencia HYROX, con una destacada participación en la categoría Pro Doubles femenil.",
        "enlace": "https://hyroxs.com/news/"
      },
      {
        "fecha": "2026-10-28",
        "titulo": "La Elite Series regresa con nuevas competencias",
        "descripcion": "HYROX anunció el regreso de su serie Elite con Hamburgo como primera sede y Londres programada para diciembre.",
        "enlace": "https://hybridfitnessmedia.com/category/news/"
      },
      {
        "fecha": "2026-10-26",
        "titulo": "HYROX anuncia su calendario para la temporada 2026-2027",
        "descripcion": "La nueva temporada contempla competencias internacionales y nuevas oportunidades para atletas de distintas categorías.",
        "enlace": "https://endurance.biz/2026/industry-news/targeting-2-million-athletes-hyrox-expands-global-calendar-for-2026-27-season/"
      },
      {
        "fecha": "2026-10-26",
        "titulo": "Hong Kong será sede del Campeonato Mundial HYROX 2027",
        "descripcion": "La organización anunció a Hong Kong como sede del próximo Campeonato Mundial, previsto para la temporada 2026-2027.",
        "enlace": "https://hyroxs.com/news/"
      },
      {
        "fecha": "2026-10-26",
        "titulo": "HYROX y Sweatpals anuncian una colaboración",
        "descripcion": "La alianza busca impulsar clubes de entrenamiento y fortalecer las comunidades de atletas relacionadas con HYROX.",
        "enlace": "https://hyroxs.com/news/"
      },
      {
        "fecha": "2026-09-25",
        "titulo": "HYROX anuncia premios superiores a 2.5 millones de dólares",
        "descripcion": "La temporada 2026-2027 contempla una bolsa de premios superior a 2.5 millones de dólares para las competencias Elite.",
        "enlace": "https://hybridfitnessmedia.com/category/news/page/2/"
      },
      {
        "fecha": "2026-09-20",
        "titulo": "HYROX presenta modificaciones en sus trineos de competición",
        "descripcion": "La organización introdujo trineos con piezas inferiores reemplazables para mejorar la consistencia de las pruebas de empuje y arrastre.",
        "enlace": "https://hybridfitnessmedia.com/category/news/page/2/"
      }
    ]
  };

  function llenar(tarjeta, noticia) {
    tarjeta.querySelector(".card-title").textContent = noticia.titulo;
    tarjeta.querySelector(".card-text").textContent = noticia.descripcion;
  
    const enlace = tarjeta.querySelector("a");
    if (noticia.enlace) enlace.href = noticia.enlace;
    else enlace.remove();
  }
  
  function crearDestacada(noticia) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "card text-bg-dark border-warning mb-4";
    tarjeta.innerHTML = `
      <div class="card-body p-4 d-flex flex-column">
        <span class="badge text-bg-warning align-self-start mb-2">Destacada</span>
        <h2 class="card-title h3"></h2>
        <p class="card-text"></p>
        <a class="btn btn-outline-warning align-self-start mt-2" target="_blank" rel="noopener noreferrer">Leer más</a>
      </div>`;
    llenar(tarjeta, noticia);
    return tarjeta;
  }
  
  function crearTarjeta(noticia) {
    const columna = document.createElement("div");
    columna.className = "col";
    columna.innerHTML = `
      <article class="card h-100 text-bg-dark border-secondary">
        <div class="card-body d-flex flex-column">
          <h3 class="card-title h5"></h3>
          <p class="card-text flex-grow-1"></p>
          <a class="link-warning fw-semibold mt-2" target="_blank" rel="noopener noreferrer">Leer más →</a>
        </div>
      </article>`;
    llenar(columna, noticia);
    return columna;
  }
  
  function cargarNoticias() {
    const destacadaActual = document.querySelector("body > article.card");
    const cuadricula = document.querySelector('[aria-labelledby="titulo-mas-noticias"] .row');
    if (!cuadricula) return;
  
    try {
      // Los datos vienen de data/noticias.js
      const { noticias = [] } = window.DATOS_NOTICIAS ?? {};
  
      // Más reciente primero (la fecha no se muestra, solo sirve para ordenar)
      const ordenadas = [...noticias].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
      if (ordenadas.length === 0) throw new Error("No hay noticias. Revisa que data/noticias.js esté cargado.");
  
      const [principal, ...resto] = ordenadas;
      if (destacadaActual) destacadaActual.replaceWith(crearDestacada(principal));
      cuadricula.replaceChildren(...resto.map(crearTarjeta));
    } catch (error) {
      console.error(error);
      destacadaActual?.remove();
      const mensaje = document.createElement("p");
      mensaje.className = "text-white-50";
      mensaje.textContent = `No se pudieron cargar las noticias: ${error.message}`;
      cuadricula.replaceChildren(mensaje);
    }
  }
  
  cargarNoticias();