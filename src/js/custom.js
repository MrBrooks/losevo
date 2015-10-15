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

  $(".full-slide").each(function(i,e){
    $(this).css("height", ($(window).height() - menu_height) + "px");
  });

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
    allowPageScroll: false,
    barHeightCustome: "100px",
    barZIndex: '2000'
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
  
  $( "#lsv-menu-btn" ).on('click', function() {
    $( "#lsv-menu" ).toggleClass("lsv-menu--active");
    $("#lsv-mobile-menu").toggleClass("active");
    $( "#lsv-menu-btn" ).toggleClass("lsv-nav__menu-btn--active");
  });

  $('main').click(function(){
    if($('.lsv-menu--active').length){
      $( "#lsv-menu" ).toggleClass("lsv-menu--active");
      $( "#lsv-mobile-menu" ).toggleClass("active");
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


  // $('#lsv-slides').fullpage({
  //   'css3': true,
  //   'easing': 'easeOutElastic',
  //   'fitToSection': false,
  //   'fixedElements': '.lsv-nav , .lsv-menu',
  //   'scrollOverflow': true
  // });
  
  $("#owl-vacancy-office-slider,#owl-vacancy-shops-slider, #owl-vacancy-ferm-slider,#owl-vacancy-production-slider").owlCarousel({
      navigation : true,
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
  });
  $("#owl-shops-slider").owlCarousel({
      navigation: true,
      pagination: false,
      slideSpeed: 300,
      singleItem:true
  });
  $("#owl-vacancy-career-slider").owlCarousel({
      navigation: true,
      pagination: true,
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
  $("#owl-shops-pic-slider").owlCarousel({
      navigation: true,
      pagination: false,
      slideSpeed: 300,
      singleItem:true
  });

  $("#goodies-btns__info").click(function(){
    $("#lsv-dairy-products__tooltip-info").toggleClass("active");
    $("#lsv-dairy-products__tooltip-good").removeClass("active");
  });
  $("#goodies-btns__good").click(function(){
    $("#lsv-dairy-products__tooltip-good").toggleClass("active");
    $("#lsv-dairy-products__tooltip-info").removeClass("active");
  });

  window.setTimeout(function (){
    $(".slimScrollBar").css({
      "background-color" : "#61bb46",
      "opacity" : "1"
    });
  },2000);

  var filter_value_month = "all",filter_value_year = "all";
  
  function lsvDataFilter(){
    $(".filtered-item").each(function(index,val){
      (($(this).attr("data-year") == filter_value_year || filter_value_year == "all") && 
       ($(this).attr("data-month") == filter_value_month || filter_value_month == "all"))?$(this).show(300):$(this).hide(300);
    });
  }
  $("#lsv-filter-select-year").on("change",function(){
    filter_value_year = $(this).val();
    lsvDataFilter(); 
  });
  $("#lsv-filter-select-month").on("change",function(){
    filter_value_month = $(this).val();
    lsvDataFilter();
  });

  $("button.submit[type='button']").on('click', function(){
    var button = $(this);
    button.text("Обработка...");
    $.getJSON('js/form_submit_request.json',function(data){
      if(data.server_answer == "true"){ 
        button.text("Успешно!");
      } else{
        button.text("Неудача!").css("background-color","#aa1100");
      }
    });

  });
});

