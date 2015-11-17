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
  // console.log($(window).height());
  var lsv_section_height = ($(window).height() - menu_height) + "px";
  console.log(lsv_section_height);

  var mobile_menu = $("#lsv-mobile-menu");
  var scroll_menu_flag = false;
  // console.log(mobile_menu.height());
  // console.log(window.innerHeight);
  if (mobile_menu.height() > window.innerHeight){
    mobile_menu.height(window.innerHeight - menu_height);
    scroll_menu_flag = true;
    $('body').wrapInner("<div class='mobile_scroll_wrap'></div>");
    $('.mobile_scroll_wrap').height(window.innerHeight);
  }

  $(".full-slide").each(function(i,e){
    $(this).css("height", ($(window).height() - menu_height) + "px");
  });
  if (window.innerWidth > 480){
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
  }
  else{
    $("#lsv-dairy-products__menu").slimScroll({
      width: '100%',
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
  }
  // $("#lsv-dairy-products__menu").hover(
  //   function(){
  //     console.log("Hey in");
  //     $.fn.fullpage.setMouseWheelScrolling(false);
  //   },
  //   function(){
  //     console.log("Hey out");
  //     $.fn.fullpage.setMouseWheelScrolling(true);
  // });
  
  $( "#lsv-menu-btn" ).on('click', function() {
    $( "#lsv-menu" ).toggleClass("lsv-menu--active");
    mobile_menu.toggleClass("active");
    $( "#lsv-menu-btn" ).toggleClass("lsv-nav__menu-btn--active");
    if(scroll_menu_flag){
      $('.mobile_scroll_wrap').toggleClass("active");
    };
  });

  $('main').click(function(){
    if($('.lsv-menu--active').length){
      $( "#lsv-menu" ).toggleClass("lsv-menu--active");
      mobile_menu.toggleClass("active");
      $( "#lsv-menu-btn" ).toggleClass("lsv-nav__menu-btn--active");
      if(scroll_menu_flag){
        $('.mobile_scroll_wrap').toggleClass("active");
      };
    }
  });


  $("#lsv-shops__filter-btn,#lsv-shop__filter-apply-btn").on('click',function(){
    $( "#lsv-shops__filter-menu" ).toggleClass("lsv-shops__filter--active");
    $("#lsv-shops__filter-btn").toggleClass("active");
  });
  $("#lsv-dairy-products__menu-btn").on('click',function(){
    $("#lsv-dairy-products__menu, #lsv-dairy-products__menu-close-btn").addClass("active");
    $(".slimScrollBar").css("opacity", "1");
    $.fn.fullpage.setAllowScrolling(false);
  });
  $("#lsv-dairy-products__menu-close-btn").on('click',function(){
    $("#lsv-dairy-products__menu, #lsv-dairy-products__menu-close-btn").removeClass("active");
    $(".slimScrollBar").css("opacity", "0");
    $.fn.fullpage.setAllowScrolling(true);
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
  
  // $("#owl-vacancy-office-slider,#owl-vacancy-shops-slider, #owl-vacancy-ferm-slider,#owl-vacancy-production-slider").owlCarousel({
  //     navigation : true,
  //     slideSpeed : 300,
  //     paginationSpeed : 400,
  //     singleItem:true
  // });
  $("#owl-shops-slider").owlCarousel({
      navigation: true,
      pagination: false,
      slideSpeed: 300,
      singleItem:true
  });
  // $("#owl-vacancy-career-slider").owlCarousel({
  //     navigation: true,
  //     pagination: true,
  //     slideSpeed: 300,
  //     singleItem:true
  // });
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

  $(".lsv-contacts__department").click(function(){
    $(this).toggleClass('active');
  });
  var lsv_tooltip_flag = false;
  $("#goodies-btns__info").click(function(){
    setTimeout(function(){
    $("#lsv-dairy-products__tooltip-info").toggleClass("active");
    $("#lsv-dairy-products__tooltip-good").removeClass("active");
    lsv_tooltip_flag = true;
    },100);
  });
  $("#goodies-btns__good").click(function(){
    setTimeout(function(){
    $("#lsv-dairy-products__tooltip-good").toggleClass("active");
    $("#lsv-dairy-products__tooltip-info").removeClass("active");
    lsv_tooltip_flag = true;
    },100);
  });
  $("main").click(function(){
      if(lsv_tooltip_flag){
        $("#lsv-dairy-products__tooltip-info").removeClass("active");
        $("#lsv-dairy-products__tooltip-good").removeClass("active");
      }
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

  $("#lsv-shop__down-btn").click(function(){
    $.fn.fullpage.moveSectionDown();
  });
  // if(window.innerWidth <= 1024){
  //   $.fn.fullpage.destroy();
  // }

  // $("button.submit[type='button']").on('click', function(){
  //   var button = $(this);
  //   button.text("Обработка...");
  //   $.getJSON('js/form_submit_request.json',function(data){
  //     if(data.server_answer == "true"){ 
  //       button.text("Успешно!");
  //     } else{
  //       button.text("Неудача!").css("background-color","#aa1100");
  //     }
  //   });

  $("form#data").submit(function(){
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: 'toserver.php',
        type: 'POST',
        data: formData,
        async: true,
        success: function (data) {
            console.log(data);
        },
        cache: false,
        contentType: false,
        processData: false
    });
    return false;
  });
  // });
});



