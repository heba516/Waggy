const swiper = new Swiper('.mySwiper', {
    spaceBetween: 30,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      }
    }
  });
  