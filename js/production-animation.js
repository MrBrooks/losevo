$(document).ready(function(){

    $('#lsv-slides-scroll-overflow-off').fullpage({
      'css3': true,
      'easing': 'easeOutElastic',
      'fitToSection': false,
      'fixedElements': '.lsv-nav , .lsv-menu',
      'scrollOverflow': false,
      onLeave: function(index, nextIndex, dir){
        if(index === 1){
          $("#lsv-dairy-products__menu").addClass("active");
          setTimeout(function(){
            $("#lsv-dairy-products__menu").removeClass("active")
          },1000);
        }
      },
      afterRender: function(){
        $("#lsv-production-product-icon-slider").owlCarousel({
          items: 3,
          itemsCustom : [
            [0, 2],
            [450, 3]
          ],
          navigation : true,
          pagination : false,
          navigationText: false,
          rewindNav: false,
          mouseDrag: false,
          touchDrag: true
        });
      }
    });
    ///added new func
    var animation_data;
    var old_b;
    var current_anim = 0, current_prod = 0;

    var canvas = Snap("#animation-canvas");
    var paper = canvas.g(), box;
    var temp;
    var appearTime = 200, disappearTime = 200;
    var appearMatrix = new Snap.Matrix(),
      zeroscaleMatrix = new Snap.Matrix();
    canvas.append(paper);

    var dairy_products_data = $.getJSON($("div[data-json]").attr("data-json"), function(json){
        for( var i = 1; i < json.length;i++){
          $("#lsv-dairy-products__list").append("<li class='lsv-dairy-products__list-item' data-item-order="+i+">" + json[i].title + "</li>");
        }
        $(".lsv-dairy-products__list-item").click(function(){
          animation_data = json[$(this).attr("data-item-order")];
          $("#lsv-dairy-products__menu, #lsv-dairy-products__menu-close-btn").removeClass("active");
          $("#lsv-dairy-products__next-animation>label").html("Посмотреть <br> производство");
          $("#lsv-dairy-products__next-animation").removeClass("active");
          $(".slimScrollBar").css("opacity", "0");
          hideAll();
          $.fn.fullpage.setAllowScrolling(true);
          initProduct();
        });
        animation_data = json[0];
        initProduct();
    });

    function stepAnimation(){
      var element = paper.select("svg");
      box = element.getBBox();
      switch (current_anim % animation_data.steps.length){
        case 1:
          var car = element.select("#car");
          if (car){
            var carMatrix = new Snap.Matrix();
            carMatrix.translate(10,0);
            car.animate({transform: carMatrix}, 2000, mina.linear, function(){
              setTimeout(function(){
                car.animate({transform: carMatrix.translate(box.w+100,0)}, 1500, mina.linear);
                // car.transform(carMatrix.translate(-box.w-100,0));
              },2000);
            });
          }
          break;
        default: console.log("defualt case in step animation");
      }
    }
    function beforeAnimation(data){
      paper.remove();
      paper = canvas.g();
      paper.append(data);
      var element = paper.select("svg");
      box = canvas.getBBox();
      // console.log("box");
      appearMatrix = new Snap.Matrix();
      zeroscaleMatrix.scale(0,0,box.cx,box.cy);
      appearMatrix.scale(1,1,box.cx,box.cy);
      paper.transform(zeroscaleMatrix);
      //do some manipulation before playing step animation
      switch (current_anim % animation_data.steps.length){
        case 1:
          var car = element.select("#car");
          if(car){
            var carMatrix = new Snap.Matrix();
            carMatrix.translate(-box.w,0);
            car.transform(carMatrix);
          }
          break;
        case 2:
          break;
        default: console.log("defualt case before playing animation "+ (current_anim % animation_data.steps.length));
      }
      onLoadSVG();
    }

    function onLoadSVG(data){
      paper.animate({transform: zeroscaleMatrix}, disappearTime, mina.easeout, function(){
          // paper.remove();
          // paper = canvas.g();
          // paper.append(data);
          // box = canvas.getBBox();
          // appearMatrix = new Snap.Matrix();
          // zeroscaleMatrix.scale(0,0,box.cx,box.cy);
          // appearMatrix.scale(0.8,0.8,box.cx,box.cy);
          // paper.transform(zeroscaleMatrix);
          paper.animate({transform: appearMatrix}, appearTime, mina.backout,stepAnimation);
      });
    }
    function startNextAnim(){
       paper.stop();
      $("#lsv-dairy-products__tooltip-info").removeClass("active");
      $("#lsv-dairy-products__tooltip-good").removeClass("active");

      paper.animate({transform: zeroscaleMatrix}, disappearTime, mina.easeout, function(){
          // paper.remove();
          // paper = canvas.g();
          var my_atr = document.getElementById('#lsv-dairy-products__prev-animation>img');
          if (current_anim < animation_data.steps.length){
            Snap.load(animation_data.steps[current_anim].img, beforeAnimation);
            base_width = $("#lsv-dairy-products__next-animation>label").width();
            console.log("base_width" + base_width);
            //$("#lsv-dairy-products__prev-animation").css('width',(base_width / 2));
            $("#lsv-dairy-products__next-animation").addClass("active");
            $("#lsv-dairy-products__next-animation").addClass("lsv-dairy-products_prev-animation__button-position");
            //console.log(current_anim);
            $("#lsv-production__description-header").text(animation_data.steps[current_anim].header);
            $("#lsv-production__description").text(animation_data.steps[current_anim].description);
            if( current_anim == (animation_data.steps.length-1)){
              $("#lsv-dairy-products__next-animation>label").html("В начало");
            }
            else{
              $("#lsv-dairy-products__next-animation>label").html("");
              $("#lsv-dairy-products__next-animation>label").append((current_anim + 1) + " / " + animation_data.steps.length);
              /*added*/
            }
            if(current_anim == 0){
              $("#lsv-dairy-products__next-animation").prepend("<img class='prev' src='img/svg/dairy-products-show-production.svg' />");
            }
            $("#lsv-dairy-products__prev-animation").addClass("lsv-dairy-products_prev-animation__button-position");
            $(".prev").click(startPrevAnim);
            old_b = current_anim;
            console.log("b = " + old_b);
            current_anim++;
            console.log("new " + current_anim);
          }

          else{
            BasicLoad();
            console.log(current_anim);
            current_anim = 0;
          }
      });
    }
    function BasicLoad(){
      Snap.load(animation_data.products[current_prod].startImg, beforeAnimation);
            $("#lsv-production__description-header").text("");
            $("#lsv-production__description").text("");
            $("#lsv-dairy-products__next-animation>label").html("Посмотреть <br> производство");
            $("#lsv-dairy-products__next-animation").removeClass("active");
            $(".prev").remove();
    }
    /*added*/
    function startPrevAnim(){
      paper.stop();
      $("#lsv-dairy-products__tooltip-info").removeClass("active");
      $("#lsv-dairy-products__tooltip-good").removeClass("active");

          // paper.remove();
          // paper = canvas.g();
        paper.animate({transform: zeroscaleMatrix}, disappearTime, mina.easeout, function(){
          if(old_b <= 0) {
            BasicLoad();
            console.log(current_anim);
            current_anim = 0;
          }
          else{
            old_b--;
            current_anim--;
            //console.log(current_anim + " prev_step_b = " + old_b);
            Snap.load(animation_data.steps[old_b].img, beforeAnimation);
            $("#lsv-production__description-header").text(animation_data.steps[old_b].header);
            $("#lsv-production__description").text(animation_data.steps[old_b].description);
            $("#lsv-dairy-products__next-animation>label").html("");
            $("#lsv-dairy-products__next-animation>label").append((current_anim) + " / " + animation_data.steps.length);

          }
        });
    }
    var emptySvgElement = '<div class="item"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 86 86" style="enable-background:new 0 0 86 86;" xml:space="preserve"></svg></div> ';
    
    var owl = $(".owl-carousel").data('owlCarousel');
    var slidesNumber = 0;
    var productCaseSlider;
    var updateProductCase = function(index){
      $("#lsv-dairy-products__tooltip-good>p").html(animation_data.products[index].goodies);
      $("#lsv-dairy-products__tooltip-info>p").html(animation_data.products[index].info);
      $("#lsv-dairy-products__product-title>h2").text(animation_data.products[index].title);
    };
    function initProduct(){
      current_anim = 0;
      current_prod = 0;
      if(owl){
        for (var i = 0 ; i < slidesNumber; i++){
          owl.removeItem(1);
        }
      }

      else{
        owl = $(".owl-carousel").data('owlCarousel');
      }
      if (animation_data.steps.length == 0 || window.innerWidth < 480){
        $("#lsv-dairy-products__next-animation").hide();

        if(animation_data.products.length > 1){
          $(".animation-container").hide();
          if (productCaseSlider){
            productCaseSlider.show();
          }
          else{
            productCaseSlider = $("#lsv-production__product-case-slider");
          }
          
          for (var i = 0; i < animation_data.products.length; i++){
            productCaseSlider.append("<div><img src='"+animation_data.products[i].startImg+"'></div>");
          }
          productCaseSlider.owlCarousel({
            navigation : true,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            afterAction: function(){
              updateProductCase(this.owl.currentItem);
            }
          });
        }
        else{
          if(productCaseSlider){
            productCaseSlider.hide();
          }
          $(".animation-container").show();
        }
      }
      else{
        $("#lsv-dairy-products__next-animation").show();
      }
      slidesNumber = animation_data.products.length;
      if(slidesNumber > 1 && window.innerWidth > 480){
        $("#rotate-block").show();
        for (var i = 0; i < slidesNumber; i++){
          owl.addItem('<div class="item"><img src="'+ animation_data.products[i].icon +'"></div>', i+1);
        }
        var lengthElementSlideBar = $("#lsv-production-product-icon-slider .owl-item").length - 1;

        var countBut = 2;

        $("#lsv-production-product-icon-slider .owl-item:nth-child(2)").addClass("scaleCircle");

        $("#lsv-production-product-icon-slider .owl-next").on("click touchend",function () {
          current_prod++;
          $("#lsv-dairy-products__next-animation>label").html("Посмотреть <br> производство");
          $("#lsv-dairy-products__next-animation").removeClass("active");
          hideAll();
          if (countBut == lengthElementSlideBar) {
            countBut = lengthElementSlideBar;
          } else {
            countBut++;
            //console.log(countBut);
            $("#lsv-production-product-icon-slider .owl-item:nth-child("+(countBut - 1)+")").removeClass("scaleCircle");
            $("#lsv-production-product-icon-slider .owl-item:nth-child("+countBut+")").addClass("scaleCircle");
            Snap.load(animation_data.products[countBut-2].startImg, beforeAnimation);
            updateProductCase(countBut-2);
            // $("#lsv-dairy-products__tooltip-good>p").html(animation_data.products[countBut-2].goodies);
            // $("#lsv-dairy-products__tooltip-info>p").html(animation_data.products[countBut-2].info);
            // $("#lsv-dairy-products__product-title>h2").text(animation_data.products[countBut-2].title);
            current_anim = 0;
          }
        });
        $("#lsv-production-product-icon-slider .owl-prev").on("click touchend",function () {
          current_prod--;
          $("#lsv-dairy-products__next-animation>label").html("Посмотреть <br> производство");
          $("#lsv-dairy-products__next-animation").removeClass("active");
          hideAll();
          if (countBut == 2) {
            countBut = 2;
          } else {
            countBut--;
            //console.log(countBut);
            $("#lsv-production-product-icon-slider .owl-item:nth-child("+(countBut + 1)+")").removeClass("scaleCircle");
            $("#lsv-production-product-icon-slider .owl-item:nth-child("+countBut+")").addClass("scaleCircle");
            Snap.load(animation_data.products[countBut-2].startImg, beforeAnimation);
            updateProductCase(countBut-2);
            // $("#lsv-dairy-products__tooltip-good>p").html(animation_data.products[countBut-2].goodies);
            // $("#lsv-dairy-products__tooltip-info>p").html(animation_data.products[countBut-2].info);
            // $("#lsv-dairy-products__product-title>h2").text(animation_data.products[countBut-2].title);
            current_anim = 0;
          }
        });
      }
      else{
        $("#rotate-block").hide();
        slidesNumber = 0;
      }
      Snap.load(animation_data.products[0].startImg, beforeAnimation);
      if (animation_data.products.length > 1){
        $("#lsv-dairy-products__product-title>h2").text(animation_data.products[0].title);
      }
      else{
        $("#lsv-dairy-products__product-title>h2").text(animation_data.title);
      }
      $("#lsv-dairy-products__tooltip-good>p").html(animation_data.products[0].goodies);
      $("#lsv-dairy-products__tooltip-info>p").html(animation_data.products[0].info);
      // $("#lsv-production__description-header").text(animation_data.steps[current_anim].header);
      // $("#lsv-production__description").text(animation_data.steps[current_anim].description);
      $("#lsv-dairy-products__tooltip-info").removeClass("active");
      $("#lsv-dairy-products__tooltip-good").removeClass("active");
    }

    function hideAll(){
      $("#lsv-dairy-products__tooltip-info").removeClass("active");
      $("#lsv-dairy-products__tooltip-good").removeClass("active");
      $("#lsv-production__description-header").text("");
      $("#lsv-production__description").text("");
    }
    
    $(".next").click(startNextAnim);
    $("#lsv-dairy-products__next-animation>label").click(startNextAnim);

    if(window.innerWidth <= 480){
      $.fn.fullpage.destroy();
      $("#lsv-dairy-products__next-animation").hide();
      $(".section:first-child").hide();

      $("#lsv-dairy-products__menu-btn").append("<span class='bar'></span><span class='bar'></span><span class='bar'></span>");
      
    }
});
