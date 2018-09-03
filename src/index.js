require('./mystyles.scss');
var $ = require('jquery');

$('.burger').click(function() {
  $('.burger').toggleClass('is-active');
  $('#'+this.dataset.target).toggleClass('is-active');
});
