$(function () {
  //весь код писать внутри что бы дом загрузился первым

  $('.header__burger').on('click', function () {
    $('.header__nav-inner').slideToggle();
    $(this).toggleClass('burger__opened');
  });
  //ibg

  $('.about__slider').slick({
    infinite: true,
    dots: true,
    arrows: false
  });




});