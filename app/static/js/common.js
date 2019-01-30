jQuery(document).ready(function($) {

  AOS.init({
    duration: 1000,
    once: true
  });

  // Fixed header
  function fixedHeader() {
    if($(this).scrollTop() > 10) {
      $('.header').addClass('fixed');
    }
    else {
      $('.header').removeClass('fixed');
    }
  }

  fixedHeader();

  $(window).scroll(function() {
    fixedHeader();
  });

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('open');
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    onclose: function() {
      $(this).find('label.error').remove();
      currentTab = 0;
    }
  });

  // Steps
  var currentTab = 0; // Current tab is set to be the first tab (0)
  var listId;
  showTab(currentTab); // Display the current tab

  $('.modal-product__back').click(function(e) {
    e.preventDefault();

    if ((currentTab - 1) < 0) {
      return false;
    }

    if ((currentTab - 1)  == 1) {
      var x = $('.modal-product__steps');
      $(x[currentTab-1]).find('#'+listId.attr('id')).css('display', 'flex');
    }

    nextPrev(-1);
  }); 

  $('.hero__content .btn').click(function(e) {
    var x = $('.modal-product__steps');
    x.css('display', 'none');
    currentTab = 0;
    showTab(currentTab);
  });

  $('.modal-product__item .btn').click( function(e) {
    e.preventDefault();
    var id = $(this).data('id');

    if ( (currentTab + 1) >  $('.modal-product__steps').length - 1  ) {
      return false;
    }

    $('.modal-product__back').text('Back to the previous');
    nextPrev(1, id);
  } );

  $('.product-list__item .btn').click(function(e) {
    e.preventDefault();
    var id = $(this).data('id');

    $('#modal-product').popup('show');

    var x = $('.modal-product__steps');
    x.css('display', 'none');
    $(x[1]).find('.modal-product__list').css('display', 'none');
    currentTab += 1;
    showTab(1, id);
  });

  function showTab(n, id) {
    // This function will display the specified tab of the form ...
    var x = $('.modal-product__steps');

    var countStep = x.length;
    var currentStep = n + 1;

    $('.modal-product__current').text(currentStep);
    $('.modal-product__all').text(countStep);

    $(x[n]).css('display', 'block');
    if (n == 0) {
      $('.modal-product__label').text('Select flavor');
      $(x[n+1]).find('.modal-product__list').css('display', 'none');
      $('.modal-product__back').text('Back to home');
    }
    if (n == 1) {
      $('.modal-product__label').text('Select dosage');
      $('.modal-product__back').text('Back to the previous');
      listId = $(x[n]).find('#'+id).css('display', 'flex');
    }
    if (n == 2) {
      $('.modal-product__label').text('Confirm your choice');
      $(x[n]).find('.modal-product__content-wrap').css('display', 'none');
      $(x[n]).find('#'+id).css('display', 'flex');
    }
    // if (n == (x.length - 1)) {
    //   $('.constructor__btn-next span').text('Отправить');
    // } else {
    //   $('.constructor__btn-next span').text('Далле');
    // }
  }

  function nextPrev(n, id) {

    // This function will figure out which tab to display
    var x = $('.modal-product__steps');

    // Hide the current tab:
    $(x[currentTab]).css('display', 'none');
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab, id);
  }

  // SVG
  svg4everybody({});

  // Scroll smooth
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();

        if ($(window).width() > 1599) {
          $headerHeight = 82;
        }
        else if ($(window).width() < 1600) {
          $headerHeight = 70;
        }
        else if ($(window).width() > 768) {
          $headerHeight = 61;
        }
        else {
          $headerHeight = 51;
        }
        
        $('.nav-toggle').removeClass('active');
        $('.mobile-menu').removeClass('open');

        $('html, body').animate({
          scrollTop: target.offset().top - $headerHeight
        }, 1000);
      }
    }
  });

  // Parallax
  if ($(window).width() > 768) {
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene, {
      relativeInput: false
    });
  }

});