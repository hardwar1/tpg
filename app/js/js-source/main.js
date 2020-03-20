$(function () {
  //весь код писать внутри что бы дом загрузился первым

  $('.header__burger').on('click', function () {
    $('.header__nav-inner').slideToggle();
    $(this).toggleClass('burger__opened');
  });

  $('.about__slider').slick({
    infinite: true,
    dots: true,
    arrows: false
  });

  // magnific-popap video youtube
  $('.popup').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 400,
    preloader: false,
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com',
          id: 'v=',
          src: 'https://www.youtube.com/embed/%id%?rel=0&autoplay=1'
        }
      }
    },
  });
  // magnific-popap video youtube

  new WOW().init();
});