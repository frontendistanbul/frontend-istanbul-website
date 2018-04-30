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
