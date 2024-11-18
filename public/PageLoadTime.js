// IIFE (Immediately Invoked Function Expression)
(function () {
  // Функция для измерения времени загрузки страницы
  function measurePageLoadTime() {
    // Время начала загрузки страницы
    const StartTime = performance.now();
    // Событие, которое срабатывает при полной загрузке страницы
    window.addEventListener('load', () => {
      // Время окончания загрузки страницы
      const EndTime = performance.now();

      // Вычисляем время загрузки
      const LoadTime = EndTime - StartTime;

      const footer = document.getElementById('footer-id');
      // Выводим статистическую информацию в консоль (или можно вставить в подвал страницы)
      //alert(`Время загрузки страницы: ${loadTime.toFixed(1)}`);
      footer.innerHTML = `Время загрузки страницы: ${LoadTime.toFixed(1)}`;
    });
  }

  // Вызываем функцию измерения времени загрузки
  measurePageLoadTime();
})();
