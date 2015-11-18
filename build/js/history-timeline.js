$(document).ready(function(){
  
  var arr_years = [], arr_years_clear = [];
  var decimal_to_percentage = function (dec){
    return (Math.round(dec*100 -2) + "%");
  };
  var temp_year = 0;
  $(".section[data-history-year]").each(function(i,el){
    temp_year = $(this).attr("data-history-year");
    if( temp_year != 0){
      arr_years.push(temp_year);
      if(!arr_years_clear.length || (temp_year != arr_years_clear[arr_years_clear.length-1])){
        arr_years_clear.push(temp_year);
      }
    }
  });
  console.log(arr_years);
  console.log(arr_years_clear);
  for(var i = 0; i < arr_years.length; i++){
    if(arr_years[i] != arr_years[i-1]){
      $("#timeline__list-years").append(
      "<a href='#year" + arr_years[i] +
      "'> <div id = 'timeline__" + arr_years[i] +
      "' class='timeline__years'>" + arr_years[i] + 
      "<span></span></div></a>"
      );
    }
  }
  var years = $('.timeline__years');
  var timeline_displace = 1/(arr_years_clear.length - 1);
  var minus_repeat_years = 0;
  var timeline_years_index = [];
  years.each(function(index, elem){
    // if (index > 0 && arr_years[index-1] == arr_years[index]){
    //   $(this).css('opacity','0');
    //   ++minus_repeat_years;
    // }
    $(this).css('top', decimal_to_percentage(timeline_displace * (index-minus_repeat_years) ));
  });
  var current_year;
  $('#lsv-slides-history').fullpage({
    'css3': true,
    'easing': 'easeOutElastic',
    'fitToSection': false,
    'fixedElements': '.lsv-nav , .lsv-menu',
    'scrollOverflow': true,
    onLeave: function(index, nextIndex, direction){
      if(nextIndex == 1 || nextIndex == arr_years.length+2 || nextIndex == arr_years.length+3){
        $('.lsv-history__timeline').css('opacity','0');
      }
      else {
        $('.lsv-history__timeline').css('opacity','1');
      }
      // if(arr_years[index-2] != arr_years[nextIndex-2]){
        $('#timeline__'+ arr_years[index-2]).removeClass('timeline--active');
        $('#timeline__'+ arr_years[nextIndex-2]).addClass('timeline--active');
      // }

    }
  });
  $.fn.fullpage.reBuild();
  if(window.innerWidth <= 480){
    $.fn.fullpage.destroy();
    $('.lsv-history__timeline').css('display','none');
  }
});