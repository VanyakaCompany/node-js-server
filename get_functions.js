// Библиотеки
var other_functions = require("./other_functions");


// Функция формирования и отправки страницы
function page_send(req, res, pathname, bd_url, bd_posts, bd_comments) {

  // Определяем индекс запрашиваемой страницы в БД доступных страниц
  var page_index = other_functions.find(bd_url, pathname);

  if(page_index === -1) {                                       // Если страницы в БД нет, то отправить ошибку 404
    res.status(404).render('404.hbs');
  } else {
    if(bd_url[page_index].type === 'information') {             // Если запрашиваемая страница - информационная, то отправить нужный файл
      res.render(bd_url[page_index].file);
    } else {
      if(bd_url[page_index].type === 'main') {                  // Если запрашиваемая страница - главная, то:

        // Создать массив для хранения информации о статьях
        var posts = [];

        // Заполнить массив
        for(var i = 0; i < bd_posts.length; i++) {
          posts.push({
            url: bd_posts[i].url,
            title: bd_posts[i].title,
            category: bd_posts[i].category,
            author: bd_posts[i].author,
            date: bd_posts[i].date,
            description: bd_posts[i].description
          });
        }

        // Вернуть файл и необходимые данные
        res.render(bd_url[page_index].file, {
          posts: posts
        });
      } else {
        if(bd_url[page_index].type === 'post') {                // Если запрашиваемая страница - статья, то:

          // Создать массив для хранения комментариев
          var cooments = [];

          // Заполнить его комментариями для данной статьи
          for(var i = 0; i < bd_comments.length; i++) {
            if(bd_comments[i].url == pathname) {
              cooments.push({
                url: bd_comments[i].url,
                author: bd_comments[i].author,
                date: bd_comments[i].date,
                text: bd_comments[i].text
              });
            }
          }

          // Определить индекс статьи в БД статей
          var post_index = other_functions.find(bd_posts, pathname);

          // Вернуть файл и все необходимые данные
          res.render(bd_url[page_index].file, {
            title: bd_posts[post_index].title,
            category: bd_posts[post_index].category,
            author: bd_posts[post_index].author,
            date: bd_posts[post_index].date,
            text: bd_posts[post_index].text,
            cooments: cooments
          });
        }
      }
    }
  }
}


// Открываем ф-ию для вызова из других файлов
exports.page_send = page_send;
