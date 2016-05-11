/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Haystack = __webpack_require__(1);

	var _Haystack2 = _interopRequireDefault(_Haystack);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.onerror = _Haystack2.default.onWindowError;

	window.Haystack = _Haystack2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BASE_URL = 'https://haystack-api.herokuapp.com';
	var configuration = {
	  token: null,
	  projectName: null
	};
	var userAgent = window.navigator.userAgent;

	function onWindowError(message, source, lineno, colno, error) {
	  if (!configuration.token) {
	    console.log('Whoops! Looks like you imported the script but did\'t configure it with a token.');
	    console.log('Try Haystack.configure({ token: <Your given token>, projectName: "Error free project" });');
	    throw new Error('Haystack not configured with a token.');
	  }

	  if (!configuration.projectName) {
	    console.log('Whoops! Looks like you imported the script but did\'t configure it with a projectName.');
	    console.log('Try Haystack.configure({ token: <Your given token>, projectName: "Error free project" });');
	    throw new Error('Haystack not configured with a projectName.');
	  }

	  fetch(BASE_URL + '/errors', {
	    method: 'post',
	    headers: {
	      'Access-Control-Allow-Origin': '*',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
	      message: message,
	      projectName: configuration.projectName,
	      stacktrace: error.stack,
	      token: configuration.token,
	      userAgent: userAgent
	    })
	  }).then(function (response) {
	    console.log('Error logging worked!');
	  }).catch(function (err) {
	    console.log('Error trying to talk to haystack servers');
	  });
	}

	exports.default = {
	  configure: function configure(options) {
	    configuration = Object.assign(configuration, options);
	  },


	  onWindowError: onWindowError,

	  testError: function testError() {
	    var err = new Error('Haystack test error');
	    err.stack = 'Here is a super legit stacktrace';

	    onWindowError('Howdy! Here is a test error', null, null, null, err);
	  }
	};

/***/ }
/******/ ]);