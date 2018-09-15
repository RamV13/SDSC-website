require('./mystyles.scss');
var $ = require('jquery');

// Navbar Management

$('.burger').click(function() {
  $('.burger').toggleClass('is-active');
  $('#'+this.dataset.target).toggleClass('is-active');
});

$('.navbar-item').click(function() {
  $('.burger').removeClass('is-active');
  $('.navbar-menu').removeClass('is-active');
});

// Page Navigation Management

const homeID = 'home';
const contentID = 'content';
var pageFilled = false;
// mapping between navbar items and page HTML
var navMap = {
  'home': '',
  'about': '',
  'events': '',
  'contact': '',
  'join': ''
};

// initialize page HTML once the page is rendered
$(function() {
  var navButtonID = curNavButton();
  if (!navButtonID) navButtonID = homeID;
  updatePage(navButtonID);
  window.history.replaceState({
    navButtonID: navButtonID
  }, '', '#' + $('#' + navButtonID).attr('href'));
});

function curNavButton() {
  return window.location.hash.substring(1, window.location.hash.length - 5);
}

function updatePage(navButtonID) {
  if (!(navButtonID in navMap)) return;

  $('#' + contentID).fadeOut(function() {
    if (navMap[navButtonID]) {
      $('#' + contentID).html(navMap[navButtonID]).fadeIn();
    } else {
      // TODO(ramv13): loading progressbar with timeout
    }
  });
}

// linking navbar items to their respective page HTML
Object.keys(navMap).forEach(function(navButtonID) {
  // prefetch HTML for each page
  var link = $(this).attr('href');
  $.get($('#' + navButtonID).attr('href'),
    function(data) {
      navMap[navButtonID] = data;
    },
    'html'
  );

  // register click callbacks that render corresponding page HTML
  $('#' + navButtonID).click(function() {
    if (navButtonID != curNavButton()) {
      updatePage(navButtonID);
      window.history.pushState({
        navButtonID: navButtonID
      }, '', '#' + $(this).attr('href'));
    }
    return false;
  });
});

window.onpopstate = function(e) {
  updatePage(e.state.navButtonID);
};

// Quote Bank Management

const quoteID = 'quote';
const quoteSubtitleID = 'quote-subtitle';
const QUOTE_TIME = 15; // (s)
const QUOTES = [
  {quote: 'Love All, Serve All', isSai: true},
  {quote: 'Help Ever, Hurt Never', isSai: true},
  {quote: 'Hands that serve are holier than lips that pray', isSai: false},
  {quote: 'There is only one religion, the religion of love', isSai: true},
  {quote: 'Service to man is service to God', isSai: false}
];
var quotes = QUOTES.slice(1,5);

function shuffleQuote() {
  if (quotes.length == 0) quotes = QUOTES.slice();
  var quoteIndex = Math.floor(Math.random()*quotes.length);
  while (('"' + quotes[quoteIndex].quote + '"') == $('#' + quoteID).html()) {
    quoteIndex = Math.floor(Math.random()*quotes.length);
  }
  var quote = quotes[quoteIndex].quote;
  var isSai = quotes[quoteIndex].isSai;
  quotes.splice(quoteIndex, 1);
  $('#' + quoteID).fadeOut('slow', function() {
    if (isSai) {
      $('#' + quoteSubtitleID).fadeTo('slow', 1);
    } else {
      $('#' + quoteSubtitleID).fadeTo('slow', 0);
    }
    $('#' + quoteID).html('"' + quote + '"').fadeIn('slow');
  });
  setTimeout(shuffleQuote, QUOTE_TIME * 1000);
}
setTimeout(shuffleQuote, QUOTE_TIME * 1000);
