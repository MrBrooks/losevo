/**************************************/
/* Custom JavaScript files supervisor */
/**************************************/
$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('#spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});

$(document).ready(function() {

    /* Custom */

//  $( "#lsv-menu-btn" ).click(function() {
//   $( "#lsv-menu" ).slideToggle("1000");
// });
  $( "#lsv-menu-btn" ).on('click', function() {
    $( "#lsv-menu" ).toggleClass("lsv-menu--active");
    $( "#lsv-menu-btn" ).toggleClass("lsv-nav__menu-btn--active");
  });
  $('main').click(function(){
    if($('.lsv-menu--active').length){
      $( "#lsv-menu" ).toggleClass("lsv-menu--active");
      $( "#lsv-menu-btn" ).toggleClass("lsv-nav__menu-btn--active");
    }
  });
  // $( ".lsv-menu--active" ).blur(function() {
  //   $( "#lsv-menu" ).toggleClass("lsv-menu--active");
  //   $( "#lsv-menu-btn" ).toggleClass("lsv-nav__menu-btn--active");
  // });

  $('#lsv-slides').fullpage({
    'css3': true,
    'easing': 'easeOutElastic',
    'fitToSection': false,
    'fixedElements': '.lsv-nav , .lsv-menu',
    'scrollOverflow': true
  });
  $("#owl-vacancy-office-slider,#owl-vacancy-shops-slider, #owl-vacancy-ferm-slider,#owl-vacancy-production-slider").owlCarousel({
      navigation : true,
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
  });
  $("#owl-vacancy-career-slider").owlCarousel({
      navigation: true,
      pagination: false,
      slideSpeed: 300,
      singleItem:true
  });
  $("#owl-team-office-slider, #owl-team-ferm-slider, #owl-team-shops-slider, #owl-team-production-slider").owlCarousel({
      itemsDesktop: [1199,3],
      items: 4,
      navigation : true,
      slideSpeed : 300,
      paginationSpeed : 400,
      autoPlay: 7000
  });

});
