(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["kui"] = factory();
	else
		root["kui"] = factory();
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
/******/ 	__webpack_require__.p = "dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1);
	var DatePicker = __webpack_require__(2);
	var AutoParse = __webpack_require__(8);

	module.exports = {
	  Component: Component,
	  AutoParse: AutoParse
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Base = K.Base,
	    _ = K._;

	var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	var Component = Base.extend({
	  $el: null,
	  tmp: null,
	  initialize: function() {
	    this.cid = _.uniqueId('component');
	    this.delegateEvents();
	    this.isRender = false;
	  },
	  render: function(parentEl) {
	    if(this.isRender) {
	      this.show();
	      return this;
	    }
	    //如果没有templete则认为不需要渲染
	    if(!this.template) {
	      this.renderAfter();
	      return;
	    }
	    if(!parentEl) {
	      if(this.target) {
	        parentEl = this.target.parentNode;
	      } else {
	        parentEl = document.body || document.documentElement;
	      }
	    }
	    parentEl = this.$parentEl = $(parentEl);
	    if(this.position) {
	      this.$el.css({'left': this.position.x, 'top': this.position.y});
	    }
	    this.$el.html('loading...')
	    parentEl.append(this.$el);
	    this.show();
	    this._model();
	  },
	  _model: function() {
	    var self = this;
	    if(this.model && _.isFunction(this.model)) {
	      //是一个promise
	      if(this.model.then) {
	        this.model.then(function(data) {
	          self._modelAfter(data);
	        }, function(err) {

	        });
	      } else {
	        this._modelAfter(this.model());
	      }
	    } else {
	      this._modelAfter(this.model);
	    }
	  },
	  _modelAfter: function(data) {
	    if(this.modelAfter && _.isFunction(this.modelAfter)) {
	      data = this.modelAfter(data);
	    }
	    if(data) {
	      this.setContent(data);
	    }
	    this.isRender = true;
	    this.renderAfter();
	  },
	  delegateEvents: function() {
	    var events = this.events;
	    if(!events) return this;
	    this.undelegateEvents();
	    for (var key in events) {
	      var method = events[key];
	      if (!_.isFunction(method)) method = this[events[key]];
	      if (!method) continue;

	      var match = key.match(delegateEventSplitter);
	      var eventName = match[1],
	          selector = match[2];
	          method = _.bind(method, this);
	      eventName += '.delegateEvents' + this.cid;
	      if (selector === '') {
	        this.$el.on(eventName, method);
	      } else {
	        this.$el.on(eventName, selector, method);
	      }
	    }
	    this.$el.on('click', function(e) {
	      e.stopPropagation();
	    });
	    return this;
	  },
	  undelegateEvents: function() {
	    this.$el.off('.delegateEvents' + this.cid);
	    return this;
	  },
	  setContent: function(model) {
	    var html = this.tmp({model: this.model});
	    this.$el.html(html);
	  },
	  hide: function() {
	    this.$el.hide();
	  },
	  show: function() {
	    this.$el.show();
	  },
	  destory: function() {
	    this.undelegateEvents();
	    if(this.$parentEl) {
	      this.$parentEl.html('');
	    } else {
	      this.$target.remove();
	    }
	  }
	});

	module.exports = Component;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(7);
	var Component = __webpack_require__(1);

	var DatePicker = Component.extend({
	  renderAfter: function() {
	    var $el = this.$el,
	        $minDateEl,
	        $maxDateEl;
	    var opt = {
	        changeYear: $el.attr('changeYear') || false,
	        changeMonth: $el.attr('changeMonth') || false,
	        hideIfNoPrevNext: true
	    }
	    $el.datepicker(opt);
	    var minDate = $el.attr("minDate");
	    if(!minDate) {
	      minDate = '+0';
	    } else {
	      if(/^#/.test(minDate)) {
	        $minDateEl = $(minDate);
	      }
	    }
	    var maxDate = $el.attr("maxDate");
	    if($maxDateEl) {
	      maxDate = '+99999';
	    } else {
	      if(/^#/.test(maxDate)) {
	        $maxDateEl = $(maxDate);
	      }
	    }
	    if($minDateEl) {
	      $minDateEl.datepicker("option", {
	        onSelect: function() {
	          $el.datepicker('option', 'minDate', $(this).val());
	        }
	      })
	    }
	    $el.datepicker('option', 'minDate', minDate);
	    $el.datepicker('option', 'maxDate', maxDate);
	  }
	});

	module.exports = DatePicker;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./date_picker.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./date_picker.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, ".ui-datepicker .ui-widget-header{\r\n    background-image:none;\r\n    background-color:#8088a1;\r\n    border:none;\r\n}\r\n.ui-widget-content{\r\n    background:#fff;\r\n    border:1px solid #ccc;\r\n    -webkit-box-shadow:0 2px 2px rgba(0,0,0,.3);\r\n    /*height: 260px;*/\r\n    overflow-x:hidden;\r\n    overflow-y:scroll;\r\n}\r\n.ui-datepicker .ui-datepicker-unselectable span.ui-state-default {\r\n    background-color: #ccc;\r\n    color: #555;\r\n    border-color: #ccc;\r\n    background-image:none;\r\n}\r\n.ui-state-active, .ui-widget-content .ui-state-default.ui-state-active,\r\n.ui-widget-header .ui-state-default.ui-state-active {\r\n    border: 1px solid #4a70b1;\r\n    background: #4a70b1;\r\n    font-weight: normal;\r\n    color: #FFF;\r\n}\r\n.ui-state-default, .ui-widget-content .ui-state-default,\r\n.ui-widget-header .ui-state-default {\r\nbackground: #d8edfd;\r\ncolor: #FFFFFF;\r\ntext-align: center;\r\ncolor: #4a70b1;\r\nborder-color: #d8edfd;\r\n}\r\n.ui-datepicker select.ui-datepicker-month,\r\n.ui-datepicker select.ui-datepicker-year{\r\n    width:auto;\r\n}\r\n.ui-state-hover,\r\n.ui-widget-content .ui-state-hover,\r\n.ui-widget-header .ui-state-hover{\r\n    background:#d8edfd;\r\n    border:none;\r\n    margin:1px;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* Chinese initialisation for the jQuery UI date picker plugin. */
	/* Written by Cloudream (cloudream@gmail.com). */
	jQuery.datepicker.regional['zh-CN'] = {
		closeText: '关闭',
		prevText: '&#x3C;上月',
		nextText: '下月&#x3E;',
		currentText: '今天',
		monthNames: ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'],
		monthNamesShort: ['一月','二月','三月','四月','五月','六月',
		'七月','八月','九月','十月','十一月','十二月'],
		dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
		dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
		dayNamesMin: ['日','一','二','三','四','五','六'],
		weekHeader: '周',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '年'};
	jQuery.datepicker.setDefaults(jQuery.datepicker.regional['zh-CN']);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var DatePickerAutoParse = __webpack_require__(9);

	function AutoParse(id) {
	    this.id = id;
	}

	AutoParse.prototype.$ = function(selector) {
	    return $("#" + this.id).find(selector);
	}

	AutoParse.prototype.autoParse = function() {
	    var inputs = this.$("[data-type]");
	    inputs.each(function(index, ele) {
	      var type = $(this).data('type');
	      switch (type) {
	        case 'date':
	          DatePickerAutoParse($(this)).render();
	          break;
	      }
	    });
	}

	module.exports = AutoParse;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var DatePicker = __webpack_require__(2);

	function AutoParse(target) {
	  return DatePicker.create({
	    $el: target
	  });
	}

	module.exports =  AutoParse;


/***/ }
/******/ ])
});
;