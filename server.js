// Подключаемые модули
var express = require('express');
var url = require("url");
var hbs = require("hbs");


var app = express();  // Привязываем express к нашему "приложению"
app.use(express.static(__dirname + '/public')); // Теперь мы сможем обращаться из браузера к любым файлам в этой папке


// Для шаблонов страниц
hbs.registerPartials(__dirname + "/views/templates", function() {
  app.set("view engine", "hbs");


  // Блок переменных
  var pathname = '';  // Переменная для хранения текущего url
  var result;         // Переменная для хранения результата вызываемых ф-й

  // База данных
  var bd = [
    {url: '/', file: 'index.hbs'},
    {url: '/about', file: 'about.hbs'},
    {url: '/contacts', file: 'contacts.hbs'},
    {url: '/post-1.html', file: 'post_1.hbs'},
    {url: '/post-2.html', file: 'post_2.hbs'}
  ];


  // Обработчик запросов
  app.use(function(req, res, next) {
    // Определяем текущий url
    pathname = url.parse(req.url).pathname;

    // Проверяем url
    result = find(bd , pathname);
    if(result != -1) {
      res.render(bd[result].file);         // Если страница найдена, то отправить соответствующий файл на клиент
    } else {
      res.status(404).render('404.hbs');   // Иначе, отправить ошибку 404
    }
  });


  app.listen(3000);   // Установка порта
});


// Функция поиска в массиве
function find(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].url == value) return i;
  }
  return -1;
}
