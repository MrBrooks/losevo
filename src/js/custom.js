/**************************************/
/* Custom JavaScript files supervisor */
/**************************************/

$(document).ready(function() {

    /* Custom */

//  $( "#lsv-menu-btn" ).click(function() {
//   $( "#lsv-menu" ).slideToggle("1000");
// });
 $( "#lsv-menu-btn" ).click(function() {
  $( "#lsv-menu" ).toggleClass("lsv-menu--active");
});
 $( "#lsv-menu-btn" ).click(function() {
  $( "#lsv-menu-btn" ).toggleClass("lsv-nav__menu-btn--active");
});

  $('#lsv-slides').fullpage({
    'css3': true,
    'easing': 'easeOutElastic',
    'fitToSection': false,
    'fixedElements': '.lsv-nav , .lsv-menu',
    'scrollOverflow': true
  });

});
