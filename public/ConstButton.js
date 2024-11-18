(function () {
  // Добавляем обработчик события "DOMContentLoaded", чтобы код выполнился после полной загрузки DOM-дерева.
  document.addEventListener('DOMContentLoaded', () => {
    // Выводим в консоль текущий URL страницы.
    console.log(window.location.href);

    // Получаем все элементы ссылок в меню.
    const links = document.querySelectorAll('.menu ul li a');

    // Проходим по всем ссылкам.
    for (let link of links) {
      if (link.href === window.location.href) {
        // Если адрес ссылки совпадает с текущим URL страницы, добавляем класс "active".
        link.classList.add('active');
      }
    }
  });
})();
