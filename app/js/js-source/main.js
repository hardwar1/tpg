$(function () {

  $('.burger').on('click', function () {
    $('.header__menu').slideToggle();
    $(this).toggleClass('burger__opened');
  });

  $('.about__slider').slick({
    infinite: true,
    dots: true,
    arrows: false
  });


  new WOW().init();
});