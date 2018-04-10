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




// Variable to hold request
var request;

// Bind to the submit event of our form
var sEmail = $("#subscribe-form #email").val();

$("#subscribe-form #email").on("blur", function () {  
  sEmail = $("#subscribe-form #email").val();
  if (validateEmail(sEmail)) {
    $("#subscribe-form").removeClass("error");
   } else {
    $("#subscribe-form").addClass("error");   
    $("#emailHelp").html("Lütfen geçerli bir e-posta adresi yazınız.");
   }
})


$("#subscribe-form").submit(function (event) {
  // Prevent default posting of form
  event.preventDefault();
  if (validateEmail(sEmail)) {
      if (request) {
          request.abort();
      }
      var $form = $(this);
      var $inputs = $form.find("input, select, button, textarea");
      var serializedData = $form.serialize();
      $inputs.prop("disabled", true);
      request = $.ajax({
          url: "https://script.google.com/macros/s/AKfycbygwqbbiSDvikTDGlf3u8GHhPVHXuCnwhdFuL_Wrl3wBOmfjME/exec",
          type: "post",
          data: serializedData
      });
      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown) {
        $("#emailHelp").html("Lütfen geçerli bir e-posta adresi yazınız.").fadeIn();
        
       });

      // Callback handler that will be called regardless
      // if the request failed or succeeded
      request.always(function () {
          // Reenable the inputs
        $("#emailHelp").html("Tebrikler! E-posta adresinizi kaydedildi.").fadeIn();
          
      });
  } 
});


function validateEmail(sEmail) {
  var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (filter.test(sEmail)) {
      return true;      
  }
  else {
      return false;
  }
}