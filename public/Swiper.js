var Swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 100,
  centeredSlides: true,

  mousewheel: {
    invert: true,
  },

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
