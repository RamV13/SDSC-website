/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./mystyles.scss */ \"./src/mystyles.scss\");\nvar $ = __webpack_require__(/*! jquery */ \"jquery\");\n\n// Navbar Management\n\n$('.burger').click(function() {\n  $('.burger').toggleClass('is-active');\n  $('#'+this.dataset.target).toggleClass('is-active');\n});\n\n$('.navbar-item').click(function() {\n  $('.burger').toggleClass('is-active');\n  $('.navbar-menu').toggleClass('is-active');\n});\n\n// Page Navigation Management\n\nconst homeID = 'home';\nconst contentID = 'content';\nvar pageFilled = false;\n// mapping between navbar items and page HTML\nvar navMap = {\n  'home': '',\n  'about': '',\n  'events': '',\n  'contact': '',\n  'join': ''\n};\n\n// initialize page HTML once the page is rendered\n$(function() {\n  var navButtonID = curNavButton();\n  if (!navButtonID) navButtonID = homeID;\n  updatePage(navButtonID);\n  window.history.replaceState({\n    navButtonID: navButtonID\n  }, '', '#' + $('#' + navButtonID).attr('href'));\n});\n\nfunction curNavButton() {\n  return window.location.hash.substring(1, window.location.hash.length - 5);\n}\n\nfunction updatePage(navButtonID) {\n  if (!(navButtonID in navMap)) return;\n\n  $('#' + contentID).fadeOut(function() {\n    if (navMap[navButtonID]) {\n      $('#' + contentID).html(navMap[navButtonID]).fadeIn();\n    } else {\n      // TODO(ramv13): loading progressbar with timeout\n    }\n  });\n}\n\n// linking navbar items to their respective page HTML\nObject.keys(navMap).forEach(function(navButtonID) {\n  // prefetch HTML for each page\n  var link = $(this).attr('href');\n  $.get($('#' + navButtonID).attr('href'),\n    function(data) {\n      navMap[navButtonID] = data;\n    },\n    'html'\n  );\n\n  // register click callbacks that render corresponding page HTML\n  $('#' + navButtonID).click(function() {\n    if (navButtonID != curNavButton()) {\n      updatePage(navButtonID);\n      window.history.pushState({\n        navButtonID: navButtonID\n      }, '', '#' + $(this).attr('href'));\n    }\n    return false;\n  });\n});\n\nwindow.onpopstate = function(e) {\n  updatePage(e.state.navButtonID);\n};\n\n// Quote Bank Management\n\nconst quoteID = 'quote';\nconst QUOTE_TIME = 15; // (s)\nconst QUOTES = [\n  'Love All, Serve All',\n  'Help Ever, Hurt Never',\n  'Hands that serve are holier than lips that pray',\n  'There is only one religion, the religion of love',\n  'Service to man is service to God'\n];\nvar quotes = QUOTES.slice(1,5);\n\nfunction shuffleQuote() {\n  if (quotes.length == 0) quotes = QUOTES.slice();\n  var quoteIndex = Math.floor(Math.random()*quotes.length);\n  while (('\"' + quotes[quoteIndex] + '\"') == $('#' + quoteID).html()) {\n    quoteIndex = Math.floor(Math.random()*quotes.length);\n  }\n  var quote = quotes[quoteIndex];\n  quotes.splice(quoteIndex, 1);\n  $('#' + quoteID).fadeOut('slow', function() {\n    $('#' + quoteID).html('\"' + quote + '\"').fadeIn('slow');\n  });\n  setTimeout(shuffleQuote, QUOTE_TIME * 1000);\n}\nsetTimeout(shuffleQuote, QUOTE_TIME * 1000);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuL215c3R5bGVzLnNjc3MnKTtcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIE5hdmJhciBNYW5hZ2VtZW50XG5cbiQoJy5idXJnZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCgnLmJ1cmdlcicpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgJCgnIycrdGhpcy5kYXRhc2V0LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xufSk7XG5cbiQoJy5uYXZiYXItaXRlbScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKCcuYnVyZ2VyJykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAkKCcubmF2YmFyLW1lbnUnKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG59KTtcblxuLy8gUGFnZSBOYXZpZ2F0aW9uIE1hbmFnZW1lbnRcblxuY29uc3QgaG9tZUlEID0gJ2hvbWUnO1xuY29uc3QgY29udGVudElEID0gJ2NvbnRlbnQnO1xudmFyIHBhZ2VGaWxsZWQgPSBmYWxzZTtcbi8vIG1hcHBpbmcgYmV0d2VlbiBuYXZiYXIgaXRlbXMgYW5kIHBhZ2UgSFRNTFxudmFyIG5hdk1hcCA9IHtcbiAgJ2hvbWUnOiAnJyxcbiAgJ2Fib3V0JzogJycsXG4gICdldmVudHMnOiAnJyxcbiAgJ2NvbnRhY3QnOiAnJyxcbiAgJ2pvaW4nOiAnJ1xufTtcblxuLy8gaW5pdGlhbGl6ZSBwYWdlIEhUTUwgb25jZSB0aGUgcGFnZSBpcyByZW5kZXJlZFxuJChmdW5jdGlvbigpIHtcbiAgdmFyIG5hdkJ1dHRvbklEID0gY3VyTmF2QnV0dG9uKCk7XG4gIGlmICghbmF2QnV0dG9uSUQpIG5hdkJ1dHRvbklEID0gaG9tZUlEO1xuICB1cGRhdGVQYWdlKG5hdkJ1dHRvbklEKTtcbiAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHtcbiAgICBuYXZCdXR0b25JRDogbmF2QnV0dG9uSURcbiAgfSwgJycsICcjJyArICQoJyMnICsgbmF2QnV0dG9uSUQpLmF0dHIoJ2hyZWYnKSk7XG59KTtcblxuZnVuY3Rpb24gY3VyTmF2QnV0dG9uKCkge1xuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEsIHdpbmRvdy5sb2NhdGlvbi5oYXNoLmxlbmd0aCAtIDUpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVQYWdlKG5hdkJ1dHRvbklEKSB7XG4gIGlmICghKG5hdkJ1dHRvbklEIGluIG5hdk1hcCkpIHJldHVybjtcblxuICAkKCcjJyArIGNvbnRlbnRJRCkuZmFkZU91dChmdW5jdGlvbigpIHtcbiAgICBpZiAobmF2TWFwW25hdkJ1dHRvbklEXSkge1xuICAgICAgJCgnIycgKyBjb250ZW50SUQpLmh0bWwobmF2TWFwW25hdkJ1dHRvbklEXSkuZmFkZUluKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8ocmFtdjEzKTogbG9hZGluZyBwcm9ncmVzc2JhciB3aXRoIHRpbWVvdXRcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBsaW5raW5nIG5hdmJhciBpdGVtcyB0byB0aGVpciByZXNwZWN0aXZlIHBhZ2UgSFRNTFxuT2JqZWN0LmtleXMobmF2TWFwKS5mb3JFYWNoKGZ1bmN0aW9uKG5hdkJ1dHRvbklEKSB7XG4gIC8vIHByZWZldGNoIEhUTUwgZm9yIGVhY2ggcGFnZVxuICB2YXIgbGluayA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAkLmdldCgkKCcjJyArIG5hdkJ1dHRvbklEKS5hdHRyKCdocmVmJyksXG4gICAgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgbmF2TWFwW25hdkJ1dHRvbklEXSA9IGRhdGE7XG4gICAgfSxcbiAgICAnaHRtbCdcbiAgKTtcblxuICAvLyByZWdpc3RlciBjbGljayBjYWxsYmFja3MgdGhhdCByZW5kZXIgY29ycmVzcG9uZGluZyBwYWdlIEhUTUxcbiAgJCgnIycgKyBuYXZCdXR0b25JRCkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgaWYgKG5hdkJ1dHRvbklEICE9IGN1ck5hdkJ1dHRvbigpKSB7XG4gICAgICB1cGRhdGVQYWdlKG5hdkJ1dHRvbklEKTtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7XG4gICAgICAgIG5hdkJ1dHRvbklEOiBuYXZCdXR0b25JRFxuICAgICAgfSwgJycsICcjJyArICQodGhpcykuYXR0cignaHJlZicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn0pO1xuXG53aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdXBkYXRlUGFnZShlLnN0YXRlLm5hdkJ1dHRvbklEKTtcbn07XG5cbi8vIFF1b3RlIEJhbmsgTWFuYWdlbWVudFxuXG5jb25zdCBxdW90ZUlEID0gJ3F1b3RlJztcbmNvbnN0IFFVT1RFX1RJTUUgPSAxNTsgLy8gKHMpXG5jb25zdCBRVU9URVMgPSBbXG4gICdMb3ZlIEFsbCwgU2VydmUgQWxsJyxcbiAgJ0hlbHAgRXZlciwgSHVydCBOZXZlcicsXG4gICdIYW5kcyB0aGF0IHNlcnZlIGFyZSBob2xpZXIgdGhhbiBsaXBzIHRoYXQgcHJheScsXG4gICdUaGVyZSBpcyBvbmx5IG9uZSByZWxpZ2lvbiwgdGhlIHJlbGlnaW9uIG9mIGxvdmUnLFxuICAnU2VydmljZSB0byBtYW4gaXMgc2VydmljZSB0byBHb2QnXG5dO1xudmFyIHF1b3RlcyA9IFFVT1RFUy5zbGljZSgxLDUpO1xuXG5mdW5jdGlvbiBzaHVmZmxlUXVvdGUoKSB7XG4gIGlmIChxdW90ZXMubGVuZ3RoID09IDApIHF1b3RlcyA9IFFVT1RFUy5zbGljZSgpO1xuICB2YXIgcXVvdGVJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpxdW90ZXMubGVuZ3RoKTtcbiAgd2hpbGUgKCgnXCInICsgcXVvdGVzW3F1b3RlSW5kZXhdICsgJ1wiJykgPT0gJCgnIycgKyBxdW90ZUlEKS5odG1sKCkpIHtcbiAgICBxdW90ZUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnF1b3Rlcy5sZW5ndGgpO1xuICB9XG4gIHZhciBxdW90ZSA9IHF1b3Rlc1txdW90ZUluZGV4XTtcbiAgcXVvdGVzLnNwbGljZShxdW90ZUluZGV4LCAxKTtcbiAgJCgnIycgKyBxdW90ZUlEKS5mYWRlT3V0KCdzbG93JywgZnVuY3Rpb24oKSB7XG4gICAgJCgnIycgKyBxdW90ZUlEKS5odG1sKCdcIicgKyBxdW90ZSArICdcIicpLmZhZGVJbignc2xvdycpO1xuICB9KTtcbiAgc2V0VGltZW91dChzaHVmZmxlUXVvdGUsIFFVT1RFX1RJTUUgKiAxMDAwKTtcbn1cbnNldFRpbWVvdXQoc2h1ZmZsZVF1b3RlLCBRVU9URV9USU1FICogMTAwMCk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/mystyles.scss":
/*!***************************!*\
  !*** ./src/mystyles.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbXlzdHlsZXMuc2Nzcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9teXN0eWxlcy5zY3NzP2M2ODMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/mystyles.scss\n");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianF1ZXJ5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCI/Y2QwYyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///jquery\n");

/***/ })

/******/ });