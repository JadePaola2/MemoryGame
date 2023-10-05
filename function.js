document.addEventListener("DOMContentLoaded", function(){
    //tomarDatos();
    mostrarDatos();
    mostrarVentanaJugador();
})

// Variables globales
const d = document;
let imagenes = [
    { nombre: "the100", url: "images/The100.jpg" },
    { nombre: "teotfw", url: "images/TEOTFW.jpg" },
    { nombre: "sabrina", url: "images/TheChilAdSabrina.jpg" },
    { nombre: "thegreat", url: "images/TheGreat.jpg" },
    { nombre: "theumbrella", url: "images/TheUmbrellaA.jpg" },
    { nombre: "twd", url: "images/TWD.jpeg" },
    { nombre: "the100", url: "images/The100.jpg" },
    { nombre: "teotfw", url: "images/TEOTFW.jpg" },
    { nombre: "sabrina", url: "images/TheChilAdSabrina.jpg" },
    { nombre: "thegreat", url: "images/TheGreat.jpg" },
    { nombre: "theumbrella", url: "images/TheUmbrellaA.jpg" },
    { nombre: "twd", url: "images/TWD.jpeg" }
];
let imagenes2 = [
    { nombre: "you", url: "images/You.jpg" },
    { nombre: "dynasty", url: "images/Dynasty.jpg" },
    { nombre: "chucky", url: "images/Chucky.jpg" },
    { nombre: "teenwolf", url: "images/TeenWolf.jpg" },
    { nombre: "lockeandkey", url: "images/Locke&Key.jpg" },
    { nombre: "hillhouse", url: "images/HillHouse.jpg" },
    { nombre: "you", url: "images/You.jpg" },
    { nombre: "dynasty", url: "images/Dynasty.jpg" },
    { nombre: "chucky", url: "images/Chucky.jpg" },
    { nombre: "teenwolf", url: "images/TeenWolf.jpg" },
    { nombre: "lockeandkey", url: "images/Locke&Key.jpg" },
    { nombre: "hillhouse", url: "images/HillHouse.jpg" }
];
let imagenes3 = [
    { nombre: "supergirl", url: "images/Supergirl.jpg" },
    { nombre: "arrow", url: "images/Arrow.jpg" },
    { nombre: "lot", url: "images/LOT.jpg" },
    { nombre: "sandman", url: "images/Sandman.jpg" },
    { nombre: "flash", url: "images/Flash.jpg" },
    { nombre: "sagawinx", url: "images/SagaWinx.jpg" },
    { nombre: "supergirl", url: "images/Supergirl.jpg" },
    { nombre: "arrow", url: "images/Arrow.jpg" },
    { nombre: "lot", url: "images/LOT.jpg" },
    { nombre: "sandman", url: "images/Sandman.jpg" },
    { nombre: "flash", url: "images/Flash.jpg" },
    { nombre: "sagawinx", url: "images/SagaWinx.jpg" }
]

// Variables globales
let tablero = d.querySelector(".tablero");
let posImg = [];
let nombreImg = [];
let aciertos = 0;
let intentos = 0;
let tiempo = 60;
let nivel = 1;
let imgNivel;
let mostrarIntentos = d.querySelector(".try");
let mostrarAciertos = d.querySelector(".guess");
let mostrarTiempo = d.querySelector(".time");
let mostrarNivel = d.querySelector(".level");
let botonIniciar = d.querySelector(".btn-iniciar");
let tiempoTranscurrido;
let estoyJugando = false;
let soundGuess = new Audio("sounds/Guess.mp3");
let soundChoose = new Audio("sounds/Choose.mp3");;
let soundError = new Audio("sounds/Error.mp3");;
let soundlevelUp = new Audio("sounds/levelUp.mp3");;
let soundClap = new Audio("sounds/Claps.mp3");
let soundGameOver = new Audio("sounds/GameOver.mp3")

// Agregar evento al botón para iniciar el juego
botonIniciar.addEventListener("click", function () {
    // Ejecutar función
    if (estoyJugando == false && nivel == 1) {
        estoyJugando = true;
        mostrarNivel.textContent = nivel;
        agregarImg();
        tiempoJuego();
        imgNivel.sort(() => Math.random() - 0.5);
    } else if (estoyJugando == false && nivel == 2) {
        estoyJugando = true;
        agregarImg();
        tiempoJuego();
        imgNivel.sort(() => Math.random() - 0.5);
    } else if (estoyJugando == false && nivel == 3) {
        estoyJugando = true;
        agregarImg();
        tiempoJuego();
        imgNivel.sort(() => Math.random() - 0.5);
    }
});

function tiempoJuego() {
    // El jugador pierde por tiempo
    tiempoTranscurrido = setInterval(() => {
        tiempo--;
        mostrarTiempo.textContent = tiempo;
        if (tiempo == 10) {
            mostrarTiempo.style.color = "red";
        }
        if (tiempo == 0 || intentos == 20) {
            clearInterval(tiempoTranscurrido);
            //alert("Has perdido ☠");
            //location.reload();
            tomarDatos(); 
            mostrarGameOver();
        }
        //console.log("Segundos: " + tiempo);
        if (aciertos === 6 && nivel === 3) {
            clearInterval(tiempoTranscurrido);
        }
    }, 1000);

}

// Función agregar imagenes al tablero de juego
function agregarImg() {
    if (nivel == 1) {
        imgNivel = imagenes;
    } else if (nivel == 2) {
        imgNivel = imagenes2;
    } else if (nivel == 3) {
        imgNivel = imagenes3;
    }
    for (let index = 0; index < imgNivel.length; index++) {
        let div = d.createElement("div");
        let img = d.createElement("img");
        div.setAttribute("class", "col-3");
        img.setAttribute("class", "img-fluid alto-img my-1");
        img.setAttribute("src", "images/LuckyImage2.jpg");
        img.setAttribute("id", index);
        img.addEventListener("click", mostrarImg)
        div.appendChild(img);
        tablero.appendChild(div);
    }
}

// Mostrar imagenes
function mostrarImg() {
    let imgID = this.getAttribute("id");
    //alert("Position img: " + imgID);
    if (!posImg.includes(imgID)) {
        this.setAttribute("src", imgNivel[imgID].url);
        posImg.push(imgID);
        nombreImg.push(imgNivel[imgID].nombre);
        // Comparar imagenes
        if (nombreImg.length == 2) {
            setTimeout(compararImg, 300);
        }
    }
}

// Comparar imagenes
function compararImg() {
    let todasImg = d.querySelectorAll(".tablero div img");
    if (nombreImg[0] == nombreImg[1]) {
        if (posImg[0] != posImg[1]) {
            //alert("Son iguales")
            todasImg[posImg[0]].setAttribute("src", "images/CheckMark.png");
            todasImg[posImg[1]].setAttribute("src", "images/CheckMark.png");
            todasImg[posImg[0]].removeEventListener("click", mostrarImg);
            todasImg[posImg[1]].removeEventListener("click", mostrarImg);
            aciertos++;
            mostrarAciertos.textContent = aciertos;
            soundGuess.play();
        } else {
            //alert("Debes escoger otra imagen")
            todasImg[posImg[0]].setAttribute("src", "images/LuckyImage2.jpg");
            intentos++;
            mostrarIntentos.textContent = intentos;
            soundError.play();
        }
    } else {
        //alert("No son iguales");
        todasImg[posImg[0]].setAttribute("src", "images/LuckyImage2.jpg");
        todasImg[posImg[1]].setAttribute("src", "images/LuckyImage2.jpg");
        intentos++;
        mostrarIntentos.textContent = intentos;
        soundError.play();
    }
    nombreImg = [];
    posImg = [];

    // Si gana el jugador
    if (aciertos == 6 && nivel == 1) {
        alert("¡Felicitaciones!, has pasado al nivel 2 🎃");
        //location.reload();
        nivel = 2;
        mostrarNivel.textContent = nivel;
        aciertos = 0;
        mostrarAciertos.textContent = aciertos;
        intentos = 0;
        mostrarIntentos.textContent = intentos;
        tiempo = 45;
        mostrarTiempo.textContent = tiempo;
        clearInterval(tiempoTranscurrido);
        quitarImagenes();
        estoyJugando = false;
        soundlevelUp.play();
    } else if (aciertos == 6 && nivel == 2) {
        alert("¡Felicitaciones!, has pasado al nivel 3 🎃");
        //location.reload();
        nivel = 3;
        mostrarNivel.textContent = nivel;
        aciertos = 0;
        mostrarAciertos.textContent = aciertos;
        intentos = 0;
        mostrarIntentos.textContent = intentos;
        tiempo = 30;
        mostrarTiempo.textContent = tiempo;
        clearInterval(tiempoTranscurrido);
        quitarImagenes();
        estoyJugando = false;
        soundlevelUp.play();
    } else if (aciertos == 6 && nivel == 3) {
        alert("¡Felicitaciones!, has terminado el juego 🎃");
        tomarDatos();
        mostrarCelebracion();
        //location.reload();
    }
}

function quitarImagenes() {
    let todasLasImagenes = d.querySelectorAll(".tablero div");
    todasLasImagenes.forEach((img) => {
        img.remove();
    })
}

// Ganar el juego
function mostrarCelebracion() {
    deshabilitarInteraccion();
    let celebrationContainer = document.querySelector('.celebration-container');
    let celebrationImage = document.getElementById('celebration');
    celebrationContainer.classList.add('active');
    celebrationImage.src = "images/Celebration.gif";
    soundClap.play();
}

// Perder el juego

function mostrarGameOver() {
    deshabilitarInteraccion();
    let gameOverContainer = document.querySelector('.game-over-container');
    let gameOverImage = document.getElementById('gameOver');
    gameOverContainer.classList.add('active');
    gameOverImage.src = "images/GameOver.gif";
    soundGameOver.play();
}


// Deshabilitar la interacción con el fondo con los gifs
function deshabilitarInteraccion() {
    document.body.style.pointerEvents = "none";
    setTimeout(habilitarInteraccion, 5000);
}

function habilitarInteraccion() {
    document.body.style.pointerEvents = "auto";
    location.reload();
}


// Funcion para mostrar ventana del nombre

function mostrarVentanaJugador() {
    let mostraModal = d.querySelector(".modalNombre");
    let cerrarModal = d.querySelectorAll(".cerrar");
    mostraModal.classList.add("show");
    mostraModal.style.display = "block"
    for (let index = 0; index < cerrarModal.length; index++) {
        cerrarModal[index].addEventListener("click", function () {
            mostraModal.classList.add("show");
            mostraModal.style.display = "none";
        });
    }
    namePlayer();
}

// Función tomar nombre del jugador
function namePlayer() {
    let mostrarJugador = d.querySelector(".player-name");
    let btn_registrarJ = d.querySelector(".registrar");
    btn_registrarJ.addEventListener("click", function() {
        let jugadorN = d.querySelector(".nombreJ");
        mostrarJugador.textContent = jugadorN.value;
    })
}