var screenHeight = $(window).height();

$(function() {
  $('#nav-button').click(function(e) {
    var _this = $(this);
    var body = $('body');
    _this.toggleClass('active');
    $('#overlay').toggleClass('open');
    body.toggleClass('modal-open');
  });

  $('.nav a[href*="#"]:not([href="#"])').click(function() {
    $('#overlay').toggleClass('open');
    $('.navbar-toggle').toggleClass('active');
    var body = $('body');
    body.toggleClass('modal-open');
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('.navbar-collapse').collapse('hide');

        $('html, body').animate(
          {
            scrollTop: target.offset().top - 54
          },
          1300
        );
        return false;
      }
    }
  });
});

$(window).on('scroll', function() {
  var scTop = $(window).scrollTop();

  if (scTop > screenHeight) {
    $('.navbar').addClass('with-bg');
  } else {
    $('.navbar').removeClass('with-bg');
  }
});
