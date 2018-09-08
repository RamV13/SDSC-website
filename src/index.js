require('./mystyles.scss');
var $ = require('jquery');

// Navbar Management

$('.burger').click(function() {
  $('.burger').toggleClass('is-active');
  $('#'+this.dataset.target).toggleClass('is-active');
});

// Page Navigation Management

const homeID = 'home';
const contentID = 'content';
// mapping between navbar items and page HTML
var navMap = {
  'home': '',
  'about': '',
  'events': '',
  'contact': '',
  'join': ''
};

// initialize home HTML once the page is rendered
$(function() {
  navMap[homeID] = $('#' + contentID).html();
});

// linking navbar items to their respective page HTML
Object.keys(navMap).forEach(function(navButtonID) {
  // prefetch HTML for each page
  if (navButtonID != homeID) { // home HTML is already embedded in index.html
    var link = $(this).attr('href');
    $.get($('#' + navButtonID).attr('href'),
      function(data) {
        navMap[navButtonID] = data;
      }, 
      'html'
    );
  }

  // register click callbacks that render corresponding page HTML
  $('#' + navButtonID).click(function() {
    $('#' + contentID).fadeOut(function() {
      if (navMap[navButtonID]) {
        $('#' + contentID).html(navMap[navButtonID]).fadeIn();
      } else {
        // TODO(ramv13): loading progressbar with timeout
      }
    });
    return false;
  });
});

// Quote Bank Management

const quoteID = 'quote';
const QUOTE_TIME = 15; // (s)
const QUOTES = [
  'Love All, Serve All',
  'Help Ever, Hurt Never',
  'Hands that serve are holier than lips that pray',
  'There is only one religion, the religion of love',
  'Service to man is service to God'
];
var quotes = QUOTES.slice(1,5);

function shuffleQuote() {
  if (quotes.length == 0) quotes = QUOTES.slice();
  var quoteIndex = Math.floor(Math.random()*quotes.length);
  while (('"' + quotes[quoteIndex] + '"') == $('#' + quoteID).html()) {
    quoteIndex = Math.floor(Math.random()*quotes.length);
  }
  var quote = quotes[quoteIndex];
  quotes.splice(quoteIndex, 1);
  $('#' + quoteID).fadeOut('slow', function() {
    $('#' + quoteID).html('"' + quote + '"').fadeIn('slow');
  });
  setTimeout(shuffleQuote, QUOTE_TIME * 1000);
}
setTimeout(shuffleQuote, QUOTE_TIME * 1000);
