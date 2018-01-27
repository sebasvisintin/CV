// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
[1, 2, 3],
[4, 5, 6],
[7, 8, 9]
];

/* Estas dos variables son para guardar la posición
de la pieza vacía. Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;


// Esta función va a chequear si el Rompecabezas esta en la posición ganadora
function chequearSiGano() {
// guardo la cantidad de filas de la grilla en una variable
var cantidadFilas = grilla.length;
var cantidadColumnas = grilla[0].length;

// En esta variable guardo el ultimo valor visto en la grilla
var ultimoValorVisto = 0;
var valorActual = 0;

// recorro cada fila columna por columna chequeando el orden de sus elementos
for (var fila=0; fila < cantidadFilas; fila++) {
  for (var columna = 0; columna < cantidadColumnas; columna++) {
    valorActual = grilla[fila][columna]
    if (valorActual < ultimoValorVisto) return false;

    // actualizamos el valor del ultimoValorVisto
    ultimoValorVisto = valorActual;
  }
}
return true;
}

function mostrarCartelGanador() {
alert("~(°u°~)¡¡ganaste!!(~°u°)~");
}
function intercambiarPosiciones(filaPos1, columnaPos1, filaPos2, columnaPos2){
// Intercambio posiciones en la grilla
var pieza1 = grilla[filaPos1][columnaPos1];
var pieza2 = grilla[filaPos2][columnaPos2];

grilla[filaPos1][columnaPos1] = pieza2;
grilla[filaPos2][columnaPos2] = pieza1;

// Seleccionamos las piezas
var elementoPieza1 = document.getElementById('pieza' + pieza1);
var elementoPieza2 = document.getElementById('pieza' + pieza2);

var padre = elementoPieza1.parentNode;

var clonElemento1 = elementoPieza1.cloneNode(true);
var clonElemento2 = elementoPieza2.cloneNode(true);

padre.replaceChild(clonElemento1, elementoPieza2);
padre.replaceChild(clonElemento2, elementoPieza1);
}

// Actualiza la posición de la pieza vacía
function actualizarposicionVacia(nuevaFila,nuevaColumna){
filaVacia = nuevaFila;
columnaVacia = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
return (fila >= 0 && fila <= 2) && (columna >= 0 && columna <= 2);
}

/* Movimiento de fichas, en este caso la que se mueve
es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa:
arriba, abajo, izquierda, derecha */
function moverEnDireccion(direccion) {
var nuevaFilaPiezaVacia;
var nuevaColumnaPiezaVacia;

// Intercambia pieza blanca con la pieza que está arriba suyo
if(direccion == 40){
  nuevaFilaPiezaVacia = filaVacia - 1;
  nuevaColumnaPiezaVacia = columnaVacia;
}
// Intercambia pieza blanca con la pieza que está abajo suyo
else if (direccion == 38) {
  nuevaFilaPiezaVacia = filaVacia + 1;
  nuevaColumnaPiezaVacia = columnaVacia;
}
// Intercambia pieza blanca con la pieza que está a su izq
else if (direccion == 39) {
  nuevaFilaPiezaVacia = filaVacia;
  nuevaColumnaPiezaVacia = columnaVacia - 1;
}
// Intercambia pieza blanca con la pieza que está a su der
else if (direccion == 37) {
  nuevaFilaPiezaVacia = filaVacia;
  nuevaColumnaPiezaVacia = columnaVacia + 1;
}

/* Se chequea si la nueva posición es válida, si lo es, se intercambia.
 Para que esta parte del código funcione correctamente deberás haber implementado
 las funciones posicionValida, intercambiarPosiciones y actualizarPosicionVacia */
if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
  intercambiarPosiciones(filaVacia, columnaVacia,
  nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  actualizarposicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
}

}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces){
if(veces<=0){return;}
var direcciones = [40, 38, 39, 37];
var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
moverEnDireccion(direccion);

setTimeout(function(){
  mezclarPiezas(veces-1);
},100);
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora,
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas(){
document.body.onkeydown = (function(evento) {
  if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();
      },500);
    }
    evento.preventDefault();
  }
})
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces
y ejecutando la función para que se capturen las teclas que
presiona el usuario */
function iniciar(){
mezclarPiezas(60);
capturarTeclas();
}

iniciar();
