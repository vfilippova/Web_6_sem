// Функция для скрытия
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
}

// Функция для выполнения запроса с помощью Fetch API и возврата Promise
function fetchWithPromise(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('ошибка HTTP: ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Функция для обработки данных и отображения их на странице
function renderData(data) {
  const comments = document.getElementById('comments');

  // Создаем таблицу
  const table = document.createElement('table');

  // Создаем заголовок таблицы
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['имя', 'email']; // Замените заголовки на свои
  headers.forEach((headerText) => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  data.slice(0, 5).forEach((item) => {
    // изменяем метод forEach на slice и добавляем параметры начала и конца диапазона
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    cell1.textContent = item.name; // заменяем textcontent на textContent
    const cell2 = document.createElement('td');
    cell2.textContent = item.body; // заменяем textcontent на textContent
    row.appendChild(cell1);
    row.appendChild(cell2);
    tbody.appendChild(row);
  });
  table.appendChild(tbody); // заменяем appendchild на appendChild
  // Очищаем контент и добавляем таблицу
  comments.innerHTML = '';
  comments.appendChild(table);
}

async function randomData() {
  try {
    const randomId = Math.floor(Math.random() * 101) + 100; // Генерация случайного ID
    const url =
      'https://jsonplaceholder.typicode.com/comments?id_gte=${randomId}';
    const options = { method: 'GET' };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Произошла ошибка. Попробуйте позже');
    }

    const data = await response.json();
    renderData(data);
    hidePreloader();
  } catch (error) {
    console.error(error);
    const content = document.getElementById('comments');
    content.textContent = 'Произошла ошибка. Попробуйте позже';
    hidePreloader();
  }
}

// Ожидание события загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  // Выполнение запроса при загрузке страницы
  const url = 'https://jsonplaceholder.typicode.com/comments';
  const options = { method: 'GET' };

  fetchWithPromise(url, options)
    .then((data) => {
      renderData(data);
      hidePreloader();
    })
    .catch((error) => {
      console.error(error);
      const content = document.getElementById('comments');
      content.textContent = 'Произошла ошибка. Попробуйте позже';
      hidePreloader();
    });

  // Находим кнопку по ее ID
  const randomDataButton = document.getElementById('randomDataButton');

  // Добавляем обработчик события клика на кнопку
  randomDataButton.addEventListener('click', () => {
    randomData(); // Выполнение запроса при клике на кнопку
  });
});
