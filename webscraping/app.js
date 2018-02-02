/*El objetivo de este trabajo es extraer información de la URL elegida; Precisamente los titulos de las noticias y sus imagenes, para luego guardarlas en una base de datos. Para hacer el scraping utilizo el framework node.js, y la base de datos será mongoDB.*/

var request = require('request'),
    cheerio = require('cheerio'),
    fs      = require('fs');
    mongoose = require('mongoose');

    //Conectamos mongoDB al proyecto
    mongoose.connect('mongodb://localhost/appNoticias')
    //Creamos un modelo de los datos del proyecto.
    var datosModel = mongoose.model('datos', {
      titulo: String,
      imagen: String
    });

    request({url:'https://thehackernews.com/', encoding:'binary'},
      function(err, resp, body){
        if(!err && resp.statusCode == 200){
          var $ = cheerio.load(body);
          i = 0;
          $('.main-article-info').each(function(){
            var titulo = $(this).find('h2 a').html();
            var imagen = $(this).find('img').attr('src');
            var file = fs.createWriteStream('img/'+i+'.jpg/');//nombre imagen
            request(imagen).pipe(file);

            //almacenamos los datos del proyecto
            var datos = new datosModel({
              titulo: titulo,
              imagen: i+'.jpg'
            });

            //guardamos los datos y evaluamos que si existe error sea notificado
            datos.save(function(error){
              if(error){
                console.log(error);
              }
            });

            i++;

          });

          console.log('Fin'); //imprimimos un final de operación

        }
      });

      /*mongoose.connect('mongodb://127.0.0.1/myApp');
  var dataModel = mongoose.model('datos', {
        titulo: String,
        imagen: String
      });
  datos.save(function(error){
                if(error){
                  console.log(error);
                }
              });*/
