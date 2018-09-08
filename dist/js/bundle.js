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

eval("__webpack_require__(/*! ./mystyles.scss */ \"./src/mystyles.scss\");\nvar $ = __webpack_require__(/*! jquery */ \"jquery\");\n\n// Navbar Management\n\n$('.burger').click(function() {\n  $('.burger').toggleClass('is-active');\n  $('#'+this.dataset.target).toggleClass('is-active');\n});\n\n// Page Navigation Management\n\nconst homeID = 'home';\nconst contentID = 'content';\n// mapping between navbar items and page HTML\nvar navMap = {\n  'home': '',\n  'about': '',\n  'events': '',\n  'contact': '',\n  'join': ''\n};\n\n// initialize page HTML once the page is rendered\n$(function() {\n  updatePage(window.location.hash.substring(1, window.location.hash.length - 5));\n});\n\nfunction updatePage(navButtonID) {\n  navButtonID = navButtonID in navMap ? navButtonID : homeID;\n  $('#' + contentID).fadeOut(function() {\n    if (navMap[navButtonID]) {\n      $('#' + contentID).html(navMap[navButtonID]).fadeIn();\n    } else {\n      // TODO(ramv13): loading progressbar with timeout\n    }\n  });\n}\n\n// linking navbar items to their respective page HTML\nObject.keys(navMap).forEach(function(navButtonID) {\n  // prefetch HTML for each page\n  var link = $(this).attr('href');\n  $.get($('#' + navButtonID).attr('href'),\n    function(data) {\n      navMap[navButtonID] = data;\n    },\n    'html'\n  );\n\n  // register click callbacks that render corresponding page HTML\n  $('#' + navButtonID).click(function() {\n    window.history.pushState({\n      navButtonID: navButtonID\n    }, '', '#' + $(this).attr('href'));\n    updatePage(navButtonID);\n    return false;\n  });\n});\n\nwindow.onpopstate = function(e) {\n  updatePage(e.state ? e.state.navButtonID : homeID);\n};\n\n// Quote Bank Management\n\nconst quoteID = 'quote';\nconst QUOTE_TIME = 15; // (s)\nconst QUOTES = [\n  'Love All, Serve All',\n  'Help Ever, Hurt Never',\n  'Hands that serve are holier than lips that pray',\n  'There is only one religion, the religion of love',\n  'Service to man is service to God'\n];\nvar quotes = QUOTES.slice(1,5);\n\nfunction shuffleQuote() {\n  if (quotes.length == 0) quotes = QUOTES.slice();\n  var quoteIndex = Math.floor(Math.random()*quotes.length);\n  while (('\"' + quotes[quoteIndex] + '\"') == $('#' + quoteID).html()) {\n    quoteIndex = Math.floor(Math.random()*quotes.length);\n  }\n  var quote = quotes[quoteIndex];\n  quotes.splice(quoteIndex, 1);\n  $('#' + quoteID).fadeOut('slow', function() {\n    $('#' + quoteID).html('\"' + quote + '\"').fadeIn('slow');\n  });\n  setTimeout(shuffleQuote, QUOTE_TIME * 1000);\n}\nsetTimeout(shuffleQuote, QUOTE_TIME * 1000);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuL215c3R5bGVzLnNjc3MnKTtcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIE5hdmJhciBNYW5hZ2VtZW50XG5cbiQoJy5idXJnZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCgnLmJ1cmdlcicpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgJCgnIycrdGhpcy5kYXRhc2V0LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xufSk7XG5cbi8vIFBhZ2UgTmF2aWdhdGlvbiBNYW5hZ2VtZW50XG5cbmNvbnN0IGhvbWVJRCA9ICdob21lJztcbmNvbnN0IGNvbnRlbnRJRCA9ICdjb250ZW50Jztcbi8vIG1hcHBpbmcgYmV0d2VlbiBuYXZiYXIgaXRlbXMgYW5kIHBhZ2UgSFRNTFxudmFyIG5hdk1hcCA9IHtcbiAgJ2hvbWUnOiAnJyxcbiAgJ2Fib3V0JzogJycsXG4gICdldmVudHMnOiAnJyxcbiAgJ2NvbnRhY3QnOiAnJyxcbiAgJ2pvaW4nOiAnJ1xufTtcblxuLy8gaW5pdGlhbGl6ZSBwYWdlIEhUTUwgb25jZSB0aGUgcGFnZSBpcyByZW5kZXJlZFxuJChmdW5jdGlvbigpIHtcbiAgdXBkYXRlUGFnZSh3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSwgd2luZG93LmxvY2F0aW9uLmhhc2gubGVuZ3RoIC0gNSkpO1xufSk7XG5cbmZ1bmN0aW9uIHVwZGF0ZVBhZ2UobmF2QnV0dG9uSUQpIHtcbiAgbmF2QnV0dG9uSUQgPSBuYXZCdXR0b25JRCBpbiBuYXZNYXAgPyBuYXZCdXR0b25JRCA6IGhvbWVJRDtcbiAgJCgnIycgKyBjb250ZW50SUQpLmZhZGVPdXQoZnVuY3Rpb24oKSB7XG4gICAgaWYgKG5hdk1hcFtuYXZCdXR0b25JRF0pIHtcbiAgICAgICQoJyMnICsgY29udGVudElEKS5odG1sKG5hdk1hcFtuYXZCdXR0b25JRF0pLmZhZGVJbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUT0RPKHJhbXYxMyk6IGxvYWRpbmcgcHJvZ3Jlc3NiYXIgd2l0aCB0aW1lb3V0XG4gICAgfVxuICB9KTtcbn1cblxuLy8gbGlua2luZyBuYXZiYXIgaXRlbXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBwYWdlIEhUTUxcbk9iamVjdC5rZXlzKG5hdk1hcCkuZm9yRWFjaChmdW5jdGlvbihuYXZCdXR0b25JRCkge1xuICAvLyBwcmVmZXRjaCBIVE1MIGZvciBlYWNoIHBhZ2VcbiAgdmFyIGxpbmsgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgJC5nZXQoJCgnIycgKyBuYXZCdXR0b25JRCkuYXR0cignaHJlZicpLFxuICAgIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIG5hdk1hcFtuYXZCdXR0b25JRF0gPSBkYXRhO1xuICAgIH0sXG4gICAgJ2h0bWwnXG4gICk7XG5cbiAgLy8gcmVnaXN0ZXIgY2xpY2sgY2FsbGJhY2tzIHRoYXQgcmVuZGVyIGNvcnJlc3BvbmRpbmcgcGFnZSBIVE1MXG4gICQoJyMnICsgbmF2QnV0dG9uSUQpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7XG4gICAgICBuYXZCdXR0b25JRDogbmF2QnV0dG9uSURcbiAgICB9LCAnJywgJyMnICsgJCh0aGlzKS5hdHRyKCdocmVmJykpO1xuICAgIHVwZGF0ZVBhZ2UobmF2QnV0dG9uSUQpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59KTtcblxud2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbihlKSB7XG4gIHVwZGF0ZVBhZ2UoZS5zdGF0ZSA/IGUuc3RhdGUubmF2QnV0dG9uSUQgOiBob21lSUQpO1xufTtcblxuLy8gUXVvdGUgQmFuayBNYW5hZ2VtZW50XG5cbmNvbnN0IHF1b3RlSUQgPSAncXVvdGUnO1xuY29uc3QgUVVPVEVfVElNRSA9IDE1OyAvLyAocylcbmNvbnN0IFFVT1RFUyA9IFtcbiAgJ0xvdmUgQWxsLCBTZXJ2ZSBBbGwnLFxuICAnSGVscCBFdmVyLCBIdXJ0IE5ldmVyJyxcbiAgJ0hhbmRzIHRoYXQgc2VydmUgYXJlIGhvbGllciB0aGFuIGxpcHMgdGhhdCBwcmF5JyxcbiAgJ1RoZXJlIGlzIG9ubHkgb25lIHJlbGlnaW9uLCB0aGUgcmVsaWdpb24gb2YgbG92ZScsXG4gICdTZXJ2aWNlIHRvIG1hbiBpcyBzZXJ2aWNlIHRvIEdvZCdcbl07XG52YXIgcXVvdGVzID0gUVVPVEVTLnNsaWNlKDEsNSk7XG5cbmZ1bmN0aW9uIHNodWZmbGVRdW90ZSgpIHtcbiAgaWYgKHF1b3Rlcy5sZW5ndGggPT0gMCkgcXVvdGVzID0gUVVPVEVTLnNsaWNlKCk7XG4gIHZhciBxdW90ZUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnF1b3Rlcy5sZW5ndGgpO1xuICB3aGlsZSAoKCdcIicgKyBxdW90ZXNbcXVvdGVJbmRleF0gKyAnXCInKSA9PSAkKCcjJyArIHF1b3RlSUQpLmh0bWwoKSkge1xuICAgIHF1b3RlSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcXVvdGVzLmxlbmd0aCk7XG4gIH1cbiAgdmFyIHF1b3RlID0gcXVvdGVzW3F1b3RlSW5kZXhdO1xuICBxdW90ZXMuc3BsaWNlKHF1b3RlSW5kZXgsIDEpO1xuICAkKCcjJyArIHF1b3RlSUQpLmZhZGVPdXQoJ3Nsb3cnLCBmdW5jdGlvbigpIHtcbiAgICAkKCcjJyArIHF1b3RlSUQpLmh0bWwoJ1wiJyArIHF1b3RlICsgJ1wiJykuZmFkZUluKCdzbG93Jyk7XG4gIH0pO1xuICBzZXRUaW1lb3V0KHNodWZmbGVRdW90ZSwgUVVPVEVfVElNRSAqIDEwMDApO1xufVxuc2V0VGltZW91dChzaHVmZmxlUXVvdGUsIFFVT1RFX1RJTUUgKiAxMDAwKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

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