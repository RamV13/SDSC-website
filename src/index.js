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
const LOADING_CLASS = 'is-loading';
const LOADING_INTERVAL = 50; // (ms)
var pageFilled = false;
// tree of mappings between navigation buttons and page HTML
var RESERVED_KEYS = ['html', 'fetching'];
var navMap = {
  home: {
    education: { },
    health: { },
    community: { },
    multifaith: { }
  },
  about: { },
  events: { },
  contact: { },
  join: { }
};

// initialize page HTML once the page is rendered
$(function() {
  var pageButtonID = curPageButton();
  updatePage(pageButtonID);
  window.history.replaceState({
    pageButtonID: pageButtonID
  }, '', '#' + pageButtonID + '.html');
});

function curPageButton() {
  return window.location.hash.substring(1, window.location.hash.length - 5) ||
         homeID;
}

// recurses the tree of page navigating buttons to find the mapping if it exists
function findPageMap(pageMap, pageButtonID) {
  if (pageButtonID in pageMap) return pageMap;
  return Object.keys(pageMap).reduce(function(acc, id) {
    if (RESERVED_KEYS.includes(id)) return acc;
    return findPageMap(pageMap[id], pageButtonID) || acc;
  }, null);
}

// fetch the HTML for a page in the page map
function fetchHTML(pageMap, pageButtonID) {
  if (!pageMap[pageButtonID].html && !pageMap[pageButtonID].fetching) {
    console.log('Fetching ' + pageButtonID);
    pageMap[pageButtonID].fetching = true;
    $.get(pageButtonID + '.html',
      function(data) {
        pageMap[pageButtonID].html = data;
        pageMap[pageButtonID].fetching = false;
      },
      'html'
    ).fail(function() {
      pageMap[pageButtonID].fetching = false;
      fetchHTML(pageMap, pageButtonID);
    });
  }
}

var prevRegisteredMap;
function updatePage(pageButtonID) {
  var pageMap = findPageMap(navMap, pageButtonID);
  if (!pageMap) return;

  if ($('#' + contentID).hasClass(LOADING_CLASS) &&
      !pageMap[pageButtonID].html) {
    fetchHTML(pageMap, pageButtonID);
    setTimeout(function() { updatePage(pageButtonID); }, LOADING_INTERVAL);
    return;
  }

  $('#' + contentID).fadeOut(function() {
    $('#' + contentID).removeClass(LOADING_CLASS);
    if (pageMap[pageButtonID].html) {
      unregisterPageNavigators(prevRegisteredMap);
      $('#' + contentID).html(pageMap[pageButtonID].html);
      registerPageNavigators(pageMap[pageButtonID]);
      prevRegisteredMap = pageMap[pageButtonID];
    } else {
      $('#' + contentID).empty();
      $('#' + contentID).addClass(LOADING_CLASS);
      fetchHTML(pageMap, pageButtonID);
      setTimeout(function() { updatePage(pageButtonID); }, LOADING_INTERVAL);
    }
    $('#' + contentID).fadeIn();
  });
}

function unregisterPageNavigators(pageMap) {
  if (!pageMap) return;

  Object.keys(pageMap).forEach(function(pageButtonID) {
    if (RESERVED_KEYS.includes(pageButtonID)) return;
    $('#' + pageButtonID).unbind();
  });
}

function registerPageNavigators(pageMap) {
  if (!pageMap) return;

  Object.keys(pageMap).forEach(function(pageButtonID) {
    if (RESERVED_KEYS.includes(pageButtonID)) return;

    // prefetch HTML for each page if it has not been downloaded already
    fetchHTML(pageMap, pageButtonID);

    // register click callbacks that render corresponding page HTML
    $('#' + pageButtonID).click(function() {
      if (pageButtonID != curPageButton()) {
        updatePage(pageButtonID);
        window.history.pushState({
          pageButtonID: pageButtonID
        }, '', '#' + pageButtonID + '.html');
      }
      return false;
    });
  });
}

window.onpopstate = function(e) {
  updatePage(e.state.pageButtonID);
};

// linking navbar items to their respective page HTML
$(function() { registerPageNavigators(navMap); });

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
$(function() {
  setTimeout(shuffleQuote, QUOTE_TIME * 1000);
});
