
function boton(num) {
  var salvarNumero = calculadora.visor.value;
  calculadora.visor.value = salvarNumero + num;
}

function limpiar() {
  document.getElementById("visor").value = "";
}

function calcular() {
  var resultado = document.getElementById("visor").value;
  document.getElementById("visor").value = eval(resultado);
}
