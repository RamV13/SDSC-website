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
  var pageID = currentPage();
  updatePage(pageID);
  window.history.replaceState({
    pageID: pageID
  }, '', '#' + pageID);
});

function currentPage() {
  return window.location.hash.substring(1, window.location.hash.length) ||
         homeID;
}

// recurses the tree of page navigation to find the mapping if it exists
function findPageMap(pageMap, pageID) {
  if (pageID in pageMap) return pageMap;
  return Object.keys(pageMap).reduce(function(acc, id) {
    if (RESERVED_KEYS.includes(id)) return acc;
    return findPageMap(pageMap[id], pageID) || acc;
  }, null);
}

// fetch the HTML for a page in the page map
function fetchHTML(pageMap, pageID) {
  if (!pageMap[pageID].html && !pageMap[pageID].fetching) {
    console.log('Fetching ' + pageID);
    pageMap[pageID].fetching = true;
    $.get(pageID + '.html',
      function(data) {
        pageMap[pageID].html = data;
        pageMap[pageID].fetching = false;
      },
      'html'
    ).fail(function() {
      pageMap[pageID].fetching = false;
      fetchHTML(pageMap, pageID);
    });
  }
}

var prevRegisteredMap;
function updatePage(pageID) {
  var pageMap = findPageMap(navMap, pageID);
  if (!pageMap) return;

  if ($('#' + contentID).hasClass(LOADING_CLASS) &&
      !pageMap[pageID].html) {
    fetchHTML(pageMap, pageID);
    setTimeout(function() { updatePage(pageID); }, LOADING_INTERVAL);
    return;
  }

  $('#' + contentID).fadeOut(function() {
    $('#' + contentID).removeClass(LOADING_CLASS);
    if (pageMap[pageID].html) {
      unregisterPageNavigators(prevRegisteredMap);
      $('#' + contentID).html(pageMap[pageID].html);
      registerPageNavigators(pageMap[pageID]);
      prevRegisteredMap = pageMap[pageID];
    } else {
      $('#' + contentID).empty();
      $('#' + contentID).addClass(LOADING_CLASS);
      fetchHTML(pageMap, pageID);
      setTimeout(function() { updatePage(pageID); }, LOADING_INTERVAL);
    }
    $('#' + contentID).fadeIn();
  });
}

function unregisterPageNavigators(pageMap) {
  if (!pageMap) return;

  Object.keys(pageMap).forEach(function(pageID) {
    if (RESERVED_KEYS.includes(pageID)) return;
    $('#' + pageID).unbind();
  });
}

function registerPageNavigators(pageMap) {
  if (!pageMap) return;

  Object.keys(pageMap).forEach(function(pageID) {
    if (RESERVED_KEYS.includes(pageID)) return;

    // prefetch HTML for each page if it has not been downloaded already
    fetchHTML(pageMap, pageID);

    // register click callbacks that render corresponding page HTML
    $('#' + pageID).click(function() {
      if (pageID != currentPage()) {
        updatePage(pageID);
        window.history.pushState({
          pageID: pageID
        }, '', '#' + pageID);
      }
      return false;
    });
  });
}

window.onpopstate = function(e) {
  updatePage(e.state.pageID);
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
