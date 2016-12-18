function collapseNavbar() {
   if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
   } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
   }
}

$(window).scroll(collapseNavbar);

$(document).ready(collapseNavbar);

// jQuery for page scrolling feature
$(function () {
   $('a.page-scroll').bind('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
         scrollTop: $($anchor.attr('href')).offset().top
      }, 1000, 'easeInOutExpo');
      event.preventDefault();
   });
});

// closes the responsive menu on click
$('.navbar-collapse ul li a').click(function () {
   $(this).closest('.collapse').collapse('toggle');
});