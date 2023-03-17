let jugadores = [];
let turno = 0;
let jugadaSeleccionada = "";
let puntosJugada = 0;
let jugadaServida = false;

function iniciarPartida() {
  const jugador1 = document.getElementById("jugador1").value;
  const jugador2 = document.getElementById("jugador2").value;

  if (jugador1 !== "" && jugador2 !== "") {
    jugadores.push({nombre: jugador1, puntos: []});
    jugadores.push({nombre: jugador2, puntos: []});
    turno = 0;
    jugadaSeleccionada = "";
    puntosJugada = 0;
    jugadaServida = false;
    crearGrilla();
  } else {
    alert("Por favor ingrese los nombres de ambos jugadores.");
  }
}

function crearGrilla() {
  const grilla = document.getElementById("grilla");

  // Crear la tabla de la grilla
  const tabla = document.createElement("table");
  tabla.setAttribute("id", "tablaGrilla");

  // Crear la fila de encabezado con los nombres de los jugadores
  const filaEncabezado = document.createElement("tr");
  const celdaVacia = document.createElement("td");
  filaEncabezado.appendChild(celdaVacia);
  jugadores.forEach(jugador => {
    const celdaJugador = document.createElement("th");
    celdaJugador.textContent = jugador.nombre;
    filaEncabezado.appendChild(celdaJugador);
  });
  tabla.appendChild(filaEncabezado);

  // Crear las filas de las jugadas
  const jugadas = ["1", "2", "3", "4", "5", "6", "Escalera", "Full", "Poker", "Generala", "Generala Doble"];
  jugadas.forEach(jugada => {
    const filaJugada = document.createElement("tr");
    const celdaJugada = document.createElement("td");
    celdaJugada.textContent = jugada;
    filaJugada.appendChild(celdaJugada);
    jugadores.forEach(jugador => {
      const celdaPuntos = document.createElement("td");
      celdaPuntos.setAttribute("id", jugador.nombre + "-" + jugada.toLowerCase().replace(" ", "-"));
      celdaPuntos.addEventListener("click", () => seleccionarJugada(jugador.nombre, jugada));
      filaJugada.appendChild(celdaPuntos);
    });
    tabla.appendChild(filaJugada);
  });

  grilla.appendChild(tabla);
}

function seleccionarJugada(nombreJugador, jugada) {
  //
  const puntosJugadaSeleccionada = obtenerPuntosJugada(jugada);
  const celdaPuntos = document.getElementById(nombreJugador + "-" + jugada.toLowerCase().replace(" ", "-"));

  // Si la jugada no está tachada
  if (!celdaPuntos.classList.contains("tachado")) {
    // Si la jugada no fue seleccionada previamente, seleccionarla
    if (jugadaSeleccionada === "") {
      jugadaSeleccionada = jugada;
      celdaPuntos.classList.add("seleccionado");
      puntosJugada = puntosJugadaSeleccionada + (jugadaServida ? 5 : 0);
    // Si la jugada ya fue seleccionada previamente y se seleccionó otra jugada, deseleccionar la jugada previa y seleccionar la nueva
    } else if (jugadaSeleccionada !== jugada) {
      const celdaJugadaSeleccionada = document.getElementById(nombreJugador + "-" + jugadaSeleccionada.toLowerCase().replace(" ", "-"));
      celdaJugadaSeleccionada.classList.remove("seleccionado");
      jugadaSeleccionada = jugada;
      celdaPuntos.classList.add("seleccionado");
      puntosJugada = puntosJugadaSeleccionada + (jugadaServida ? 5 : 0);
    // Si la jugada ya fue seleccionada previamente y se seleccionó de nuevo la misma jugada, deseleccionarla
    } else {
      jugadaSeleccionada = "";
      celdaPuntos.classList.remove("seleccionado");
      puntosJugada = 0;
    }
  }
}

function obtenerPuntosJugada(jugada) {
  switch (jugada) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
      return contarDados(jugada);
    case "Escalera":
      return verificarEscalera();
    case "Full":
      return verificarFull();
    case "Poker":
      return verificarPoker();
    case "Generala":
      return verificarGenerala();
    case "Generala Doble":
      return verificarGeneralaDoble();
    default:
      return 0;
  }
}

function contarDados(numero) {
  let contador = 0;
  jugadores[turno].puntos.forEach(punto => {
    if (punto === parseInt(numero)) {
      contador++;
    }
  });
  return contador * parseInt(numero);
}

function verificarEscalera() {
  const dadosOrdenados = jugadores[turno].puntos.sort();
  if (dadosOrdenados[0] === 1 && dadosOrdenados[1] === 2 && dadosOrdenados[2] === 3 && dadosOrdenados[3] === 4 && dadosOrdenados[4] === 5) {
    return 20;
  } else if (dadosOrdenados[0] === 2 && dadosOrdenados[1] === 3 && dadosOrdenados[2] === 4 && dadosOrdenados[3] === 5 && dadosOrdenados[4] === 6) {
    return 20;
  } else {
    return 0;
  }
}

// Verificar si hay Full en los puntos del jugador actual
function verificarFull() {
    const dadosOrdenados = jugadores[turno].puntos.sort();
    if (
      (dadosOrdenados[0] === dadosOrdenados[1] &&
        dadosOrdenados[1] === dadosOrdenados[2] &&
        dadosOrdenados[3] === dadosOrdenados[4]) ||
      (dadosOrdenados[0] === dadosOrdenados[1] &&
        dadosOrdenados[2] === dadosOrdenados[3] &&
        dadosOrdenados[3] === dadosOrdenados[4])
    ) {
      return true;
    } else {
      return false;
    }
  }

  function verificarPoker() {
        const dadosOrdenados = jugadores[turno].puntos.sort();
        if (dadosOrdenados[0] === dadosOrdenados[3] || dadosOrdenados[1] === dadosOrdenados[4]) {
          return 40;
        } else {
          return 0;
        }
      }
      
      function verificarGenerala() {
        const dadosOrdenados = jugadores[turno].puntos.sort();
        if (dadosOrdenados[0] === dadosOrdenados[4]) {
          return 50;
        } else {
          return 0;
        }
      }
      
      function verificarGeneralaDoble() {
        const dadosOrdenados = jugadores[turno].puntos.sort();
        if (dadosOrdenados[0] === dadosOrdenados[3] && dadosOrdenados[4] === dadosOrdenados[1]) {
          return 60;
        } else {
          return 0;
        }
      }
      
      function actualizarTablaPuntos() {
        const tablaPuntos = document.getElementById("tabla-puntos");
        tablaPuntos.innerHTML = "";
      
        // Cabezal de la tabla
        let cabecera = document.createElement("tr");
        let columnaJugador = document.createElement("th");
        columnaJugador.innerText = "Jugador";
        cabecera.appendChild(columnaJugador);
      
        for (let i = 1; i <= 6; i++) {
          let columnaNumero = document.createElement("th");
          columnaNumero.innerText = i;
          cabecera.appendChild(columnaNumero);
        }
      
        let columnaEscalera = document.createElement("th");
        columnaEscalera.innerText = "Escalera";
        cabecera.appendChild(columnaEscalera);
      
        let columnaFull = document.createElement("th");
        columnaFull.innerText = "Full";
        cabecera.appendChild(columnaFull);
      
        let columnaPoker = document.createElement("th");
        columnaPoker.innerText = "Poker";
        cabecera.appendChild(columnaPoker);
      
        let columnaGenerala = document.createElement("th");
        columnaGenerala.innerText = "Generala";
        cabecera.appendChild(columnaGenerala);
      
        let columnaGeneralaDoble = document.createElement("th");
        columnaGeneralaDoble.innerText = "Generala Doble";
        cabecera.appendChild(columnaGeneralaDoble);
      
        let columnaTotal = document.createElement("th");
        columnaTotal.innerText = "Total";
        cabecera.appendChild(columnaTotal);
      
        tablaPuntos.appendChild(cabecera);
      
        // Filas de la tabla
        jugadores.forEach(jugador => {
          let filaJugador = document.createElement("tr");
      
          let columnaNombreJugador = document.createElement("td");
          columnaNombreJugador.innerText = jugador.nombre;
          filaJugador.appendChild(columnaNombreJugador);
      
          for (let i = 1; i <= 6; i++) {
            let columnaPuntosNumero = document.createElement("td");
            columnaPuntosNumero.setAttribute("id", jugador.nombre + "-" + i);
            if (jugador.puntos.includes(i)) {
              columnaPuntosNumero.innerText = i;
            } else {
              columnaPuntosNumero.innerText = "-";
            }
            if (jugador.jugadas[i - 1]) {
              columnaPuntosNumero.classList.add("tachado");
            }
            filaJugador.appendChild(columnaPuntosNumero);
          }
      
          let columnaPuntosEscalera = document.createElement("td");
          columnaPuntosEscalera.setAttribute("id", jugador.nombre + "-escalera");
          if (jugador.puntos.includes(20)) {
            columnaPuntosEscalera.innerText = 20;
          } else {
            columnaPuntosEscalera.innerText = "-";
        }
        if (jugador.jugadas[6]) {
            columnaPuntosEscalera.classList.add("tachado");
        }
        filaJugador.appendChild(columnaPuntosEscalera);
        let columnaPuntosFull = document.createElement("td");
columnaPuntosFull.setAttribute("id", jugador.nombre + "-full");
if (jugador.puntos.includes(30)) {
  columnaPuntosFull.innerText = 30;
} else {
  columnaPuntosFull.innerText = "-";
}
if (jugador.jugadas[7]) {
  columnaPuntosFull.classList.add("tachado");
}
filaJugador.appendChild(columnaPuntosFull);

let columnaPuntosPoker = document.createElement("td");
columnaPuntosPoker.setAttribute("id", jugador.nombre + "-poker");
if (jugador.puntos.includes(40)) {
  columnaPuntosPoker.innerText = 40;
} else {
  columnaPuntosPoker.innerText = "-";
}
if (jugador.jugadas[8]) {
  columnaPuntosPoker.classList.add("tachado");
}
filaJugador.appendChild(columnaPuntosPoker);

let columnaPuntosGenerala = document.createElement("td");
columnaPuntosGenerala.setAttribute("id", jugador.nombre + "-generala");
if (jugador.puntos.includes(50)) {
  columnaPuntosGenerala.innerText = 50;
} else {
  columnaPuntosGenerala.innerText = "-";
}
if (jugador.jugadas[9]) {
  columnaPuntosGenerala.classList.add("tachado");
}
filaJugador.appendChild(columnaPuntosGenerala);

let columnaPuntosGeneralaDoble = document.createElement("td");
columnaPuntosGeneralaDoble.setAttribute("id", jugador.nombre + "-generala-doble");
if (jugador.puntos.includes(60)) {
  columnaPuntosGeneralaDoble.innerText = 60;
} else {
  columnaPuntosGeneralaDoble.innerText = "-";
}
if (jugador.jugadas[10]) {
  columnaPuntosGeneralaDoble.classList.add("tachado");
}
filaJugador.appendChild(columnaPuntosGeneralaDoble);

let columnaPuntosTotal = document.createElement("td");
columnaPuntosTotal.setAttribute("id", jugador.nombre + "-total");
columnaPuntosTotal.innerText = jugador.puntos.reduce((total, puntos) => total + puntos, 0);
filaJugador.appendChild(columnaPuntosTotal);

tablaPuntos.appendChild(filaJugador);
});
}

function siguienteTurno() {
// Actualizar el turno
turno++;
if (turno >= jugadores.length) {
turno = 0;
}

// Reiniciar los dados
dados = [0, 0, 0, 0, 0];

// Reiniciar las jugadas
if (jugadores[turno].jugadas.length === 0) {
jugadores[turno].jugadas = new Array(11).fill(false);
}

// Actualizar la tabla de puntos
actualizarTablaPuntos();

// Actualizar la información del turno actual
actualizarInformacionTurno();
}

function actualizarInformacionTurno() {
const informacionTurno = document.getElementById("informacion-turno");
informacionTurno.innerHTML = "";
let textoTurno = document.createElement("p");
textoTurno.innerText = "Turno de " + jugadores[turno].nombre;
informacionTurn
const tirarDados = document.createElement("button");
tirarDados.innerText = "Tirar dados";
tirarDados.addEventListener("click", () => {
// Tirar los dados
for (let i = 0; i < dados.length; i++) {
dados[i] = Math.floor(Math.random() * 6) + 1;
}
// Actualizar los dados en la interfaz
actualizarDados();

// Habilitar los botones de las jugadas que aún no se han realizado
habilitarBotonesJugadas();

// Deshabilitar el botón de tirar dados
tirarDados.disabled = true;
});

const siguiente = document.createElement("button");
siguiente.innerText = "Siguiente";
siguiente.disabled = true;
siguiente.addEventListener("click", () => {
// Calcular los puntos de la jugada seleccionada
const puntos = calcularPuntosJugada(jugadaSeleccionada);
// Actualizar los puntos del jugador
jugadores[turno].puntos.push(puntos);
jugadores[turno].jugadas[jugadaSeleccionada] = true;

// Actualizar la tabla de puntos
actualizarTablaPuntos();

// Habilitar el botón de tirar dados
tirarDados.disabled = false;

// Deshabilitar el botón de siguiente
siguiente.disabled = true;

// Seleccionar la siguiente jugada
seleccionarJugada();
});

const botonesJugadas = document.querySelectorAll(".jugada button");
botonesJugadas.forEach((botonJugada) => {
botonJugada.addEventListener("click", () => {
// Deshabilitar los botones de las jugadas
botonesJugadas.forEach((boton) => (boton.disabled = true));
  // Guardar la jugada seleccionada
  jugadaSeleccionada = parseInt(botonJugada.getAttribute("data-jugada"));

  // Si se seleccionó una jugada servida, agregar 5 puntos adicionales
  if (jugadaSeleccionada === 0) {
    jugadores[turno].puntos.push(5);
    jugadaSeleccionada = 1;
  }

  // Deshabilitar el botón de tirar dados
  tirarDados.disabled = true;

  // Habilitar el botón de siguiente
  siguiente.disabled = false;
});
});

informacionTurno.appendChild(textoTurno);
informacionTurno.appendChild(tirarDados);
informacionTurno.appendChild(siguiente);
}

function calcularPuntosJugada(jugada) {
let puntos = 0;

switch (jugada) {
case 1:
puntos = calcularPuntosNumeros(1);
break;
case 2:
puntos = calcularPuntosNumeros(2);
break;
case 3:
puntos = calcularPuntosNumeros(3);
break;
case 4:
puntos = calcularPuntosNumeros(4);
break;
case 5:
puntos = calcularPuntosNumeros(5);
break;
case 6:
puntos = calcularPuntosNumeros(6);
break;
case 7:
puntos = calcularPuntosEscalera();
break;
case 8:
puntos = calcularPuntosFull();
break;
case 9:
puntos = calcularPuntosPoker();
break;
case 10:
puntos = calcularPuntosGenerala();
break;
}

return puntos;
}

function calcularPuntosNumeros(numero) {
    let puntos = 0;
    for (let i = 0; i < dados.length; i++) {
    if (dados[i] === numero) {
    puntos += numero;
    }
    }
    return puntos;
    }
    
    function calcularPuntosEscalera() {
    const valoresUnicos = Array.from(new Set(dados)).sort();
    if (valoresUnicos.length === 5) {
    if (
    (valoresUnicos[0] === 1 && valoresUnicos[4] === 5) ||
    (valoresUnicos[0] === 2 && valoresUnicos[4] === 6)
    ) {
    return 20;
    }
    }
    return 0;
    }
    
    function calcularPuntosFull() {
    const valoresUnicos = Array.from(new Set(dados));
    if (valoresUnicos.length === 2) {
    const cantidadValores1 = dados.filter((dado) => dado === valoresUnicos[0])
    .length;
    const cantidadValores2 = dados.filter((dado) => dado === valoresUnicos[1])
    .length;
    if (cantidadValores1 === 2 && cantidadValores2 === 3) {
    return 30;
    } else if (cantidadValores1 === 3 && cantidadValores2 === 2) {
    return 30;
    }
    }
    return 0;
    }
    
    function calcularPuntosPoker() {
    const valoresUnicos = Array.from(new Set(dados));
    if (valoresUnicos.length <= 2) {
    for (let i = 0; i < valoresUnicos.length; i++) {
    const cantidadValores = dados.filter(
    (dado) => dado === valoresUnicos[i]
    ).length;
    if (cantidadValores >= 4) {
    return 40;
    }
    }
    }
    return 0;
    }
    
    function calcularPuntosGenerala() {
    if (dados.every((dado) => dado === dados[0])) {
    return 50;
    }
    return 0;
    }
    
    function actualizarTablaPuntos() {
    const tablaPuntos = document.querySelector(".tabla-puntos");
    tablaPuntos.innerHTML = "";
// Crear la fila de encabezados
const encabezados = document.createElement("tr");
const encabezadoJugador = document.createElement("th");
encabezadoJugador.innerText = "Jugador";
encabezados.appendChild(encabezadoJugador);

for (let i = 0; i < jugadores.length; i++) {
  const encabezadoJugada = document.createElement("th");
  encabezadoJugada.innerText = jugadores[i].nombre;
  encabezados.appendChild(encabezadoJugada);
}

tablaPuntos.appendChild(encabezados);

// Crear las filas de puntos de cada jugada
for (let i = 0; i < 10; i++) {
  const fila = document.createElement("tr");
  const celdaJugada = document.createElement("td");
  celdaJugada.innerText = jugadas[i];
  fila.appendChild(celdaJugada);

  for (let j = 0; j < jugadores.length; j++) {
    const celdaPuntos = document.createElement("td");
    if (jugadores[j].jugadas[i]) {
      celdaPuntos.innerText = jugadores[j].puntos[i];
    } else {
      celdaPuntos.innerText = "-";
    }
    fila.appendChild(celdaPuntos);
  }

  tablaPuntos.appendChild(fila);
}
}

function registrarJugada(jugador, jugada, puntos) {
jugador.jugadas[jugada] = true;
jugador.puntos[jugada] = puntos;
}

function tacharJugada(jugador, jugada) {
jugador.jugadas[jugada] = true;
jugador.puntos[jugada] = 0;
}

function jugar() {
    // Obtener los nombres de los jugadores
    let jugador1 = document.getElementById("jugador1").value;
    let jugador2 = document.getElementById("jugador2").value;
  
    // Verificar que se hayan ingresado los nombres de los jugadores
    if (jugador1 === "" || jugador2 === "") {
      alert("Por favor ingrese los nombres de los jugadores.");
      return;
    }
  
    // Ocultar el formulario de ingreso de nombres y mostrar la grilla de anotación
    document.getElementById("ingreso-nombres").style.display = "none";
    document.getElementById("grilla-anotacion").style.display = "block";
  
    // Mostrar los nombres de los jugadores en la grilla de anotación
    document.getElementById("nombre-jugador1").textContent = jugador1;
    document.getElementById("nombre-jugador2").textContent = jugador2;
  
    // Variables para llevar el control de los puntos de cada jugador
    let puntosJugador1 = {
      uno: null,
      dos: null,
      tres: null,
      cuatro: null,
      cinco: null,
      seis: null,
      escalera: null,
      full: null,
      poker: null,
      generala: null,
      generalaDoble: null,
      total: 0
    };
  
    let puntosJugador2 = {
      uno: null,
      dos: null,
      tres: null,
      cuatro: null,
      cinco: null,
      seis: null,
      escalera: null,
      full: null,
      poker: null,
      generala: null,
      generalaDoble: null,
      total: 0
    };
  
    // Función para actualizar los puntos de un jugador en la grilla de anotación
    function actualizarPuntos(jugador, jugada, puntos) {
      // Obtener la celda correspondiente a la jugada y el jugador
      let celda = document.getElementById(jugada + "-" + jugador);
  
      // Verificar si la jugada ha sido tachada
      let tachado = celda.classList.contains("tachado");
  
      // Actualizar los puntos del jugador
      jugador[jugada] = tachado ? 0 : puntos;
  
      // Actualizar la celda correspondiente
      celda.textContent = tachado ? "-" : puntos;
      celda.classList.remove("disponible");
      celda.classList.add("anotado");
  
      // Actualizar el total de puntos del jugador
      jugador.total = 0;
      for (let jugada in jugador) {
        if (jugada !== "total" && jugador[jugada] !== null) {
          jugador.total += jugador[jugada];
        }
      }
      document.getElementById("total-" + jugador).textContent = jugador.total;
  
      // Cambiar el turno al otro jugador
      if (jugador === "jugador1") {
        document.getElementById("turno").textContent = jugador2;
      } else {
        document.getElementById("turno").textContent = jugador1;
      }
    }
  
    // Función para deshabilitar las celdas que ya fueron anotadas por ambos jugadores
function deshabilitarCeldas() {
    // Recorrer todas las celdas de la grilla de anotación
    let celdas = document.getElementsByClassName("celda");
    for (let i = 0; i < celdas.length; i++) {
      // Obtener la jugada y el jugador actual
      let jugada = celdas[i].getAttribute("data-jugada");
      let jugador = celdas[i].getAttribute("data-jugador");
  
      // Verificar si la jugada ya fue anotada por ambos jugadores
      if (
        jugadores[0].anotaciones[jugada] !== null &&
        jugadores[1].anotaciones[jugada] !== null
      ) {
        // Deshabilitar la celda
        celdas[i].setAttribute("disabled", "disabled");
      } else {
        // Habilitar la celda
        celdas[i].removeAttribute("disabled");
      }
    }
  }
  
// Obtener el total de puntos de cada jugador y mostrarlos
function obtenerTotalPuntos() {
    for (let i = 0; i < jugadores.length; i++) {
      let total = 0;
      for (let j = 0; j < jugadas.length; j++) {
        if (jugadores[i][jugadas[j]] != "") {
          total += parseInt(jugadores[i][jugadas[j]]);
        }
      }
      jugadores[i]["total"] = total;
      document.getElementById("total-" + i).textContent = total;
    }
  }
  
  // Verificar si hay un ganador y mostrarlo
  function verificarGanador() {
    for (let i = 0; i < jugadores.length; i++) {
      if (jugadores[i]["total"] >= puntosParaGanar) {
        document.getElementById("ganador").textContent = "El ganador es " + jugadores[i]["nombre"] + "!";
        document.getElementById("boton-jugar").disabled = true;
        break;
      }
    }
  }
  
  // Función principal para jugar una ronda
  function jugar() {
    obtenerNombresJugadores();
    mostrarGrilla();
    document.getElementById("boton-jugar").style.display = "none";
    document.getElementById("boton-reiniciar").style.display = "block";
  }
  
  // Función para reiniciar el juego
  function reiniciar() {
    for (let i = 0; i < jugadores.length; i++) {
      for (let j = 0; j < jugadas.length; j++) {
        jugadores[i][jugadas[j]] = "";
        document.getElementById(i + "-" + jugadas[j]).textContent = "";
      }
      document.getElementById("total-" + i).textContent = "";
      jugadores[i]["total"] = 0;
    }
    document.getElementById("ganador").textContent = "";
    document.getElementById("boton-reiniciar").style.display = "none";
    document.getElementById("boton-jugar").style.display = "block";
    document.getElementById("input-nombre-0").value = "";
    document.getElementById("input-nombre-1").value = "";
  }
  
  // Asignar eventos a los botones
  document.getElementById("boton-jugar").addEventListener("click", jugar);
  document.getElementById("boton-reiniciar").addEventListener("click", reiniciar);
    
