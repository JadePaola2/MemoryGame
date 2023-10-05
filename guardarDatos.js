// Variables de estadística

let nombreJugador = document.querySelector(".player-name");
let nivelJugador = document.querySelector(".level");
let intentosJugador = document.querySelector(".try");
let aciertosJugador = document.querySelector(".guess");
let tiempoJugador = document.querySelector(".time");

// Función tomar datos del juego
function tomarDatos() {
    // Objeto para recoger las estadísticas del navegador
    let datos = {
        "nombre" : nombreJugador.textContent,
        "nivel" : nivelJugador.textContent,
        "tiempo" : tiempoJugador.textContent,
        "intentos" : intentosJugador.textContent,
        "aciertos" : aciertosJugador.textContent
    }
    //console.log(datos.nombre)
    guardarDatos(datos);
}

// Clave para guardar las estadísticas
const DatosJugadores = "Jugadores";

// Función para guardar las estadísticas en el navegador
function guardarDatos(objeto) {
    // Arreglo para guardar las estadísticas
    let Jugadores = [];
    // Tomar las estadísticas guardados previamente en el navegador
    let tomarDatosNavegador = localStorage.getItem(DatosJugadores);
    // Comprobar si hay estadísticas guardadas previamente
    if (tomarDatosNavegador !== null) {
        Jugadores = JSON.parse(tomarDatosNavegador);
    }
    // Agregar las estadísticas del jugador al arreglo
    Jugadores.push(objeto);
    // Mostrar estadísticas del jugador o jugadores en consola
    //console.log(Jugadores);
    //Guardar las estadísticas en el navegador
    localStorage.setItem(DatosJugadores, JSON.stringify(Jugadores));
    console.log(tomarDatosNavegador);
}

// Función mostrar las estadísticas guardadas en el navegador
// Agregarlos a la tabla
function mostrarDatos() {
    // Arreglo para guardar las estadísticas
    let Jugadores = [];
    // Tomar las estadísticas guardados previamente en el navegador
    let tomarDatosNavegador = localStorage.getItem(DatosJugadores);
    // Comprobar si hay estadísticas guardadas previamente
    if (tomarDatosNavegador !== null) {
        Jugadores = JSON.parse(tomarDatosNavegador);
    }

    // Ordenar jugadores por número de intentos (menos intentos :})
    Jugadores.sort((a, b) => a.intentos - b.intentos);
    Jugadores.sort((a, b) => b.nivel - a.nivel);

    // Seleccionar tabla para cargar las estadísticas
    let tabla = document.querySelector(".tabla-estadisticas tbody");
    Jugadores.forEach((element, i) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td> ${i + 1} </td>
            <td> ${element.nombre} </td>
            <td> ${element.nivel} </td>
            <td> ${element.intentos} </td>
            <td> ${element.aciertos} </td>
            <td> ${element.tiempo} seg. </td>
        `
        tabla.appendChild(tr);
        console.log(tr);
    });
}
