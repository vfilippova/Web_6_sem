// функция, которая будет выполнена при загрузке dom-дерева
function handleDOMContentLoaded() {
  // проверяем, есть ли значение 'add-name' в localStorage
  // если есть, устанавливаем значение поля ввода 'add-name' равным сохраненному значению
  if (localStorage.getItem('add-name')) {
    document.getElementById('add-name').value =
      localStorage.getItem('add-name');
  }

  // получаем элементы формы, поля ввода 'add-name' и контейнер таблицы
  const form = document.getElementById('table-form');
  const addNameInput = document.getElementById('add-name');
  const tableContainer = document.getElementById('table-container');
  const cardsArray = [];

  // функция для удаления карточки из контейнера таблицы
  function removeCard(card) {
    // удаляем данные о карточке из localStorage
    localStorage.removeItem(card.id);
    // удаляем карточку из контейнера таблицы
    tableContainer.removeChild(card);
    const index = cardsArray.indexOf(card);
    if (index !== -1) {
      cardsArray.splice(index, 1);
    }
  }

  // добавляем слушатель события 'submit' к форме
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // получаем значение поля ввода 'add-name'
    const addName = addNameInput.value;
    // проверяем на пустое значение или пробелы
    if (addName.trim() === '') {
      return alert('введите текст');
    }
    // создаем новый элемент 'div' для карточки и добавляем ему класс 'card'
    const card = document.createElement('div');
    card.classList.add('card');
    // генерируем уникальный идентификатор для карточки
    const cardId = 'card-' + Date.now();
    card.id = cardId;
    // создаем новый элемент 'span' для текста карточки и задаем ему значение из поля ввода
    const text = document.createElement('span');
    text.textContent = addName;
    // создаем кнопку для удаления карточки
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', function () {
      removeCard(card);
    });
    // добавляем элемент с текстом и кнопкой удаления внутрь карточки
    card.appendChild(text);
    card.appendChild(closeButton);
    // сохраняем карточку в localStorage с ключом, равным идентификатору
    localStorage.setItem(cardId, addName);
    // добавляем карточку в контейнер таблицы
    tableContainer.appendChild(card);
    // сохраняем значение поля ввода в localStorage с ключом 'add-name'
    localStorage.setItem('add-name', addName);
    // обнуляем поисковую строку
    addNameInput.value = '';
    cardsArray.push(card);
  });

  // восстанавливаем сохраненные карточки при загрузке страницы
  // цикл for...of перебирает элементы в локальном хранилище по ключам
  for (let key of Object.keys(localStorage)) {
    // функция startsWith('card-') проверяет, начинается ли ключ со строки 'card-'.
    if (key.startsWith('card-')) {
      const cardId = key;
      // метод localStorage.getItem(key) извлекает значение, связанное с ключом.
      const addName = localStorage.getItem(key);
      const card = document.createElement('div');
      card.classList.add('card');
      card.id = cardId;
      const text = document.createElement('span');
      text.textContent = addName;
      // создаем кнопку для удаления карточки
      const closeButton = document.createElement('button');
      closeButton.textContent = 'X';
      closeButton.addEventListener('click', function () {
        removeCard(card);
      });
      card.appendChild(text);
      card.appendChild(closeButton);
      tableContainer.appendChild(card);
      cardsArray.push(card);
    }
    addNameInput.value = '';
  }
}

// добавляем слушатель события "DOMContentLoaded" к объекту window и задаем ему функцию handleDOMContentLoaded
window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
