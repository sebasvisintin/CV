var noticias = obtenerNoticias();

// Esta la tienen que hacer, puede ser con while o for
function resaltarNoticiasQueContengan(palabra, color) {
  var noticiaActual;
  
  for (var contador = 0; contador < noticias.length; contador++) {
    noticiaActual = noticias[contador];

    if (contienePalabra(noticiaActual, palabra)) {
      cambiarColor(noticiaActual, color);      
    }
  }
}

//Oculto la noticia si contiene la palabra.
function ocultarNoticiasQueContengan(palabra) {
  var noticiaActual;

  for (var contador = 0; contador < noticias.length; contador++) {
    noticiaActual = noticias[contador];

    if (contienePalabra(noticiaActual, palabra)) {
      ocultarNoticia(noticiaActual);
    }
  }
}

//Recorto la noticia a la cantidad de palabras correcta.
function recortarNoticias(cantPalabras) {
  var noticiaActual;

  for (var contador = 0; contador < noticias.length; contador++) {
    noticiaActual = noticias[contador];
    recortarTexto(noticiaActual, cantPalabras);
  }
}

//Ejecuto las funciones
ocultarNoticiasQueContengan('Google');
resaltarNoticiasQueContengan('argentina', '#006bb9');
resaltarNoticiasQueContengan('robots', '#95072a');
recortarNoticias(20);
