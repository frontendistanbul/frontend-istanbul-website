var $screenHeight = $(window).height();
var $subscribeForm = $('#subscribe-form');
var $emailHelp = $('#emailHelp')
var $body = $('body');

// Variable to hold request
var request;

$(function() {
  $('#nav-button').on('click', function(e) {
    var $this = $(this);

    $this.toggleClass('active');
    $('#overlay').toggleClass('open');
    $body.toggleClass('modal-open');
  });

  $('.nav a[href*="#"]:not([href="#"])').on('click', function() {
    $('#overlay').toggleClass('open');
    $('.navbar-toggle').toggleClass('active');

    $body.toggleClass('modal-open');
    if (
      location.pathname.replace(/^\//, '') ===
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

  /* Countdown start */
  var DATETIME_CONFERENCE_START = new Date("June 30, 2018 09:00:00").getTime();

  var $countdown = $(".countdown");
  var $days = $(".countdown-days div");
  var $hours = $(".countdown-hours div");
  var $minutes = $(".countdown-minutes div");
  var $seconds = $(".countdown-seconds div");

  var countdownTimer = setInterval(function() {
    var today = new Date().getTime();
    var diff = DATETIME_CONFERENCE_START - today;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days || hours || minutes || seconds) {
      $days.html(days < 10 ? '0' + days : days);
      $hours.html(hours < 10 ? '0' + hours : hours);
      $minutes.html(minutes < 10 ? '0' + minutes : minutes);
      $seconds.html(seconds < 10 ? '0' + seconds : seconds);
      $countdown.show();
    } else {
      clearInterval(countdownTimer);

      $countdown.remove();
    }
  }, 1000);
  /* Countdown end */
});

$(window).on('scroll', function() {
  var $scTop = $(window).scrollTop();
  var $navBar = $('.navbar')

  return $scTop > $screenHeight
    ? $navBar.addClass('with-bg')
    : $navBar.removeClass('with-bg');
});

// Bind to the submit event of our form

$subscribeForm.on('submit', function (event) {
  event.preventDefault();

  var sEmail = $('#subscribe-form #email').val();

  $subscribeForm.removeClass('error');

  if (validateEmail(sEmail)) {
      if (request) {
          request.abort();
      }
      var $form = $(this);
      var $inputs = $form.find('input, select, button, textarea');
      var serializedData = $form.serialize();
      $inputs.prop('disabled', true);
      request = $.ajax({
          url: 'https://script.google.com/macros/s/AKfycbygwqbbiSDvikTDGlf3u8GHhPVHXuCnwhdFuL_Wrl3wBOmfjME/exec',
          type: 'post',
          data: serializedData
      });
      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown) {
        $emailHelp.html('Lütfen geçerli bir e-posta adresi yazınız.').fadeIn();

       });

      // Callback handler that will be called regardless
      // if the request failed or succeeded
      request.always(function () {
          // Reenable the inputs
        $emailHelp.html('E-posta adresiniz kaydedildi.').fadeIn();

        $inputs.prop('disabled', false);

        setTimeout( function() {
          $emailHelp.fadeOut();
        }, 3000);

      });
  } else {
    $subscribeForm.addClass('error');
    $emailHelp.html('Lütfen geçerli bir e-posta adresi yazınız.');
  }
});




function validateEmail(sEmail) {
  var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return filter.test(sEmail) ? true : false
}
