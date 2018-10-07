!function(n){var e={};function t(g){if(e[g])return e[g].exports;var c=e[g]={i:g,l:!1,exports:{}};return n[g].call(c.exports,c,c.exports,t),c.l=!0,c.exports}t.m=n,t.c=e,t.d=function(n,e,g){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:g})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var g=Object.create(null);if(t.r(g),Object.defineProperty(g,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var c in n)t.d(g,c,function(e){return n[e]}.bind(null,c));return g},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s="./src/index.js")}({"./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */function(module,exports,__webpack_require__){eval("__webpack_require__(/*! ./mystyles.scss */ \"./src/mystyles.scss\");\nvar $ = __webpack_require__(/*! jquery */ \"jquery\");\n\n// Navbar Management\n\n$('.burger').click(function() {\n  $('.burger').toggleClass('is-active');\n  $('#'+this.dataset.target).toggleClass('is-active');\n});\n\n$('.navbar-item').click(function() {\n  $('.burger').removeClass('is-active');\n  $('.navbar-menu').removeClass('is-active');\n});\n\n// Page Navigation Management\n\nconst homeID = 'home';\nconst contentID = 'content';\nconst LOADING_CLASS = 'is-loading';\nconst LOADING_INTERVAL = 50; // (ms)\nvar pageFilled = false;\n// tree of mappings between navigation buttons and page HTML\nvar RESERVED_KEYS = ['html', 'fetching', 'toc'];\nvar navMap = {\n  home: {\n    education: {\n      toc: true\n    },\n    health: {\n      toc: true\n    },\n    community: {\n      toc: true\n    },\n    multifaith: {\n      toc: true\n    }\n  },\n  about: { },\n  events: { },\n  contact: { },\n  join: { }\n};\n\n// initialize page HTML once the page is rendered\n$(function() {\n  var pageID = currentPage();\n  updatePage(pageID);\n  window.history.replaceState({\n    pageID: pageID\n  }, '', '#' + pageID);\n});\n\n// retrieves the current page based on the hash in the current URL\nfunction currentPage() {\n  return window.location.hash.substring(1, window.location.hash.length) ||\n         homeID;\n}\n\n// recurses the tree of page navigation to find the mapping if it exists\nfunction findPageMap(pageMap, pageID) {\n  if (pageID in pageMap) return pageMap;\n  return Object.keys(pageMap).reduce(function(acc, id) {\n    if (RESERVED_KEYS.includes(id)) return acc;\n    return findPageMap(pageMap[id], pageID) || acc;\n  }, null);\n}\n\n// fetch the HTML for a page in the page map\nfunction fetchHTML(pageMap, pageID) {\n  if (!pageMap[pageID].html && !pageMap[pageID].fetching) {\n    pageMap[pageID].fetching = true;\n    $.get(pageID + '.html',\n      function(data) {\n        pageMap[pageID].html = data;\n        pageMap[pageID].fetching = false;\n      },\n      'html'\n    ).fail(function() {\n      pageMap[pageID].fetching = false;\n      fetchHTML(pageMap, pageID);\n    });\n  }\n}\n\n// the map that was previously registered with click callbacks\nvar prevRegisteredMap;\n\n// updates the current page to a new page\nfunction updatePage(pageID) {\n  var pageMap = findPageMap(navMap, pageID);\n  if (!pageMap) return;\n\n  if ($('#' + contentID).hasClass(LOADING_CLASS) &&\n      !pageMap[pageID].html) {\n    fetchHTML(pageMap, pageID);\n    setTimeout(function() { updatePage(pageID); }, LOADING_INTERVAL);\n    return;\n  }\n\n  $('#' + contentID).fadeOut(function() {\n    $('#' + contentID).removeClass(LOADING_CLASS);\n    if (pageMap[pageID].html) {\n      unregisterPageNavigators(prevRegisteredMap);\n      $('#' + contentID).html(pageMap[pageID].html);\n      if (pageMap[pageID].toc) {\n        createTOC();\n      }\n      registerPageNavigators(pageMap[pageID]);\n      prevRegisteredMap = pageMap[pageID];\n    } else {\n      $('#' + contentID).empty();\n      $('#' + contentID).addClass(LOADING_CLASS);\n      fetchHTML(pageMap, pageID);\n      setTimeout(function() { updatePage(pageID); }, LOADING_INTERVAL);\n    }\n    $('#' + contentID).fadeIn();\n  });\n}\n\n// unbinds all events from the pages in the provided page map\nfunction unregisterPageNavigators(pageMap) {\n  if (!pageMap) return;\n\n  Object.keys(pageMap).forEach(function(pageID) {\n    if (RESERVED_KEYS.includes(pageID)) return;\n    $('#' + pageID).unbind();\n  });\n}\n\n// fetches page HTML and binds click callbacks to page navigation\nfunction registerPageNavigators(pageMap) {\n  if (!pageMap) return;\n\n  Object.keys(pageMap).forEach(function(pageID) {\n    if (RESERVED_KEYS.includes(pageID)) return;\n\n    // prefetch HTML for each page if it has not been downloaded already\n    fetchHTML(pageMap, pageID);\n\n    // register click callbacks that render corresponding page HTML\n    $('#' + pageID).click(function() {\n      if (pageID != currentPage()) {\n        updatePage(pageID);\n        window.history.pushState({\n          pageID: pageID\n        }, '', '#' + pageID);\n      }\n      return false;\n    });\n  });\n}\n\n// updates the page according to browser navigation\nwindow.onpopstate = function(e) {\n  updatePage(e.state.pageID);\n};\n\n// linking navbar items to their respective page HTML\n$(function() { registerPageNavigators(navMap); });\n\n// Page Management\n\n// automatically creates a table of contents for the current page\nfunction createTOC() {\n  $('h4').each(function(index) {\n    var id = $(this).attr('id');\n    $('#toc').append('<a id=' + id + '-link class=\"is-size-4-desktop is-size-5-touch\">' + $(this).text() + '</a><br>');\n    $('#' + id + '-link').click(function() {\n      $('html, body').animate({\n        scrollTop: $('#' + id).offset().top - $('.navbar').height() - 10\n      }, 1000);\n    });\n  });\n}\n\n// Quote Bank Management\n\nconst quoteID = 'quote';\nconst quoteSubtitleID = 'quote-subtitle';\nconst QUOTE_TIME = 15; // (s)\nconst QUOTES = [\n  {quote: 'Love All, Serve All', isSai: true},\n  {quote: 'Help Ever, Hurt Never', isSai: true},\n  {quote: 'Hands that serve are holier than lips that pray', isSai: false},\n  {quote: 'There is only one religion, the religion of love', isSai: true},\n  {quote: 'Service to man is service to God', isSai: false}\n];\nvar quotes = QUOTES.slice(1,5);\n\n// shuffles the quote being shown\nfunction shuffleQuote() {\n  if (quotes.length == 0) quotes = QUOTES.slice();\n  var quoteIndex = Math.floor(Math.random()*quotes.length);\n  while (('\"' + quotes[quoteIndex].quote + '\"') == $('#' + quoteID).html()) {\n    quoteIndex = Math.floor(Math.random()*quotes.length);\n  }\n  var quote = quotes[quoteIndex].quote;\n  var isSai = quotes[quoteIndex].isSai;\n  quotes.splice(quoteIndex, 1);\n  $('#' + quoteID).fadeOut('slow', function() {\n    if (isSai) {\n      $('#' + quoteSubtitleID).fadeTo('slow', 1);\n    } else {\n      $('#' + quoteSubtitleID).fadeTo('slow', 0);\n    }\n    $('#' + quoteID).html('\"' + quote + '\"').fadeIn('slow');\n  });\n  setTimeout(shuffleQuote, QUOTE_TIME * 1000);\n}\n$(function() {\n  setTimeout(shuffleQuote, QUOTE_TIME * 1000);\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuL215c3R5bGVzLnNjc3MnKTtcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIE5hdmJhciBNYW5hZ2VtZW50XG5cbiQoJy5idXJnZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCgnLmJ1cmdlcicpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgJCgnIycrdGhpcy5kYXRhc2V0LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xufSk7XG5cbiQoJy5uYXZiYXItaXRlbScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKCcuYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAkKCcubmF2YmFyLW1lbnUnKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG59KTtcblxuLy8gUGFnZSBOYXZpZ2F0aW9uIE1hbmFnZW1lbnRcblxuY29uc3QgaG9tZUlEID0gJ2hvbWUnO1xuY29uc3QgY29udGVudElEID0gJ2NvbnRlbnQnO1xuY29uc3QgTE9BRElOR19DTEFTUyA9ICdpcy1sb2FkaW5nJztcbmNvbnN0IExPQURJTkdfSU5URVJWQUwgPSA1MDsgLy8gKG1zKVxudmFyIHBhZ2VGaWxsZWQgPSBmYWxzZTtcbi8vIHRyZWUgb2YgbWFwcGluZ3MgYmV0d2VlbiBuYXZpZ2F0aW9uIGJ1dHRvbnMgYW5kIHBhZ2UgSFRNTFxudmFyIFJFU0VSVkVEX0tFWVMgPSBbJ2h0bWwnLCAnZmV0Y2hpbmcnLCAndG9jJ107XG52YXIgbmF2TWFwID0ge1xuICBob21lOiB7XG4gICAgZWR1Y2F0aW9uOiB7XG4gICAgICB0b2M6IHRydWVcbiAgICB9LFxuICAgIGhlYWx0aDoge1xuICAgICAgdG9jOiB0cnVlXG4gICAgfSxcbiAgICBjb21tdW5pdHk6IHtcbiAgICAgIHRvYzogdHJ1ZVxuICAgIH0sXG4gICAgbXVsdGlmYWl0aDoge1xuICAgICAgdG9jOiB0cnVlXG4gICAgfVxuICB9LFxuICBhYm91dDogeyB9LFxuICBldmVudHM6IHsgfSxcbiAgY29udGFjdDogeyB9LFxuICBqb2luOiB7IH1cbn07XG5cbi8vIGluaXRpYWxpemUgcGFnZSBIVE1MIG9uY2UgdGhlIHBhZ2UgaXMgcmVuZGVyZWRcbiQoZnVuY3Rpb24oKSB7XG4gIHZhciBwYWdlSUQgPSBjdXJyZW50UGFnZSgpO1xuICB1cGRhdGVQYWdlKHBhZ2VJRCk7XG4gIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7XG4gICAgcGFnZUlEOiBwYWdlSURcbiAgfSwgJycsICcjJyArIHBhZ2VJRCk7XG59KTtcblxuLy8gcmV0cmlldmVzIHRoZSBjdXJyZW50IHBhZ2UgYmFzZWQgb24gdGhlIGhhc2ggaW4gdGhlIGN1cnJlbnQgVVJMXG5mdW5jdGlvbiBjdXJyZW50UGFnZSgpIHtcbiAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxLCB3aW5kb3cubG9jYXRpb24uaGFzaC5sZW5ndGgpIHx8XG4gICAgICAgICBob21lSUQ7XG59XG5cbi8vIHJlY3Vyc2VzIHRoZSB0cmVlIG9mIHBhZ2UgbmF2aWdhdGlvbiB0byBmaW5kIHRoZSBtYXBwaW5nIGlmIGl0IGV4aXN0c1xuZnVuY3Rpb24gZmluZFBhZ2VNYXAocGFnZU1hcCwgcGFnZUlEKSB7XG4gIGlmIChwYWdlSUQgaW4gcGFnZU1hcCkgcmV0dXJuIHBhZ2VNYXA7XG4gIHJldHVybiBPYmplY3Qua2V5cyhwYWdlTWFwKS5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBpZCkge1xuICAgIGlmIChSRVNFUlZFRF9LRVlTLmluY2x1ZGVzKGlkKSkgcmV0dXJuIGFjYztcbiAgICByZXR1cm4gZmluZFBhZ2VNYXAocGFnZU1hcFtpZF0sIHBhZ2VJRCkgfHwgYWNjO1xuICB9LCBudWxsKTtcbn1cblxuLy8gZmV0Y2ggdGhlIEhUTUwgZm9yIGEgcGFnZSBpbiB0aGUgcGFnZSBtYXBcbmZ1bmN0aW9uIGZldGNoSFRNTChwYWdlTWFwLCBwYWdlSUQpIHtcbiAgaWYgKCFwYWdlTWFwW3BhZ2VJRF0uaHRtbCAmJiAhcGFnZU1hcFtwYWdlSURdLmZldGNoaW5nKSB7XG4gICAgcGFnZU1hcFtwYWdlSURdLmZldGNoaW5nID0gdHJ1ZTtcbiAgICAkLmdldChwYWdlSUQgKyAnLmh0bWwnLFxuICAgICAgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBwYWdlTWFwW3BhZ2VJRF0uaHRtbCA9IGRhdGE7XG4gICAgICAgIHBhZ2VNYXBbcGFnZUlEXS5mZXRjaGluZyA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgICdodG1sJ1xuICAgICkuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgIHBhZ2VNYXBbcGFnZUlEXS5mZXRjaGluZyA9IGZhbHNlO1xuICAgICAgZmV0Y2hIVE1MKHBhZ2VNYXAsIHBhZ2VJRCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gdGhlIG1hcCB0aGF0IHdhcyBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCBjbGljayBjYWxsYmFja3NcbnZhciBwcmV2UmVnaXN0ZXJlZE1hcDtcblxuLy8gdXBkYXRlcyB0aGUgY3VycmVudCBwYWdlIHRvIGEgbmV3IHBhZ2VcbmZ1bmN0aW9uIHVwZGF0ZVBhZ2UocGFnZUlEKSB7XG4gIHZhciBwYWdlTWFwID0gZmluZFBhZ2VNYXAobmF2TWFwLCBwYWdlSUQpO1xuICBpZiAoIXBhZ2VNYXApIHJldHVybjtcblxuICBpZiAoJCgnIycgKyBjb250ZW50SUQpLmhhc0NsYXNzKExPQURJTkdfQ0xBU1MpICYmXG4gICAgICAhcGFnZU1hcFtwYWdlSURdLmh0bWwpIHtcbiAgICBmZXRjaEhUTUwocGFnZU1hcCwgcGFnZUlEKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB1cGRhdGVQYWdlKHBhZ2VJRCk7IH0sIExPQURJTkdfSU5URVJWQUwpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gICQoJyMnICsgY29udGVudElEKS5mYWRlT3V0KGZ1bmN0aW9uKCkge1xuICAgICQoJyMnICsgY29udGVudElEKS5yZW1vdmVDbGFzcyhMT0FESU5HX0NMQVNTKTtcbiAgICBpZiAocGFnZU1hcFtwYWdlSURdLmh0bWwpIHtcbiAgICAgIHVucmVnaXN0ZXJQYWdlTmF2aWdhdG9ycyhwcmV2UmVnaXN0ZXJlZE1hcCk7XG4gICAgICAkKCcjJyArIGNvbnRlbnRJRCkuaHRtbChwYWdlTWFwW3BhZ2VJRF0uaHRtbCk7XG4gICAgICBpZiAocGFnZU1hcFtwYWdlSURdLnRvYykge1xuICAgICAgICBjcmVhdGVUT0MoKTtcbiAgICAgIH1cbiAgICAgIHJlZ2lzdGVyUGFnZU5hdmlnYXRvcnMocGFnZU1hcFtwYWdlSURdKTtcbiAgICAgIHByZXZSZWdpc3RlcmVkTWFwID0gcGFnZU1hcFtwYWdlSURdO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjJyArIGNvbnRlbnRJRCkuZW1wdHkoKTtcbiAgICAgICQoJyMnICsgY29udGVudElEKS5hZGRDbGFzcyhMT0FESU5HX0NMQVNTKTtcbiAgICAgIGZldGNoSFRNTChwYWdlTWFwLCBwYWdlSUQpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgdXBkYXRlUGFnZShwYWdlSUQpOyB9LCBMT0FESU5HX0lOVEVSVkFMKTtcbiAgICB9XG4gICAgJCgnIycgKyBjb250ZW50SUQpLmZhZGVJbigpO1xuICB9KTtcbn1cblxuLy8gdW5iaW5kcyBhbGwgZXZlbnRzIGZyb20gdGhlIHBhZ2VzIGluIHRoZSBwcm92aWRlZCBwYWdlIG1hcFxuZnVuY3Rpb24gdW5yZWdpc3RlclBhZ2VOYXZpZ2F0b3JzKHBhZ2VNYXApIHtcbiAgaWYgKCFwYWdlTWFwKSByZXR1cm47XG5cbiAgT2JqZWN0LmtleXMocGFnZU1hcCkuZm9yRWFjaChmdW5jdGlvbihwYWdlSUQpIHtcbiAgICBpZiAoUkVTRVJWRURfS0VZUy5pbmNsdWRlcyhwYWdlSUQpKSByZXR1cm47XG4gICAgJCgnIycgKyBwYWdlSUQpLnVuYmluZCgpO1xuICB9KTtcbn1cblxuLy8gZmV0Y2hlcyBwYWdlIEhUTUwgYW5kIGJpbmRzIGNsaWNrIGNhbGxiYWNrcyB0byBwYWdlIG5hdmlnYXRpb25cbmZ1bmN0aW9uIHJlZ2lzdGVyUGFnZU5hdmlnYXRvcnMocGFnZU1hcCkge1xuICBpZiAoIXBhZ2VNYXApIHJldHVybjtcblxuICBPYmplY3Qua2V5cyhwYWdlTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2VJRCkge1xuICAgIGlmIChSRVNFUlZFRF9LRVlTLmluY2x1ZGVzKHBhZ2VJRCkpIHJldHVybjtcblxuICAgIC8vIHByZWZldGNoIEhUTUwgZm9yIGVhY2ggcGFnZSBpZiBpdCBoYXMgbm90IGJlZW4gZG93bmxvYWRlZCBhbHJlYWR5XG4gICAgZmV0Y2hIVE1MKHBhZ2VNYXAsIHBhZ2VJRCk7XG5cbiAgICAvLyByZWdpc3RlciBjbGljayBjYWxsYmFja3MgdGhhdCByZW5kZXIgY29ycmVzcG9uZGluZyBwYWdlIEhUTUxcbiAgICAkKCcjJyArIHBhZ2VJRCkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocGFnZUlEICE9IGN1cnJlbnRQYWdlKCkpIHtcbiAgICAgICAgdXBkYXRlUGFnZShwYWdlSUQpO1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe1xuICAgICAgICAgIHBhZ2VJRDogcGFnZUlEXG4gICAgICAgIH0sICcnLCAnIycgKyBwYWdlSUQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gdXBkYXRlcyB0aGUgcGFnZSBhY2NvcmRpbmcgdG8gYnJvd3NlciBuYXZpZ2F0aW9uXG53aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdXBkYXRlUGFnZShlLnN0YXRlLnBhZ2VJRCk7XG59O1xuXG4vLyBsaW5raW5nIG5hdmJhciBpdGVtcyB0byB0aGVpciByZXNwZWN0aXZlIHBhZ2UgSFRNTFxuJChmdW5jdGlvbigpIHsgcmVnaXN0ZXJQYWdlTmF2aWdhdG9ycyhuYXZNYXApOyB9KTtcblxuLy8gUGFnZSBNYW5hZ2VtZW50XG5cbi8vIGF1dG9tYXRpY2FsbHkgY3JlYXRlcyBhIHRhYmxlIG9mIGNvbnRlbnRzIGZvciB0aGUgY3VycmVudCBwYWdlXG5mdW5jdGlvbiBjcmVhdGVUT0MoKSB7XG4gICQoJ2g0JykuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignaWQnKTtcbiAgICAkKCcjdG9jJykuYXBwZW5kKCc8YSBpZD0nICsgaWQgKyAnLWxpbmsgY2xhc3M9XCJpcy1zaXplLTQtZGVza3RvcCBpcy1zaXplLTUtdG91Y2hcIj4nICsgJCh0aGlzKS50ZXh0KCkgKyAnPC9hPjxicj4nKTtcbiAgICAkKCcjJyArIGlkICsgJy1saW5rJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJCgnIycgKyBpZCkub2Zmc2V0KCkudG9wIC0gJCgnLm5hdmJhcicpLmhlaWdodCgpIC0gMTBcbiAgICAgIH0sIDEwMDApO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gUXVvdGUgQmFuayBNYW5hZ2VtZW50XG5cbmNvbnN0IHF1b3RlSUQgPSAncXVvdGUnO1xuY29uc3QgcXVvdGVTdWJ0aXRsZUlEID0gJ3F1b3RlLXN1YnRpdGxlJztcbmNvbnN0IFFVT1RFX1RJTUUgPSAxNTsgLy8gKHMpXG5jb25zdCBRVU9URVMgPSBbXG4gIHtxdW90ZTogJ0xvdmUgQWxsLCBTZXJ2ZSBBbGwnLCBpc1NhaTogdHJ1ZX0sXG4gIHtxdW90ZTogJ0hlbHAgRXZlciwgSHVydCBOZXZlcicsIGlzU2FpOiB0cnVlfSxcbiAge3F1b3RlOiAnSGFuZHMgdGhhdCBzZXJ2ZSBhcmUgaG9saWVyIHRoYW4gbGlwcyB0aGF0IHByYXknLCBpc1NhaTogZmFsc2V9LFxuICB7cXVvdGU6ICdUaGVyZSBpcyBvbmx5IG9uZSByZWxpZ2lvbiwgdGhlIHJlbGlnaW9uIG9mIGxvdmUnLCBpc1NhaTogdHJ1ZX0sXG4gIHtxdW90ZTogJ1NlcnZpY2UgdG8gbWFuIGlzIHNlcnZpY2UgdG8gR29kJywgaXNTYWk6IGZhbHNlfVxuXTtcbnZhciBxdW90ZXMgPSBRVU9URVMuc2xpY2UoMSw1KTtcblxuLy8gc2h1ZmZsZXMgdGhlIHF1b3RlIGJlaW5nIHNob3duXG5mdW5jdGlvbiBzaHVmZmxlUXVvdGUoKSB7XG4gIGlmIChxdW90ZXMubGVuZ3RoID09IDApIHF1b3RlcyA9IFFVT1RFUy5zbGljZSgpO1xuICB2YXIgcXVvdGVJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpxdW90ZXMubGVuZ3RoKTtcbiAgd2hpbGUgKCgnXCInICsgcXVvdGVzW3F1b3RlSW5kZXhdLnF1b3RlICsgJ1wiJykgPT0gJCgnIycgKyBxdW90ZUlEKS5odG1sKCkpIHtcbiAgICBxdW90ZUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnF1b3Rlcy5sZW5ndGgpO1xuICB9XG4gIHZhciBxdW90ZSA9IHF1b3Rlc1txdW90ZUluZGV4XS5xdW90ZTtcbiAgdmFyIGlzU2FpID0gcXVvdGVzW3F1b3RlSW5kZXhdLmlzU2FpO1xuICBxdW90ZXMuc3BsaWNlKHF1b3RlSW5kZXgsIDEpO1xuICAkKCcjJyArIHF1b3RlSUQpLmZhZGVPdXQoJ3Nsb3cnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAoaXNTYWkpIHtcbiAgICAgICQoJyMnICsgcXVvdGVTdWJ0aXRsZUlEKS5mYWRlVG8oJ3Nsb3cnLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnIycgKyBxdW90ZVN1YnRpdGxlSUQpLmZhZGVUbygnc2xvdycsIDApO1xuICAgIH1cbiAgICAkKCcjJyArIHF1b3RlSUQpLmh0bWwoJ1wiJyArIHF1b3RlICsgJ1wiJykuZmFkZUluKCdzbG93Jyk7XG4gIH0pO1xuICBzZXRUaW1lb3V0KHNodWZmbGVRdW90ZSwgUVVPVEVfVElNRSAqIDEwMDApO1xufVxuJChmdW5jdGlvbigpIHtcbiAgc2V0VGltZW91dChzaHVmZmxlUXVvdGUsIFFVT1RFX1RJTUUgKiAxMDAwKTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n")},"./src/mystyles.scss":
/*!***************************!*\
  !*** ./src/mystyles.scss ***!
  \***************************/
/*! no static exports found */function(module,exports){eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbXlzdHlsZXMuc2Nzcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9teXN0eWxlcy5zY3NzP2M2ODMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/mystyles.scss\n")},jquery:
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */function(module,exports){eval("module.exports = jQuery;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianF1ZXJ5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCI/Y2QwYyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///jquery\n")}});