(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Void"] = factory();
	else
		root["Void"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _core = __webpack_require__(1);

	Object.defineProperty(exports, "init", {
	  enumerable: true,
	  get: function get() {
	    return _core.init;
	  }
	});

	var _utils = __webpack_require__(2);

	Object.defineProperty(exports, "annotate", {
	  enumerable: true,
	  get: function get() {
	    return _utils.annotate;
	  }
	});
	Object.defineProperty(exports, "curry", {
	  enumerable: true,
	  get: function get() {
	    return _utils.curry;
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.init = undefined;

	var _utils = __webpack_require__(2);

	if (true) var _require = __webpack_require__(3),
	        logDiff = _require.logDiff; // eslint-disable-line no-var

	var init = exports.init = function init(config) {
	    var model = config.model;
	    var view = config.view,
	        render = config.render;


	    var $ = (0, _utils.curry)(function (fn, data) {
	        var patch = fn((0, _utils.deepFreeze)(model), data, (0, _utils.curry)(function (fn, data) {
	            return setTimeout($, 0, fn, data);
	        }));
	        var newModel = (0, _utils.merge)(model, patch);
	        if (newModel === model) return;

	        if (true) {
	            if (window._DIFF_) logDiff(model, newModel);else console.log("NEW MODEL:", newModel); // eslint-disable-line no-console
	        }

	        model = newModel;
	        render(view((0, _utils.deepFreeze)(model), function (fn) {
	            return $(fn);
	        }));
	    });

	    render(view((0, _utils.deepFreeze)(model), function (fn) {
	        return $(fn);
	    }));
	    return $;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _curry = function _curry(arity, fn) {
	    return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return args.length < arity ? _curry(arity - args.length, function () {
	            for (var _len2 = arguments.length, nextArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                nextArgs[_key2] = arguments[_key2];
	            }

	            return fn.apply(undefined, args.concat(nextArgs));
	        }) : fn.apply(undefined, args);
	    };
	};
	var curry = exports.curry = function curry(fn) {
	    return _curry(fn.length, fn);
	};

	var deepFreeze = exports.deepFreeze = function deepFreeze(obj) {
	    if (true) {
	        var propNames = Object.getOwnPropertyNames(obj);
	        propNames.forEach(function (name) {
	            var prop = obj[name];
	            if ((typeof prop === "undefined" ? "undefined" : _typeof(prop)) == "object" && prop !== null) deepFreeze(prop);
	        });
	        return Object.freeze(obj);
	    }

	    return obj;
	};

	var _checkNotPlainObj = function _checkNotPlainObj(obj) {
	    return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object" || obj === null || Array.isArray(obj) || obj instanceof RegExp;
	};
	var merge = exports.merge = function merge(model, patch) {
	    if (_checkNotPlainObj(model) || _checkNotPlainObj(patch)) return patch;

	    var patchKeys = Object.keys(patch);
	    if (patchKeys.length === 0) return model;

	    var newModel = _extends({}, model);
	    return patchKeys.reduce(function (model, key) {
	        model[key] = merge(model[key], patch[key]);
	        return model;
	    }, newModel);
	};

	var annotate = exports.annotate = function annotate(descr, fn) {
	    if (true) return function () {
	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	            args[_key3] = arguments[_key3];
	        }

	        /* eslint-disable no-console */
	        console.group(descr);
	        console.time(descr);
	        console.log("ARGUMENTS", args);
	        var ret = fn.apply(undefined, args);
	        console.log("RET", ret);
	        console.timeEnd(descr);
	        console.groupEnd(descr);
	        /* eslint-enable no-console */
	        return ret;
	    };
	    return fn;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.logDiff = undefined;

	var _objectdiff = __webpack_require__(4);

	var _objectdiff2 = _interopRequireDefault(_objectdiff);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var diff = _objectdiff2.default.diff;


	var diffForConsole = function diffForConsole(changes) {
	    var _depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    var styles = [];
	    var INDENT = 4;
	    var DEL = "color: red;";
	    var INS = "color: green;";
	    var RST = "color: black;";

	    var properties = [];

	    var diff = changes.value;
	    if (changes.changed == "equal") {
	        return { properties: "NO CHANGE", styles: [] };
	    }

	    var indent = function indent(depth) {
	        return Array.from(new Array(depth * INDENT)).map(function () {
	            return " ";
	        }).join("");
	    };

	    var stringify = function stringify(val) {
	        var lines = JSON.stringify(val, null, 4).split("\n");
	        return lines.map(function (line, idx) {
	            return idx === 0 ? line : indent(_depth + 1) + line;
	        }).join("\n");
	    };

	    Object.keys(diff).forEach(function (key) {
	        var changed = diff[key].changed;

	        switch (changed) {
	            case "equal":
	                properties.push(key + ": " + stringify(diff[key].value) + ",");
	                break;

	            case "removed":
	                properties.push("%c" + key + ": " + stringify(diff[key].value) + ",%c");
	                styles.push(DEL, RST);
	                break;

	            case "added":
	                properties.push("%c" + key + ": " + stringify(diff[key].value) + ",%c");
	                styles.push(INS, RST);
	                break;

	            case "primitive change":
	                {
	                    var prefix = key + ": ";
	                    properties.push("%c" + prefix + stringify(diff[key].removed) + ",%c");
	                    styles.push(DEL, RST);
	                    properties.push("%c" + prefix + stringify(diff[key].added) + ",%c");
	                    styles.push(INS, RST);
	                    break;
	                }

	            case "object change":
	                {
	                    var _diffForConsole = diffForConsole(diff[key], _depth + 1),
	                        subProperties = _diffForConsole.properties,
	                        subStyles = _diffForConsole.styles;

	                    properties.push(key + ": " + subProperties);
	                    styles = styles.concat(subStyles);
	                    break;
	                }
	        }
	    });

	    return {
	        properties: " {\n" + properties.map(function (str) {
	            return indent(_depth + 1) + str;
	        }).join("\n") + "\n" + indent(_depth) + "},",
	        styles: styles
	    };
	};

	var logDiff = exports.logDiff = function logDiff(prev, next) {
	    var _console;

	    var _diffForConsole2 = diffForConsole(diff(prev, next)),
	        properties = _diffForConsole2.properties,
	        styles = _diffForConsole2.styles;

	    (_console = console).log.apply(_console, [properties].concat(_toConsumableArray(styles))); // eslint-disable-line no-console
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var objectDiff =  true ? exports : {};

	/**
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object}
	 */
	objectDiff.diff = function diff(a, b) {

		if (a === b) {
			return {
				changed: 'equal',
				value: a
			}
		}

		var value = {};
		var equal = true;

		for (var key in a) {
			if (key in b) {
				if (a[key] === b[key]) {
					value[key] = {
						changed: 'equal',
						value: a[key]
					}
				} else {
					var typeA = typeof a[key];
					var typeB = typeof b[key];
					if (a[key] && b[key] && (typeA == 'object' || typeA == 'function') && (typeB == 'object' || typeB == 'function')) {
						var valueDiff = diff(a[key], b[key]);
						if (valueDiff.changed == 'equal') {
							value[key] = {
								changed: 'equal',
								value: a[key]
							}
						} else {
							equal = false;
							value[key] = valueDiff;
						}
					} else {
						equal = false;
						value[key] = {
							changed: 'primitive change',
							removed: a[key],
							added: b[key]
						}
					}
				}
			} else {
				equal = false;
				value[key] = {
					changed: 'removed',
					value: a[key]
				}
			}
		}

		for (key in b) {
			if (!(key in a)) {
				equal = false;
				value[key] = {
					changed: 'added',
					value: b[key]
				}
			}
		}

		if (equal) {
			return {
				changed: 'equal',
				value: a
			}
		} else {
			return {
				changed: 'object change',
				value: value
			}
		}
	};


	/**
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object}
	 */
	objectDiff.diffOwnProperties = function diffOwnProperties(a, b) {

		if (a === b) {
			return {
				changed: 'equal',
				value: a
			}
		}

		var diff = {};
		var equal = true;
		var keys = Object.keys(a);

		for (var i = 0, length = keys.length; i < length; i++) {
			var key = keys[i];
			if (b.hasOwnProperty(key)) {
				if (a[key] === b[key]) {
					diff[key] = {
						changed: 'equal',
						value: a[key]
					}
				} else {
					var typeA = typeof a[key];
					var typeB = typeof b[key];
					if (a[key] && b[key] && (typeA == 'object' || typeA == 'function') && (typeB == 'object' || typeB == 'function')) {
						var valueDiff = diffOwnProperties(a[key], b[key]);
						if (valueDiff.changed == 'equal') {
							diff[key] = {
								changed: 'equal',
								value: a[key]
							}
						} else {
							equal = false;
							diff[key] = valueDiff;
						}
					} else {
						equal = false;
						diff[key] = {
							changed: 'primitive change',
							removed: a[key],
							added: b[key]
						}
					}
				}
			} else {
				equal = false;
				diff[key] = {
					changed: 'removed',
					value: a[key]
				}
			}
		}

		keys = Object.keys(b);

		for (i = 0, length = keys.length; i < length; i++) {
			key = keys[i];
			if (!a.hasOwnProperty(key)) {
				equal = false;
				diff[key] = {
					changed: 'added',
					value: b[key]
				}
			}
		}

		if (equal) {
			return {
				value: a,
				changed: 'equal'
			}
		} else {
			return {
				changed: 'object change',
				value: diff
			}
		}
	};


	(function() {

		/**
		 * @param {Object} changes
		 * @return {string}
		 */
		objectDiff.convertToXMLString = function convertToXMLString(changes) {
			var properties = [];

			var diff = changes.value;
			if (changes.changed == 'equal') {
				return inspect(diff);
			}

			for (var key in diff) {
				var changed = diff[key].changed;
				switch (changed) {
					case 'equal':
						properties.push(stringifyObjectKey(escapeHTML(key)) + '<span>: </span>' + inspect(diff[key].value));
						break;

					case 'removed':
						properties.push('<del class="diff">' + stringifyObjectKey(escapeHTML(key)) + '<span>: </span>' + inspect(diff[key].value) + '</del>');
						break;

					case 'added':
						properties.push('<ins class="diff">' + stringifyObjectKey(escapeHTML(key)) + '<span>: </span>' + inspect(diff[key].value) + '</ins>');
						break;

					case 'primitive change':
						var prefix = stringifyObjectKey(escapeHTML(key)) + '<span>: </span>';
						properties.push(
							'<del class="diff diff-key">' + prefix + inspect(diff[key].removed) + '</del><span>,</span>\n' +
							'<ins class="diff diff-key">' + prefix + inspect(diff[key].added) + '</ins>');
						break;

					case 'object change':
						properties.push(stringifyObjectKey(key) + '<span>: </span>' + convertToXMLString(diff[key]));
						break;
				}
			}

			return '<span>{</span>\n<div class="diff-level">' + properties.join('<span>,</span>\n') + '\n</div><span>}</span>';
		};

		/**
		 * @param {string} key
		 * @return {string}
		 */
		function stringifyObjectKey(key) {
			return /^[a-z0-9_$]*$/i.test(key) ?
				key :
				JSON.stringify(key);
		}

		/**
		 * @param {string} string
		 * @return {string}
		 */
		function escapeHTML(string) {
			return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		}

		/**
		 * @param {Object} obj
		 * @return {string}
		 */
		function inspect(obj) {

			return _inspect('', obj);

			/**
			 * @param {string} accumulator
			 * @param {object} obj
			 * @see http://jsperf.com/continuation-passing-style/3
			 * @return {string}
			 */
			function _inspect(accumulator, obj) {
				switch(typeof obj) {
					case 'object':
						if (!obj) {
							accumulator += 'null';
							break;
						}
						var keys = Object.keys(obj);
						var length = keys.length;
						if (length === 0) {
							accumulator += '<span>{}</span>';
						} else {
							accumulator += '<span>{</span>\n<div class="diff-level">';
							for (var i = 0; i < length; i++) {
								var key = keys[i];
								accumulator = _inspect(accumulator + stringifyObjectKey(escapeHTML(key)) + '<span>: </span>', obj[key]);
								if (i < length - 1) {
									accumulator += '<span>,</span>\n';
								}
							}
							accumulator += '\n</div><span>}</span>'
						}
						break;

					case 'string':
						accumulator += JSON.stringify(escapeHTML(obj));
						break;

					case 'undefined':
						accumulator += 'undefined';
						break;

					default:
						accumulator += escapeHTML(String(obj));
						break;
				}
				return accumulator;
			}
		}
	})();


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9pZC5kZXYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxN2Q1NjA1ZmU5NWRiODNmMDEyNiIsIndlYnBhY2s6Ly8vLi9lbnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9jb3JlLmpzIiwid2VicGFjazovLy8uL3V0aWxzLmpzIiwid2VicGFjazovLy8uL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9vYmplY3RkaWZmL29iamVjdERpZmYuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiVm9pZFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJWb2lkXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE3ZDU2MDVmZTk1ZGI4M2YwMTI2IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY29yZSA9IHJlcXVpcmUoXCJjb3JlLmpzXCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpbml0XCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9jb3JlLmluaXQ7XG4gIH1cbn0pO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZShcInV0aWxzLmpzXCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhbm5vdGF0ZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfdXRpbHMuYW5ub3RhdGU7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY3VycnlcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3V0aWxzLmN1cnJ5O1xuICB9XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2VudHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmluaXQgPSB1bmRlZmluZWQ7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKFwidXRpbHMuanNcIik7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHZhciBfcmVxdWlyZSA9IHJlcXVpcmUoXCJsb2cuanNcIiksXG4gICAgICAgIGxvZ0RpZmYgPSBfcmVxdWlyZS5sb2dEaWZmOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXZhclxuXG52YXIgaW5pdCA9IGV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uIGluaXQoY29uZmlnKSB7XG4gICAgdmFyIG1vZGVsID0gY29uZmlnLm1vZGVsO1xuICAgIHZhciB2aWV3ID0gY29uZmlnLnZpZXcsXG4gICAgICAgIHJlbmRlciA9IGNvbmZpZy5yZW5kZXI7XG5cblxuICAgIHZhciAkID0gKDAsIF91dGlscy5jdXJyeSkoZnVuY3Rpb24gKGZuLCBkYXRhKSB7XG4gICAgICAgIHZhciBwYXRjaCA9IGZuKCgwLCBfdXRpbHMuZGVlcEZyZWV6ZSkobW9kZWwpLCBkYXRhLCAoMCwgX3V0aWxzLmN1cnJ5KShmdW5jdGlvbiAoZm4sIGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCQsIDAsIGZuLCBkYXRhKTtcbiAgICAgICAgfSkpO1xuICAgICAgICB2YXIgbmV3TW9kZWwgPSAoMCwgX3V0aWxzLm1lcmdlKShtb2RlbCwgcGF0Y2gpO1xuICAgICAgICBpZiAobmV3TW9kZWwgPT09IG1vZGVsKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5fRElGRl8pIGxvZ0RpZmYobW9kZWwsIG5ld01vZGVsKTtlbHNlIGNvbnNvbGUubG9nKFwiTkVXIE1PREVMOlwiLCBuZXdNb2RlbCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICB9XG5cbiAgICAgICAgbW9kZWwgPSBuZXdNb2RlbDtcbiAgICAgICAgcmVuZGVyKHZpZXcoKDAsIF91dGlscy5kZWVwRnJlZXplKShtb2RlbCksIGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgcmV0dXJuICQoZm4pO1xuICAgICAgICB9KSk7XG4gICAgfSk7XG5cbiAgICByZW5kZXIodmlldygoMCwgX3V0aWxzLmRlZXBGcmVlemUpKG1vZGVsKSwgZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIHJldHVybiAkKGZuKTtcbiAgICB9KSk7XG4gICAgcmV0dXJuICQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfY3VycnkgPSBmdW5jdGlvbiBfY3VycnkoYXJpdHksIGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJncy5sZW5ndGggPCBhcml0eSA/IF9jdXJyeShhcml0eSAtIGFyZ3MubGVuZ3RoLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIG5leHRBcmdzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICAgICAgICBuZXh0QXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzLmNvbmNhdChuZXh0QXJncykpO1xuICAgICAgICB9KSA6IGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfTtcbn07XG52YXIgY3VycnkgPSBleHBvcnRzLmN1cnJ5ID0gZnVuY3Rpb24gY3VycnkoZm4pIHtcbiAgICByZXR1cm4gX2N1cnJ5KGZuLmxlbmd0aCwgZm4pO1xufTtcblxudmFyIGRlZXBGcmVlemUgPSBleHBvcnRzLmRlZXBGcmVlemUgPSBmdW5jdGlvbiBkZWVwRnJlZXplKG9iaikge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgdmFyIHByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG4gICAgICAgIHByb3BOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IG9ialtuYW1lXTtcbiAgICAgICAgICAgIGlmICgodHlwZW9mIHByb3AgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihwcm9wKSkgPT0gXCJvYmplY3RcIiAmJiBwcm9wICE9PSBudWxsKSBkZWVwRnJlZXplKHByb3ApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5mcmVlemUob2JqKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIF9jaGVja05vdFBsYWluT2JqID0gZnVuY3Rpb24gX2NoZWNrTm90UGxhaW5PYmoob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKSkgIT09IFwib2JqZWN0XCIgfHwgb2JqID09PSBudWxsIHx8IEFycmF5LmlzQXJyYXkob2JqKSB8fCBvYmogaW5zdGFuY2VvZiBSZWdFeHA7XG59O1xudmFyIG1lcmdlID0gZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKG1vZGVsLCBwYXRjaCkge1xuICAgIGlmIChfY2hlY2tOb3RQbGFpbk9iaihtb2RlbCkgfHwgX2NoZWNrTm90UGxhaW5PYmoocGF0Y2gpKSByZXR1cm4gcGF0Y2g7XG5cbiAgICB2YXIgcGF0Y2hLZXlzID0gT2JqZWN0LmtleXMocGF0Y2gpO1xuICAgIGlmIChwYXRjaEtleXMubGVuZ3RoID09PSAwKSByZXR1cm4gbW9kZWw7XG5cbiAgICB2YXIgbmV3TW9kZWwgPSBfZXh0ZW5kcyh7fSwgbW9kZWwpO1xuICAgIHJldHVybiBwYXRjaEtleXMucmVkdWNlKGZ1bmN0aW9uIChtb2RlbCwga2V5KSB7XG4gICAgICAgIG1vZGVsW2tleV0gPSBtZXJnZShtb2RlbFtrZXldLCBwYXRjaFtrZXldKTtcbiAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH0sIG5ld01vZGVsKTtcbn07XG5cbnZhciBhbm5vdGF0ZSA9IGV4cG9ydHMuYW5ub3RhdGUgPSBmdW5jdGlvbiBhbm5vdGF0ZShkZXNjciwgZm4pIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgICAgICAgYXJnc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgICAgICBjb25zb2xlLmdyb3VwKGRlc2NyKTtcbiAgICAgICAgY29uc29sZS50aW1lKGRlc2NyKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJBUkdVTUVOVFNcIiwgYXJncyk7XG4gICAgICAgIHZhciByZXQgPSBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJFVFwiLCByZXQpO1xuICAgICAgICBjb25zb2xlLnRpbWVFbmQoZGVzY3IpO1xuICAgICAgICBjb25zb2xlLmdyb3VwRW5kKGRlc2NyKTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgICByZXR1cm4gZm47XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubG9nRGlmZiA9IHVuZGVmaW5lZDtcblxudmFyIF9vYmplY3RkaWZmID0gcmVxdWlyZShcIm9iamVjdGRpZmZcIik7XG5cbnZhciBfb2JqZWN0ZGlmZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vYmplY3RkaWZmKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbnZhciBkaWZmID0gX29iamVjdGRpZmYyLmRlZmF1bHQuZGlmZjtcblxuXG52YXIgZGlmZkZvckNvbnNvbGUgPSBmdW5jdGlvbiBkaWZmRm9yQ29uc29sZShjaGFuZ2VzKSB7XG4gICAgdmFyIF9kZXB0aCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcblxuICAgIHZhciBzdHlsZXMgPSBbXTtcbiAgICB2YXIgSU5ERU5UID0gNDtcbiAgICB2YXIgREVMID0gXCJjb2xvcjogcmVkO1wiO1xuICAgIHZhciBJTlMgPSBcImNvbG9yOiBncmVlbjtcIjtcbiAgICB2YXIgUlNUID0gXCJjb2xvcjogYmxhY2s7XCI7XG5cbiAgICB2YXIgcHJvcGVydGllcyA9IFtdO1xuXG4gICAgdmFyIGRpZmYgPSBjaGFuZ2VzLnZhbHVlO1xuICAgIGlmIChjaGFuZ2VzLmNoYW5nZWQgPT0gXCJlcXVhbFwiKSB7XG4gICAgICAgIHJldHVybiB7IHByb3BlcnRpZXM6IFwiTk8gQ0hBTkdFXCIsIHN0eWxlczogW10gfTtcbiAgICB9XG5cbiAgICB2YXIgaW5kZW50ID0gZnVuY3Rpb24gaW5kZW50KGRlcHRoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBBcnJheShkZXB0aCAqIElOREVOVCkpLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIgXCI7XG4gICAgICAgIH0pLmpvaW4oXCJcIik7XG4gICAgfTtcblxuICAgIHZhciBzdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkodmFsKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IEpTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgNCkuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgIHJldHVybiBsaW5lcy5tYXAoZnVuY3Rpb24gKGxpbmUsIGlkeCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkeCA9PT0gMCA/IGxpbmUgOiBpbmRlbnQoX2RlcHRoICsgMSkgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhkaWZmKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBkaWZmW2tleV0uY2hhbmdlZDtcblxuICAgICAgICBzd2l0Y2ggKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIGNhc2UgXCJlcXVhbFwiOlxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChrZXkgKyBcIjogXCIgKyBzdHJpbmdpZnkoZGlmZltrZXldLnZhbHVlKSArIFwiLFwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcInJlbW92ZWRcIjpcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2goXCIlY1wiICsga2V5ICsgXCI6IFwiICsgc3RyaW5naWZ5KGRpZmZba2V5XS52YWx1ZSkgKyBcIiwlY1wiKTtcbiAgICAgICAgICAgICAgICBzdHlsZXMucHVzaChERUwsIFJTVCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJhZGRlZFwiOlxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChcIiVjXCIgKyBrZXkgKyBcIjogXCIgKyBzdHJpbmdpZnkoZGlmZltrZXldLnZhbHVlKSArIFwiLCVjXCIpO1xuICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKElOUywgUlNUKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcInByaW1pdGl2ZSBjaGFuZ2VcIjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmVmaXggPSBrZXkgKyBcIjogXCI7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChcIiVjXCIgKyBwcmVmaXggKyBzdHJpbmdpZnkoZGlmZltrZXldLnJlbW92ZWQpICsgXCIsJWNcIik7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKERFTCwgUlNUKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5wdXNoKFwiJWNcIiArIHByZWZpeCArIHN0cmluZ2lmeShkaWZmW2tleV0uYWRkZWQpICsgXCIsJWNcIik7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcy5wdXNoKElOUywgUlNUKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0IGNoYW5nZVwiOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kaWZmRm9yQ29uc29sZSA9IGRpZmZGb3JDb25zb2xlKGRpZmZba2V5XSwgX2RlcHRoICsgMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0aWVzID0gX2RpZmZGb3JDb25zb2xlLnByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJTdHlsZXMgPSBfZGlmZkZvckNvbnNvbGUuc3R5bGVzO1xuXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMucHVzaChrZXkgKyBcIjogXCIgKyBzdWJQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzID0gc3R5bGVzLmNvbmNhdChzdWJTdHlsZXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHByb3BlcnRpZXM6IFwiIHtcXG5cIiArIHByb3BlcnRpZXMubWFwKGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQoX2RlcHRoICsgMSkgKyBzdHI7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIikgKyBcIlxcblwiICsgaW5kZW50KF9kZXB0aCkgKyBcIn0sXCIsXG4gICAgICAgIHN0eWxlczogc3R5bGVzXG4gICAgfTtcbn07XG5cbnZhciBsb2dEaWZmID0gZXhwb3J0cy5sb2dEaWZmID0gZnVuY3Rpb24gbG9nRGlmZihwcmV2LCBuZXh0KSB7XG4gICAgdmFyIF9jb25zb2xlO1xuXG4gICAgdmFyIF9kaWZmRm9yQ29uc29sZTIgPSBkaWZmRm9yQ29uc29sZShkaWZmKHByZXYsIG5leHQpKSxcbiAgICAgICAgcHJvcGVydGllcyA9IF9kaWZmRm9yQ29uc29sZTIucHJvcGVydGllcyxcbiAgICAgICAgc3R5bGVzID0gX2RpZmZGb3JDb25zb2xlMi5zdHlsZXM7XG5cbiAgICAoX2NvbnNvbGUgPSBjb25zb2xlKS5sb2cuYXBwbHkoX2NvbnNvbGUsIFtwcm9wZXJ0aWVzXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHN0eWxlcykpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbG9nLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBvYmplY3REaWZmID0gdHlwZW9mIGV4cG9ydHMgIT0gJ3VuZGVmaW5lZCcgPyBleHBvcnRzIDoge307XG5cbi8qKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbm9iamVjdERpZmYuZGlmZiA9IGZ1bmN0aW9uIGRpZmYoYSwgYikge1xuXG5cdGlmIChhID09PSBiKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNoYW5nZWQ6ICdlcXVhbCcsXG5cdFx0XHR2YWx1ZTogYVxuXHRcdH1cblx0fVxuXG5cdHZhciB2YWx1ZSA9IHt9O1xuXHR2YXIgZXF1YWwgPSB0cnVlO1xuXG5cdGZvciAodmFyIGtleSBpbiBhKSB7XG5cdFx0aWYgKGtleSBpbiBiKSB7XG5cdFx0XHRpZiAoYVtrZXldID09PSBiW2tleV0pIHtcblx0XHRcdFx0dmFsdWVba2V5XSA9IHtcblx0XHRcdFx0XHRjaGFuZ2VkOiAnZXF1YWwnLFxuXHRcdFx0XHRcdHZhbHVlOiBhW2tleV1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIHR5cGVBID0gdHlwZW9mIGFba2V5XTtcblx0XHRcdFx0dmFyIHR5cGVCID0gdHlwZW9mIGJba2V5XTtcblx0XHRcdFx0aWYgKGFba2V5XSAmJiBiW2tleV0gJiYgKHR5cGVBID09ICdvYmplY3QnIHx8IHR5cGVBID09ICdmdW5jdGlvbicpICYmICh0eXBlQiA9PSAnb2JqZWN0JyB8fCB0eXBlQiA9PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0XHRcdHZhciB2YWx1ZURpZmYgPSBkaWZmKGFba2V5XSwgYltrZXldKTtcblx0XHRcdFx0XHRpZiAodmFsdWVEaWZmLmNoYW5nZWQgPT0gJ2VxdWFsJykge1xuXHRcdFx0XHRcdFx0dmFsdWVba2V5XSA9IHtcblx0XHRcdFx0XHRcdFx0Y2hhbmdlZDogJ2VxdWFsJyxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IGFba2V5XVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlcXVhbCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0dmFsdWVba2V5XSA9IHZhbHVlRGlmZjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZXF1YWwgPSBmYWxzZTtcblx0XHRcdFx0XHR2YWx1ZVtrZXldID0ge1xuXHRcdFx0XHRcdFx0Y2hhbmdlZDogJ3ByaW1pdGl2ZSBjaGFuZ2UnLFxuXHRcdFx0XHRcdFx0cmVtb3ZlZDogYVtrZXldLFxuXHRcdFx0XHRcdFx0YWRkZWQ6IGJba2V5XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRlcXVhbCA9IGZhbHNlO1xuXHRcdFx0dmFsdWVba2V5XSA9IHtcblx0XHRcdFx0Y2hhbmdlZDogJ3JlbW92ZWQnLFxuXHRcdFx0XHR2YWx1ZTogYVtrZXldXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Zm9yIChrZXkgaW4gYikge1xuXHRcdGlmICghKGtleSBpbiBhKSkge1xuXHRcdFx0ZXF1YWwgPSBmYWxzZTtcblx0XHRcdHZhbHVlW2tleV0gPSB7XG5cdFx0XHRcdGNoYW5nZWQ6ICdhZGRlZCcsXG5cdFx0XHRcdHZhbHVlOiBiW2tleV1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoZXF1YWwpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y2hhbmdlZDogJ2VxdWFsJyxcblx0XHRcdHZhbHVlOiBhXG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjaGFuZ2VkOiAnb2JqZWN0IGNoYW5nZScsXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9XG5cdH1cbn07XG5cblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xub2JqZWN0RGlmZi5kaWZmT3duUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRpZmZPd25Qcm9wZXJ0aWVzKGEsIGIpIHtcblxuXHRpZiAoYSA9PT0gYikge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjaGFuZ2VkOiAnZXF1YWwnLFxuXHRcdFx0dmFsdWU6IGFcblx0XHR9XG5cdH1cblxuXHR2YXIgZGlmZiA9IHt9O1xuXHR2YXIgZXF1YWwgPSB0cnVlO1xuXHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKGEpO1xuXG5cdGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGtleSA9IGtleXNbaV07XG5cdFx0aWYgKGIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0aWYgKGFba2V5XSA9PT0gYltrZXldKSB7XG5cdFx0XHRcdGRpZmZba2V5XSA9IHtcblx0XHRcdFx0XHRjaGFuZ2VkOiAnZXF1YWwnLFxuXHRcdFx0XHRcdHZhbHVlOiBhW2tleV1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIHR5cGVBID0gdHlwZW9mIGFba2V5XTtcblx0XHRcdFx0dmFyIHR5cGVCID0gdHlwZW9mIGJba2V5XTtcblx0XHRcdFx0aWYgKGFba2V5XSAmJiBiW2tleV0gJiYgKHR5cGVBID09ICdvYmplY3QnIHx8IHR5cGVBID09ICdmdW5jdGlvbicpICYmICh0eXBlQiA9PSAnb2JqZWN0JyB8fCB0eXBlQiA9PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0XHRcdHZhciB2YWx1ZURpZmYgPSBkaWZmT3duUHJvcGVydGllcyhhW2tleV0sIGJba2V5XSk7XG5cdFx0XHRcdFx0aWYgKHZhbHVlRGlmZi5jaGFuZ2VkID09ICdlcXVhbCcpIHtcblx0XHRcdFx0XHRcdGRpZmZba2V5XSA9IHtcblx0XHRcdFx0XHRcdFx0Y2hhbmdlZDogJ2VxdWFsJyxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IGFba2V5XVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlcXVhbCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0ZGlmZltrZXldID0gdmFsdWVEaWZmO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlcXVhbCA9IGZhbHNlO1xuXHRcdFx0XHRcdGRpZmZba2V5XSA9IHtcblx0XHRcdFx0XHRcdGNoYW5nZWQ6ICdwcmltaXRpdmUgY2hhbmdlJyxcblx0XHRcdFx0XHRcdHJlbW92ZWQ6IGFba2V5XSxcblx0XHRcdFx0XHRcdGFkZGVkOiBiW2tleV1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXF1YWwgPSBmYWxzZTtcblx0XHRcdGRpZmZba2V5XSA9IHtcblx0XHRcdFx0Y2hhbmdlZDogJ3JlbW92ZWQnLFxuXHRcdFx0XHR2YWx1ZTogYVtrZXldXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0a2V5cyA9IE9iamVjdC5rZXlzKGIpO1xuXG5cdGZvciAoaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRrZXkgPSBrZXlzW2ldO1xuXHRcdGlmICghYS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRlcXVhbCA9IGZhbHNlO1xuXHRcdFx0ZGlmZltrZXldID0ge1xuXHRcdFx0XHRjaGFuZ2VkOiAnYWRkZWQnLFxuXHRcdFx0XHR2YWx1ZTogYltrZXldXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKGVxdWFsKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiBhLFxuXHRcdFx0Y2hhbmdlZDogJ2VxdWFsJ1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y2hhbmdlZDogJ29iamVjdCBjaGFuZ2UnLFxuXHRcdFx0dmFsdWU6IGRpZmZcblx0XHR9XG5cdH1cbn07XG5cblxuKGZ1bmN0aW9uKCkge1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gY2hhbmdlc1xuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqL1xuXHRvYmplY3REaWZmLmNvbnZlcnRUb1hNTFN0cmluZyA9IGZ1bmN0aW9uIGNvbnZlcnRUb1hNTFN0cmluZyhjaGFuZ2VzKSB7XG5cdFx0dmFyIHByb3BlcnRpZXMgPSBbXTtcblxuXHRcdHZhciBkaWZmID0gY2hhbmdlcy52YWx1ZTtcblx0XHRpZiAoY2hhbmdlcy5jaGFuZ2VkID09ICdlcXVhbCcpIHtcblx0XHRcdHJldHVybiBpbnNwZWN0KGRpZmYpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGtleSBpbiBkaWZmKSB7XG5cdFx0XHR2YXIgY2hhbmdlZCA9IGRpZmZba2V5XS5jaGFuZ2VkO1xuXHRcdFx0c3dpdGNoIChjaGFuZ2VkKSB7XG5cdFx0XHRcdGNhc2UgJ2VxdWFsJzpcblx0XHRcdFx0XHRwcm9wZXJ0aWVzLnB1c2goc3RyaW5naWZ5T2JqZWN0S2V5KGVzY2FwZUhUTUwoa2V5KSkgKyAnPHNwYW4+OiA8L3NwYW4+JyArIGluc3BlY3QoZGlmZltrZXldLnZhbHVlKSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAncmVtb3ZlZCc6XG5cdFx0XHRcdFx0cHJvcGVydGllcy5wdXNoKCc8ZGVsIGNsYXNzPVwiZGlmZlwiPicgKyBzdHJpbmdpZnlPYmplY3RLZXkoZXNjYXBlSFRNTChrZXkpKSArICc8c3Bhbj46IDwvc3Bhbj4nICsgaW5zcGVjdChkaWZmW2tleV0udmFsdWUpICsgJzwvZGVsPicpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ2FkZGVkJzpcblx0XHRcdFx0XHRwcm9wZXJ0aWVzLnB1c2goJzxpbnMgY2xhc3M9XCJkaWZmXCI+JyArIHN0cmluZ2lmeU9iamVjdEtleShlc2NhcGVIVE1MKGtleSkpICsgJzxzcGFuPjogPC9zcGFuPicgKyBpbnNwZWN0KGRpZmZba2V5XS52YWx1ZSkgKyAnPC9pbnM+Jyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAncHJpbWl0aXZlIGNoYW5nZSc6XG5cdFx0XHRcdFx0dmFyIHByZWZpeCA9IHN0cmluZ2lmeU9iamVjdEtleShlc2NhcGVIVE1MKGtleSkpICsgJzxzcGFuPjogPC9zcGFuPic7XG5cdFx0XHRcdFx0cHJvcGVydGllcy5wdXNoKFxuXHRcdFx0XHRcdFx0JzxkZWwgY2xhc3M9XCJkaWZmIGRpZmYta2V5XCI+JyArIHByZWZpeCArIGluc3BlY3QoZGlmZltrZXldLnJlbW92ZWQpICsgJzwvZGVsPjxzcGFuPiw8L3NwYW4+XFxuJyArXG5cdFx0XHRcdFx0XHQnPGlucyBjbGFzcz1cImRpZmYgZGlmZi1rZXlcIj4nICsgcHJlZml4ICsgaW5zcGVjdChkaWZmW2tleV0uYWRkZWQpICsgJzwvaW5zPicpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ29iamVjdCBjaGFuZ2UnOlxuXHRcdFx0XHRcdHByb3BlcnRpZXMucHVzaChzdHJpbmdpZnlPYmplY3RLZXkoa2V5KSArICc8c3Bhbj46IDwvc3Bhbj4nICsgY29udmVydFRvWE1MU3RyaW5nKGRpZmZba2V5XSkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAnPHNwYW4+ezwvc3Bhbj5cXG48ZGl2IGNsYXNzPVwiZGlmZi1sZXZlbFwiPicgKyBwcm9wZXJ0aWVzLmpvaW4oJzxzcGFuPiw8L3NwYW4+XFxuJykgKyAnXFxuPC9kaXY+PHNwYW4+fTwvc3Bhbj4nO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIHN0cmluZ2lmeU9iamVjdEtleShrZXkpIHtcblx0XHRyZXR1cm4gL15bYS16MC05XyRdKiQvaS50ZXN0KGtleSkgP1xuXHRcdFx0a2V5IDpcblx0XHRcdEpTT04uc3RyaW5naWZ5KGtleSk7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqL1xuXHRmdW5jdGlvbiBlc2NhcGVIVE1MKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0ICogQHJldHVybiB7c3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gaW5zcGVjdChvYmopIHtcblxuXHRcdHJldHVybiBfaW5zcGVjdCgnJywgb2JqKTtcblxuXHRcdC8qKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBhY2N1bXVsYXRvclxuXHRcdCAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcblx0XHQgKiBAc2VlIGh0dHA6Ly9qc3BlcmYuY29tL2NvbnRpbnVhdGlvbi1wYXNzaW5nLXN0eWxlLzNcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gX2luc3BlY3QoYWNjdW11bGF0b3IsIG9iaikge1xuXHRcdFx0c3dpdGNoKHR5cGVvZiBvYmopIHtcblx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHRpZiAoIW9iaikge1xuXHRcdFx0XHRcdFx0YWNjdW11bGF0b3IgKz0gJ251bGwnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblx0XHRcdFx0XHR2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cdFx0XHRcdFx0aWYgKGxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0YWNjdW11bGF0b3IgKz0gJzxzcGFuPnt9PC9zcGFuPic7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFjY3VtdWxhdG9yICs9ICc8c3Bhbj57PC9zcGFuPlxcbjxkaXYgY2xhc3M9XCJkaWZmLWxldmVsXCI+Jztcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGtleSA9IGtleXNbaV07XG5cdFx0XHRcdFx0XHRcdGFjY3VtdWxhdG9yID0gX2luc3BlY3QoYWNjdW11bGF0b3IgKyBzdHJpbmdpZnlPYmplY3RLZXkoZXNjYXBlSFRNTChrZXkpKSArICc8c3Bhbj46IDwvc3Bhbj4nLCBvYmpba2V5XSk7XG5cdFx0XHRcdFx0XHRcdGlmIChpIDwgbGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdFx0XHRcdGFjY3VtdWxhdG9yICs9ICc8c3Bhbj4sPC9zcGFuPlxcbic7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGFjY3VtdWxhdG9yICs9ICdcXG48L2Rpdj48c3Bhbj59PC9zcGFuPidcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdFx0XHRhY2N1bXVsYXRvciArPSBKU09OLnN0cmluZ2lmeShlc2NhcGVIVE1MKG9iaikpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ3VuZGVmaW5lZCc6XG5cdFx0XHRcdFx0YWNjdW11bGF0b3IgKz0gJ3VuZGVmaW5lZCc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRhY2N1bXVsYXRvciArPSBlc2NhcGVIVE1MKFN0cmluZyhvYmopKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHJldHVybiBhY2N1bXVsYXRvcjtcblx0XHR9XG5cdH1cbn0pKCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L29iamVjdGRpZmYvb2JqZWN0RGlmZi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OzsiLCJzb3VyY2VSb290IjoiIn0=