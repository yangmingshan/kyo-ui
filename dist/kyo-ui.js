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
	var AutoParse = __webpack_require__(3);

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

	var Component = __webpack_require__(1);

	var DatePicker = Component.extend({
	  renderAfter: function() {
	    this.$el.datepicker();
	  }
	});

	module.exports = DatePicker;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var DatePickerAutoParse = __webpack_require__(4);

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
/* 4 */
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