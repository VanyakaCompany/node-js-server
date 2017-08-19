// Библиотеки
var get_functions = require("./get_functions");


// Подключаемые модули
var express = require('express');
var url = require("url");
var hbs = require("hbs");


var app = express();  // Привязываем express к нашему "приложению"
app.use(express.static(__dirname + '/public')); // Теперь мы сможет обращаться из браузера к любым файлам в этой папке


// Для шаблонов страниц
hbs.registerPartials(__dirname + "/views/templates", function() {
  app.set("view engine", "hbs");


  // Блок переменных
  var pathname = '';  // Переменная для хранения текущего url

  // БД доступных страниц
  var bd_url = [
    {url: '/', file: 'index.hbs', type: 'main'},
    {url: '/about', file: 'about.hbs', type: 'information'},
    {url: '/contacts', file: 'contacts.hbs', type: 'information'},
    {url: '/post-1.html', file: 'post.hbs', type: 'post'},
    {url: '/post-2.html', file: 'post.hbs', type: 'post'},
    {url: '/post-3.html', file: 'post.hbs', type: 'post'},
    {url: '/post-4.html', file: 'post.hbs', type: 'post'},
    {url: '/post-5.html', file: 'post.hbs', type: 'post'}
  ];

  // БД статей
  var bd_posts = [
    {url: '/post-1.html', title: 'Статья №1', category: 'Новая рубрика', author: 'Admin', date: '07.08.2017', description: 'Описание 1', text: 'текст статьи'},
    {url: '/post-2.html', title: 'Статья №2', category: 'Новая рубрика 2', author: 'Admin', date: '08.08.2017', description: 'Описание 2', text: 'текст статьи'},
    {url: '/post-3.html', title: 'Статья №3', category: 'Новая рубрика 2', author: 'Admin', date: '08.08.2017', description: 'Описание 3', text: 'текст статьи'},
    {url: '/post-4.html', title: 'Статья №4', category: 'Новая рубрика 2', author: 'Admin', date: '08.08.2017', description: 'Описание 4', text: 'текст статьи'},
    {url: '/post-5.html', title: 'Статья №5', category: 'Новая рубрика 2', author: 'Ванька', date: '08.08.2017', description: 'Ничего нового', text: '<b>Обычный</b> текст'}
  ];

  // БД комментариев
  var bd_comments = [
    {url: '/post-1.html', author: 'Иван', date: '03.08.2017', text: 'КеК ЛоЛ АрбидоЛ'},
    {url: '/post-1.html', author: 'Ванька', date: '04.08.2017', text: 'Очень полезная статья!'},
    {url: '/post-2.html', author: 'Вано', date: '07.08.2017', text: 'Вот это прикол!'}
  ];


  // Обработчик запросов
  app.use(function(req, res) {
    // Определяем текущий url
    pathname = url.parse(req.url).pathname;

    // Вызываем ф-ю формирования и отправки страницы
    get_functions.page_send(req, res, pathname, bd_url, bd_posts, bd_comments);
  });


  app.listen(3000);   // Установка порта
});
