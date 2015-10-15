    var animation_data; 
    var current_anim = 0;

    var canvas = Snap("#animation-canvas");
    var paper = canvas.g(), box;
    var temp;
    var appearTime = 1500, disappearTime = 200;
    var appearMatrix = new Snap.Matrix(),
      zeroscaleMatrix = new Snap.Matrix();
    canvas.append(paper);

    var dairy_products_data = $.getJSON($("div[data-json]").attr("data-json"), function(json){
        for( var i = 0; i < json.length;i++){
          $("#lsv-dairy-products__list").append("<li class='lsv-dairy-products__list-item' data-item-order="+i+">" + json[i].title + "</li>");
        }
        $(".lsv-dairy-products__list-item").click(function(){
          animation_data = json[$(this).attr("data-item-order")];
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
          var carMatrix = new Snap.Matrix();
          carMatrix.translate(box.w+100,0);
          car.animate({transform: carMatrix}, appearTime, mina.linear, function(){
            car.transform(carMatrix.translate(-box.w-100,0));
          });
          break;
        default: console.log("defualt case in step animation");
      }
    }

    function onLoadSVG(data){
      paper.animate({transform: zeroscaleMatrix}, disappearTime, mina.easeout, function(){
          paper.remove();
          paper = canvas.g();
          paper.append(data);
          box = canvas.getBBox();
          appearMatrix = new Snap.Matrix();
          zeroscaleMatrix.scale(0,0,box.cx,box.cy);
          appearMatrix.scale(0.8,0.8,box.cx,box.cy);
          paper.transform(zeroscaleMatrix);
          paper.animate({transform: appearMatrix}, appearTime, mina.elastic,stepAnimation);
      });
    }
    function startNextAnim(){
      $("#lsv-dairy-products__tooltip-info").removeClass("active");
      $("#lsv-dairy-products__tooltip-good").removeClass("active");

      paper.animate({transform: zeroscaleMatrix}, disappearTime, mina.easeout, function(){
          paper.remove();
          paper = canvas.g();
          Snap.load(animation_data.steps[++current_anim % animation_data.steps.length].img, onLoadSVG);
          $("#lsv-production__description-header").text(animation_data.steps[current_anim % animation_data.steps.length].header);
          $("#lsv-production__description").text(animation_data.steps[current_anim % animation_data.steps.length].description);
          if( (current_anim % animation_data.steps.length != 0 ) && (current_anim % animation_data.steps.length != (animation_data.steps.length-1))){
            $("#lsv-dairy-products__next-animation>label").html("Следующий <br> шаг");
          }
          else{
            (current_anim % animation_data.steps.length == 0 )? $("#lsv-dairy-products__next-animation>label").html("Посмотреть <br> производство") : $("#lsv-dairy-products__next-animation>label").html("Вернулься <br> в начало");
          }
      });
    }
    function initProduct(){
      current_anim = 0;
      Snap.load(animation_data.steps[current_anim].img, onLoadSVG);
      $("#lsv-dairy-products__product-title>h2").text(animation_data.title);
      $("#lsv-dairy-products__tooltip-good>p").html(animation_data.goodies);
      $("#lsv-dairy-products__tooltip-info>p").html(animation_data.info);
      $("#lsv-production__description-header").text(animation_data.steps[current_anim].header);
      $("#lsv-production__description").text(animation_data.steps[current_anim].description);
      $("#lsv-dairy-products__tooltip-info").removeClass("active");
      $("#lsv-dairy-products__tooltip-good").removeClass("active");
    }
    
    $("#lsv-dairy-products__next-animation").click(startNextAnim);