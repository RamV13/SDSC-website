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

eval("__webpack_require__(/*! ./mystyles.scss */ \"./src/mystyles.scss\");\nvar $ = __webpack_require__(/*! jquery */ \"jquery\");\n\n// Navbar Management\n\n$('.burger').click(function() {\n  $('.burger').toggleClass('is-active');\n  $('#'+this.dataset.target).toggleClass('is-active');\n});\n\n// Page Navigation Management\n\nconst homeID = 'home';\nconst contentID = 'content';\n// mapping between navbar items and page HTML\nvar navMap = {\n  'home': '',\n  'about': '',\n  'events': '',\n  'contact': '',\n  'join': ''\n};\n\n// initialize home HTML once the page is rendered\n$(function() {\n  navMap[homeID] = $('#' + contentID).html();\n});\n\n// linking navbar items to their respective page HTML\nObject.keys(navMap).forEach(function(navButtonID) {\n  // prefetch HTML for each page\n  if (navButtonID != homeID) { // home HTML is already embedded in index.html\n    var link = $(this).attr('href');\n    $.get($('#' + navButtonID).attr('href'),\n      function(data) {\n        navMap[navButtonID] = data;\n      }, \n      'html'\n    );\n  }\n\n  // register click callbacks that render corresponding page HTML\n  $('#' + navButtonID).click(function() {\n    $('#' + contentID).fadeOut(function() {\n      if (navMap[navButtonID]) {\n        $('#' + contentID).html(navMap[navButtonID]).fadeIn();\n      } else {\n        // TODO(ramv13): loading progressbar with timeout\n      }\n    });\n    return false;\n  });\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuL215c3R5bGVzLnNjc3MnKTtcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIE5hdmJhciBNYW5hZ2VtZW50XG5cbiQoJy5idXJnZXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCgnLmJ1cmdlcicpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgJCgnIycrdGhpcy5kYXRhc2V0LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xufSk7XG5cbi8vIFBhZ2UgTmF2aWdhdGlvbiBNYW5hZ2VtZW50XG5cbmNvbnN0IGhvbWVJRCA9ICdob21lJztcbmNvbnN0IGNvbnRlbnRJRCA9ICdjb250ZW50Jztcbi8vIG1hcHBpbmcgYmV0d2VlbiBuYXZiYXIgaXRlbXMgYW5kIHBhZ2UgSFRNTFxudmFyIG5hdk1hcCA9IHtcbiAgJ2hvbWUnOiAnJyxcbiAgJ2Fib3V0JzogJycsXG4gICdldmVudHMnOiAnJyxcbiAgJ2NvbnRhY3QnOiAnJyxcbiAgJ2pvaW4nOiAnJ1xufTtcblxuLy8gaW5pdGlhbGl6ZSBob21lIEhUTUwgb25jZSB0aGUgcGFnZSBpcyByZW5kZXJlZFxuJChmdW5jdGlvbigpIHtcbiAgbmF2TWFwW2hvbWVJRF0gPSAkKCcjJyArIGNvbnRlbnRJRCkuaHRtbCgpO1xufSk7XG5cbi8vIGxpbmtpbmcgbmF2YmFyIGl0ZW1zIHRvIHRoZWlyIHJlc3BlY3RpdmUgcGFnZSBIVE1MXG5PYmplY3Qua2V5cyhuYXZNYXApLmZvckVhY2goZnVuY3Rpb24obmF2QnV0dG9uSUQpIHtcbiAgLy8gcHJlZmV0Y2ggSFRNTCBmb3IgZWFjaCBwYWdlXG4gIGlmIChuYXZCdXR0b25JRCAhPSBob21lSUQpIHsgLy8gaG9tZSBIVE1MIGlzIGFscmVhZHkgZW1iZWRkZWQgaW4gaW5kZXguaHRtbFxuICAgIHZhciBsaW5rID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgJC5nZXQoJCgnIycgKyBuYXZCdXR0b25JRCkuYXR0cignaHJlZicpLFxuICAgICAgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBuYXZNYXBbbmF2QnV0dG9uSURdID0gZGF0YTtcbiAgICAgIH0sIFxuICAgICAgJ2h0bWwnXG4gICAgKTtcbiAgfVxuXG4gIC8vIHJlZ2lzdGVyIGNsaWNrIGNhbGxiYWNrcyB0aGF0IHJlbmRlciBjb3JyZXNwb25kaW5nIHBhZ2UgSFRNTFxuICAkKCcjJyArIG5hdkJ1dHRvbklEKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKCcjJyArIGNvbnRlbnRJRCkuZmFkZU91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChuYXZNYXBbbmF2QnV0dG9uSURdKSB7XG4gICAgICAgICQoJyMnICsgY29udGVudElEKS5odG1sKG5hdk1hcFtuYXZCdXR0b25JRF0pLmZhZGVJbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyhyYW12MTMpOiBsb2FkaW5nIHByb2dyZXNzYmFyIHdpdGggdGltZW91dFxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

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