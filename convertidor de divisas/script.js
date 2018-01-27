var dolarHoy = 19.57;

function conversionPeso() {
  var peso = document.convertidor.valorPeso.value;
  var totalPeso = peso / dolarHoy;
  totalPeso = totalPeso.toFixed(2);
  document.convertidor.visor.value = totalPeso;
}

function conversionDolar() {
  var dolar = document.convertidor.valorDolar.value;
  var totalDolar = dolar * dolarHoy;
  totalDolar = totalDolar.toFixed(2);
  document.convertidor.visor.value = totalDolar;
}
