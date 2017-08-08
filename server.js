// Подключаемые модули
var express = require('express');
var url = require("url");


var app = express();  // Создаем объект приложения


// Блок переменных
var pathname = '';  // Переменная для хранения текущего url
var result;         // Переменная для хранения результата вызываемых ф-й

// База данных
var bd = [
  {url: '/', content: '<h3>Главная страница</h3><a href="/post-1.html">Статья №1</a><br><a href="/post-2.html">Статья №2</a>'},
  {url: '/about', content: '<h3>О нас</h3>'},
  {url: '/contacts', content: '<h3>Наши контакты</h3>'},
  {url: '/post-1.html', content: '<h3>Статья №1</h3>'},
  {url: '/post-2.html', content: '<h3>Статья №2</h3>'}
];


// Обработчик запросов
app.use(function(req, res) {
  // Определяем текущий url
  pathname = url.parse(req.url).pathname;

  // Проверяем url
  result = find(bd , pathname);
  if(result != -1) {
    res.send(bd[result].content);                     // Если страница найдена, то отправить её на клиент
  } else {
    res.status(404).send('Страница не найдена...');   // Иначе, отправить ошибку 404
  }
});

app.listen(3000);   // Установка порта


// Функция поиска в массиве
function find(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].url == value) return i;
  }
  return -1;
}
