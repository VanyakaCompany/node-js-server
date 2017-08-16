// Подключаемые модули
var express = require('express');
var hbs = require("hbs");


var app = express();  // Привязываем express к нашему "приложению"


// Для шаблонов страниц
hbs.registerPartials(__dirname + "/views/templates", function() {
  app.set("view engine", "hbs");


  // Обработчик запросов
  app.use(function(req, res, next) {
    res.render('index.hbs', {
      names: ['Vanyaka', 'Vasya', 'Nastya']
    });
  });


  app.listen(3000);   // Установка порта
});
