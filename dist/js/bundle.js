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

eval("__webpack_require__(/*! ./mystyles.scss */ \"./src/mystyles.scss\");\nvar $ = __webpack_require__(/*! jquery */ \"jquery\");\n\n// Navbar Management\n\n$('.burger').click(function() {\n  $('.burger').toggleClass('is-active');\n  $('#'+this.dataset.target).toggleClass('is-active');\n});\n\n// Page Navigation Management\n\n// TODO(ramvellanki): implement URL history to support browser navigation\n\nconst homeID = 'home';\nconst contentID = 'content';\n// mapping between navbar items and page HTML\nvar navMap = {\n  'home': '',\n  'about': '',\n  'events': '',\n  'contact': '',\n  'join': ''\n};\n\n// initialize home HTML once the page is rendered\n$(function() {\n  navMap[homeID] = $('#' + contentID).html();\n});\n\n// linking navbar items to their respective page HTML\nObject.keys(navMap).forEach(function(navButtonID) {\n  // prefetch HTML for each page\n  if (navButtonID != homeID) { // home HTML is already embedded in index.html\n    var link = $(this).attr('href');\n    $.get($('#' + navButtonID).attr('href'),\n      function(data) {\n        navMap[navButtonID] = data;\n      }, \n      'html'\n    );\n  }\n\n  // register click callbacks that render corresponding page HTML\n  $('#' + navButtonID).click(function() {\n    $('#' + contentID).fadeOut(function() {\n      if (navMap[navButtonID]) {\n        $('#' + contentID).html(navMap[navButtonID]).fadeIn();\n      } else {\n        // TODO(ramv13): loading progressbar with timeout\n      }\n    });\n    return false;\n  });\n});\n\n// Quote Bank Management\n\nconst quoteID = 'quote';\nconst QUOTE_TIME = 15; // (s)\nconst QUOTES = [\n  'Love All, Serve All',\n  'Help Ever, Hurt Never',\n  'Hands that serve are holier than lips that pray',\n  'There is only one religion, the religion of love',\n  'Service to man is service to God'\n];\nvar quotes = QUOTES.slice(1,5);\n\nfunction shuffleQuote() {\n  if (quotes.length == 0) quotes = QUOTES.slice();\n  var quoteIndex = Math.floor(Math.random()*quotes.length);\n  while (('\"' + quotes[quoteIndex] + '\"') == $('#' + quoteID).html()) {\n    quoteIndex = Math.floor(Math.random()*quotes.length);\n  }\n  var quote = quotes[quoteIndex];\n  quotes.splice(quoteIndex, 1);\n  $('#' + quoteID).fadeOut('slow', function() {\n    $('#' + quoteID).html('\"' + quote + '\"').fadeIn('slow');\n  });\n  setTimeout(shuffleQuote, QUOTE_TIME * 1000);\n}\nsetTimeout(shuffleQuote, QUOTE_TIME * 1000);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuL215c3R5bGVzLnNjc3MnKTtcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIE5hdmJhciBNYW5hZ2VtZW50XG5cbiQoJy5idXJnZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCgnLmJ1cmdlcicpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgJCgnIycrdGhpcy5kYXRhc2V0LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xufSk7XG5cbi8vIFBhZ2UgTmF2aWdhdGlvbiBNYW5hZ2VtZW50XG5cbi8vIFRPRE8ocmFtdmVsbGFua2kpOiBpbXBsZW1lbnQgVVJMIGhpc3RvcnkgdG8gc3VwcG9ydCBicm93c2VyIG5hdmlnYXRpb25cblxuY29uc3QgaG9tZUlEID0gJ2hvbWUnO1xuY29uc3QgY29udGVudElEID0gJ2NvbnRlbnQnO1xuLy8gbWFwcGluZyBiZXR3ZWVuIG5hdmJhciBpdGVtcyBhbmQgcGFnZSBIVE1MXG52YXIgbmF2TWFwID0ge1xuICAnaG9tZSc6ICcnLFxuICAnYWJvdXQnOiAnJyxcbiAgJ2V2ZW50cyc6ICcnLFxuICAnY29udGFjdCc6ICcnLFxuICAnam9pbic6ICcnXG59O1xuXG4vLyBpbml0aWFsaXplIGhvbWUgSFRNTCBvbmNlIHRoZSBwYWdlIGlzIHJlbmRlcmVkXG4kKGZ1bmN0aW9uKCkge1xuICBuYXZNYXBbaG9tZUlEXSA9ICQoJyMnICsgY29udGVudElEKS5odG1sKCk7XG59KTtcblxuLy8gbGlua2luZyBuYXZiYXIgaXRlbXMgdG8gdGhlaXIgcmVzcGVjdGl2ZSBwYWdlIEhUTUxcbk9iamVjdC5rZXlzKG5hdk1hcCkuZm9yRWFjaChmdW5jdGlvbihuYXZCdXR0b25JRCkge1xuICAvLyBwcmVmZXRjaCBIVE1MIGZvciBlYWNoIHBhZ2VcbiAgaWYgKG5hdkJ1dHRvbklEICE9IGhvbWVJRCkgeyAvLyBob21lIEhUTUwgaXMgYWxyZWFkeSBlbWJlZGRlZCBpbiBpbmRleC5odG1sXG4gICAgdmFyIGxpbmsgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAkLmdldCgkKCcjJyArIG5hdkJ1dHRvbklEKS5hdHRyKCdocmVmJyksXG4gICAgICBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIG5hdk1hcFtuYXZCdXR0b25JRF0gPSBkYXRhO1xuICAgICAgfSwgXG4gICAgICAnaHRtbCdcbiAgICApO1xuICB9XG5cbiAgLy8gcmVnaXN0ZXIgY2xpY2sgY2FsbGJhY2tzIHRoYXQgcmVuZGVyIGNvcnJlc3BvbmRpbmcgcGFnZSBIVE1MXG4gICQoJyMnICsgbmF2QnV0dG9uSUQpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoJyMnICsgY29udGVudElEKS5mYWRlT3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKG5hdk1hcFtuYXZCdXR0b25JRF0pIHtcbiAgICAgICAgJCgnIycgKyBjb250ZW50SUQpLmh0bWwobmF2TWFwW25hdkJ1dHRvbklEXSkuZmFkZUluKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPKHJhbXYxMyk6IGxvYWRpbmcgcHJvZ3Jlc3NiYXIgd2l0aCB0aW1lb3V0XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn0pO1xuXG4vLyBRdW90ZSBCYW5rIE1hbmFnZW1lbnRcblxuY29uc3QgcXVvdGVJRCA9ICdxdW90ZSc7XG5jb25zdCBRVU9URV9USU1FID0gMTU7IC8vIChzKVxuY29uc3QgUVVPVEVTID0gW1xuICAnTG92ZSBBbGwsIFNlcnZlIEFsbCcsXG4gICdIZWxwIEV2ZXIsIEh1cnQgTmV2ZXInLFxuICAnSGFuZHMgdGhhdCBzZXJ2ZSBhcmUgaG9saWVyIHRoYW4gbGlwcyB0aGF0IHByYXknLFxuICAnVGhlcmUgaXMgb25seSBvbmUgcmVsaWdpb24sIHRoZSByZWxpZ2lvbiBvZiBsb3ZlJyxcbiAgJ1NlcnZpY2UgdG8gbWFuIGlzIHNlcnZpY2UgdG8gR29kJ1xuXTtcbnZhciBxdW90ZXMgPSBRVU9URVMuc2xpY2UoMSw1KTtcblxuZnVuY3Rpb24gc2h1ZmZsZVF1b3RlKCkge1xuICBpZiAocXVvdGVzLmxlbmd0aCA9PSAwKSBxdW90ZXMgPSBRVU9URVMuc2xpY2UoKTtcbiAgdmFyIHF1b3RlSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcXVvdGVzLmxlbmd0aCk7XG4gIHdoaWxlICgoJ1wiJyArIHF1b3Rlc1txdW90ZUluZGV4XSArICdcIicpID09ICQoJyMnICsgcXVvdGVJRCkuaHRtbCgpKSB7XG4gICAgcXVvdGVJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpxdW90ZXMubGVuZ3RoKTtcbiAgfVxuICB2YXIgcXVvdGUgPSBxdW90ZXNbcXVvdGVJbmRleF07XG4gIHF1b3Rlcy5zcGxpY2UocXVvdGVJbmRleCwgMSk7XG4gICQoJyMnICsgcXVvdGVJRCkuZmFkZU91dCgnc2xvdycsIGZ1bmN0aW9uKCkge1xuICAgICQoJyMnICsgcXVvdGVJRCkuaHRtbCgnXCInICsgcXVvdGUgKyAnXCInKS5mYWRlSW4oJ3Nsb3cnKTtcbiAgfSk7XG4gIHNldFRpbWVvdXQoc2h1ZmZsZVF1b3RlLCBRVU9URV9USU1FICogMTAwMCk7XG59XG5zZXRUaW1lb3V0KHNodWZmbGVRdW90ZSwgUVVPVEVfVElNRSAqIDEwMDApO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

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