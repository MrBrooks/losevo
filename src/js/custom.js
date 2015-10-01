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
  // $("#lsv-dairy-products__menu").hover(
  //   function(){
  //     console.log("Hey in");

  // },
  //   function(){
  //     console.log("Hey out");
  // });
  var menu_height = parseInt($(".lsv-nav").css('height'),10);
  console.log(menu_height);
  console.log($(window).height());
  var lsv_section_height = ($(window).height() - menu_height) + "px";
  console.log(lsv_section_height);
  $("#lsv-dairy-products__menu").slimScroll({
    width: '280px',
    height: lsv_section_height,
    size: '10px',
    opacity: 1,
    position: 'right',
    color: '#61bb46',
    alwaysVisible: true,
    distance: '7px',
    railVisible: false,
    wheelStep: 30,
    allowPageScroll: false
    // disableFadeOut: false
  });
  $("#lsv-dairy-products__menu").hover(
    function(){
      console.log("Hey in");
      $.fn.fullpage.setMouseWheelScrolling(false);
    },
    function(){
      console.log("Hey out");
      $.fn.fullpage.setMouseWheelScrolling(true);
  });
  


  // $("#lsv-dairy-products__menu").slimScroll({
  //   width: '280px',
  //   height: '500px',
  //   size: '10px',
  //   opacity: 1,
  //   position: 'right',
  //   color: '#61bb46',
  //   alwaysVisible: true,
  //   distance: '7px',
  //   railVisible: false,
  //   wheelStep: 30,
  //   allowPageScroll: false
  //   // disableFadeOut: false
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


  $("#lsv-shops__filter-btn").on('click',function(){
    $( "#lsv-shops__filter-menu" ).toggleClass("lsv-shops__filter--active");
    $(this).toggleClass("active");
  });
  $("#lsv-dairy-products__menu-btn").on('click',function(){
    $("#lsv-dairy-products__menu, #lsv-dairy-products__menu-close-btn").addClass("active");
  });
  $("#lsv-dairy-products__menu-close-btn").on('click',function(){
    $("#lsv-dairy-products__menu, #lsv-dairy-products__menu-close-btn").removeClass("active");
  });
  // 
  // $("#lsv-shops__filter-btn").on('hover',function(){
  //   $( "#lsv-shops__filter-menu" ).toggleClass("lsv-shops__filter--active");
  // });
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
     // 'paddingTop': '62px'
  });
  $('#lsv-slides-scroll-overflow-off').fullpage({
      'css3': true,
      'easing': 'easeOutElastic',
      'fitToSection': false,
      'fixedElements': '.lsv-nav , .lsv-menu',
      'scrollOverflow': false
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
