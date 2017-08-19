// Функция поиска в массиве
function find(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].url == value) return i;
  }
  return -1;
}


// Открываем ф-ию для вызова из других файлов
exports.find = find;
