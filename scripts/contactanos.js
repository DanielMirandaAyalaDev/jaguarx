// 1. SELECCIONAMOS LOS ELEMENTOS

const formulario = document.querySelector("#formContacto");

const nombre = document.querySelector("#nombre");

const correo = document.querySelector("#correo");

const comentarios = document.querySelector("#comentarios");

const message = document.querySelector("#msg");


// 2. DECLARAMOS LA CLAVE DE LOCAL STORAGE

const CLAVE = "jaguarx_contactos";


// 3. FUNCION PARA GUARDAR LOS CONTACTOS

function guardarContacto(event) {

    // Evitamos que la pagina se recargue
    event.preventDefault();


    // Obtenemos los valores del formulario

    const nuevoContacto = {

        nombre: nombre.value,

        correo: correo.value,

        comentarios: comentarios.value,

        fecha: new Date().toLocaleString()

    };


    // Recuperamos los contactos guardados

    const contactos = JSON.parse(localStorage.getItem(CLAVE)) || [];


    // Agregamos el nuevo contacto

    contactos.push(nuevoContacto);


    // Guardamos los contactos en Local Storage

    localStorage.setItem(CLAVE, JSON.stringify(contactos));


    // Mostramos mensaje de confirmacion

    message.innerText = "¡Mensaje guardado correctamente!";


    // Limpiamos los campos del formulario

    formulario.reset();

}


// 4. FUNCION PARA CARGAR LOS CONTACTOS

function cargarContactos() {

    // Recuperamos los contactos almacenados

    const guardados = JSON.parse(localStorage.getItem(CLAVE)) || [];


    // Comprobamos si existen contactos

    if (guardados.length > 0) {

        message.innerText = "Tienes " + guardados.length + " mensajes guardados.";

    } else {

        message.innerText = "No hay mensajes guardados.";

    }

}


// 5. CONECTAMOS LOS EVENTOS

formulario.addEventListener("submit", guardarContacto);

window.addEventListener("DOMContentLoaded", cargarContactos);
