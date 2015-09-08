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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(1);
	var DatePicker = __webpack_require__(2);
	var AutoComplete = __webpack_require__(8);
	var SwitchTab = __webpack_require__(11);
	var Mask = __webpack_require__(23);
	var Dialog = __webpack_require__(26);
	var Confirm = __webpack_require__(31);
	var Alert = __webpack_require__(32);
	var Loading = __webpack_require__(33);

	var AutoParse = __webpack_require__(34);

	//以下控件整个程序应该只有一个

	// mask 实例
	var mask = Mask.create();
	mask.render('', true);

	//confirm 实例
	var _confirm = Confirm.create();
	_confirm.render('', true);

	//alert 实例
	var _alert = Alert.create();
	_alert.render('', true);

	var loading = Loading.create();
	loading.render('', true);

	module.exports = {
	  Component: Component,
	  SwitchTab: SwitchTab,
	  AutoParse: AutoParse,
	  mask: mask,
	  Dialog: Dialog,
	  confirm: kyo._.bind(_confirm.message, _confirm),
	  alert: kyo._.bind(_alert.alert, _alert),
	  loading: kyo._.bind(loading.loading, loading),
	  cancelLoading: kyo._.bind(loading.cancelLoading, loading),
	  AutoComplete: AutoComplete
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Base = kyo.Base,
	    _ = kyo._;

	var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	var Component = Base.extend({
	  $el: null,
	  tmp: null,
	  initialize: function() {
	    this.cid = _.uniqueId('component');
	    this.isRender = false;
	    if(this.$target && _.isString(this.$target)) {
	      this.$target = $("#"+this.$target);
	    }
	    if(this.$el) {
	      this.$el = $(this.$el);
	    }
	    this.delegateEvents();
	  },
	  render: function(parentEl, hide) {
	    if(this.isRender) {
	      this.show();
	      return this;
	    }
	    //如果没有templete则认为不需要渲染
	    if(!this.template &&!this.$el) {
	      this.renderAfter();
	      return;
	    }
	    if(!parentEl) {
	        parentEl = document.body || document.documentElement;
	    }
	    if(this.css) {
	      this.$el.css(this.css);
	    }
	    parentEl = this.$parentEl = $(parentEl);
	    parentEl.append(this.$el);
	    if(!hide){
	      this.show();
	    }
	    this._model();
	  },
	  _model: function() {
	    var self = this;
	    if(this.model) {
	      //是一个promise
	      if(this.model.then) {
	        this.model.then(function(data) {
	          self._modelAfter(data);
	        }, function(err) {

	        });
	      } else if(_.isFunction(this.model)){
	        this._modelAfter(this.model());
	      } else {
	        this._modelAfter(this.model);
	      }
	    } else {
	      this._modelAfter(this.model);
	    }
	  },
	  _modelAfter: function(data) {
	    if(this.modelAfter && _.isFunction(this.modelAfter)) {
	      data = this.modelAfter(data);
	    }
	    this.model = data;
	    this._setContent();
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
	  _setContent: function() {
	    var html = this.template;
	    if(_.isFunction(this.template)) {
	      html = this.template(this);
	    }
	    this.$el.html(html);
	  },
	  renderAfter: function() {

	  },
	  hide: function() {
	    this.$el && this.$el.hide();
	  },
	  show: function() {
	    this.$el && this.$el.show();
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
	    var $target = this.$target,
	        $minDateTarget,
	        $maxDateTarget;
	    var opt = {
	        changeYear: $target.attr('changeYear') || false,
	        changeMonth: $target.attr('changeMonth') || false,
	        hideIfNoPrevNext: true
	    }
	    $target.datepicker(opt);
	    var minDate = $target.attr("minDate");
	    if(!minDate) {
	      minDate = '+0';
	    } else {
	      if(/^#/.test(minDate)) {
	        $minDateTarget = $(minDate);
	      }
	    }
	    var maxDate = $target.attr("maxDate");
	    if($maxDateTarget) {
	      maxDate = '+99999';
	    } else {
	      if(/^#/.test(maxDate)) {
	        $maxDateTarget = $(maxDate);
	      }
	    }
	    if($minDateTarget) {
	      $minDateTarget.datepicker("option", {
	        onSelect: function() {
	          $target.datepicker('option', 'minDate', $(this).val());
	        }
	      })
	    }
	    $target.datepicker('option', 'minDate', minDate);
	    $target.datepicker('option', 'maxDate', maxDate);
	  }
	});

	module.exports = DatePicker;


/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
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

	var AutoComplete, Component;

	__webpack_require__(9);

	Component = __webpack_require__(1);

	AutoComplete = Component.extend({
	  renderAfter: function() {
	    var delay, model;
	    delay = this.delay;
	    model = this.model;
	    return this.$target.autocomplete({
	      html: true,
	      autoFocus: true,
	      delay: delay || 200,
	      source: this.source || function(request, response) {
	        var filter, filterData, i, inputData, len, matcher, responseData;
	        inputData = request.term;
	        matcher = new RegExp($.ui.autocomplete.escapeRegex(inputData), 'i');
	        filterData = jQuery.grep(model, function(data) {
	          return matcher.test(data.name);
	        });
	        responseData = [];
	        for (i = 0, len = filterData.length; i < len; i++) {
	          filter = filterData[i];
	          responseData.push({
	            value: filter.name,
	            label: filter.name
	          });
	        }
	        if (responseData.length === 0) {
	          responseData = ['无数据， 请更换关键字搜索！'];
	        }
	        return response(responseData);
	      },
	      search: this.search,
	      open: this.open,
	      select: this.select
	    });
	  }
	});

	module.exports = AutoComplete;


/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Component, SwitchTab, template;

	__webpack_require__(12);

	Component = __webpack_require__(1);

	template = __webpack_require__(14);

	SwitchTab = Component.extend({
	  $el: "<div class='switch_tab'></div>",
	  template: template,
	  events: {
	    'click .switch_tab_head_item': 'switchTab',
	    'click .switch_tab_content_select': 'select'
	  },
	  switchTab: function(e) {
	    var $target, index;
	    $target = $(e.currentTarget);
	    this.$el.find('.active').removeClass('active');
	    $target.addClass('active');
	    index = $target.data('index');
	    this.$el.find('.switch_tab_content_item').hide();
	    return this.$el.find('.switch_tab_content_item').filter('[data-index=' + index + ']').show();
	  },
	  select: function(e) {
	    var $target;
	    $target = $(e.currentTarget);
	    this.$target.val($target.attr('title'));
	    return this.hide();
	  },
	  renderAfter: function(e) {
	    var left, tleft, top, ttop;
	    if (this.position && this.$target) {
	      left = this.position.left || 0;
	      top = this.position.top || 0;
	      tleft = this.$target.offset().left || 0;
	      ttop = this.$target.offset().top || 0;
	      this.$el.offset({
	        left: left + tleft,
	        top: top + ttop
	      });
	    }
	    return this.$el.find('.switch_tab_head_item:first').trigger('click');
	  }
	});

	module.exports = SwitchTab;


/***/ },
/* 12 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

	  return "    <li class=\"switch_tab_head_item\" data-index=\""
	    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
	    + "\"><a>"
	    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
	    + "</a></li>\n";
	},"3":function(depth0,helpers,partials,data) {
	    var stack1, helper;

	  return "    <ul class=\"switch_tab_content_item clearfix\" data-index=\""
	    + this.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
	    + "\">\n"
	    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.values : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "    </ul>\n";
	},"4":function(depth0,helpers,partials,data) {
	    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

	  return "        <li>\n          <a class=\"switch_tab_content_select\" title=\""
	    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
	    + "\" data-code=\""
	    + alias3(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"code","hash":{},"data":data}) : helper)))
	    + "\">"
	    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
	    + "</a>\n        </li>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "<ul class=\"switch_tab_head clearfix\">\n"
	    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.model : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "</ul>\n<div class=\"switch_tab_content\">\n"
	    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.model : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "</div>\n";
	},"useData":true});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(16)['default'];


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;

	var _import = __webpack_require__(17);

	var base = _interopRequireWildcard(_import);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _SafeString = __webpack_require__(20);

	var _SafeString2 = _interopRequireWildcard(_SafeString);

	var _Exception = __webpack_require__(19);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var _import2 = __webpack_require__(18);

	var Utils = _interopRequireWildcard(_import2);

	var _import3 = __webpack_require__(21);

	var runtime = _interopRequireWildcard(_import3);

	var _noConflict = __webpack_require__(22);

	var _noConflict2 = _interopRequireWildcard(_noConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _SafeString2['default'];
	  hb.Exception = _Exception2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_noConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	exports.createFrame = createFrame;

	var _import = __webpack_require__(18);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(19);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var VERSION = '3.0.1';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 6;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};

	  registerDefaultHelpers(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: logger,
	  log: log,

	  registerHelper: function registerHelper(name, fn) {
	    if (toString.call(name) === objectType) {
	      if (fn) {
	        throw new _Exception2['default']('Arg not supported with multiple helpers');
	      }
	      Utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _Exception2['default']('Attempting to register a partial as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  }
	};

	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function () {
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} constuct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _Exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });

	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });

	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _Exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: Utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });

	  instance.registerHelper('if', function (conditional, options) {
	    if (isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });

	  instance.registerHelper('with', function (context, options) {
	    if (isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!Utils.isEmpty(context)) {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
	        options = { data: data };
	      }

	      return fn(context, options);
	    } else {
	      return options.inverse(this);
	    }
	  });

	  instance.registerHelper('log', function (message, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, message);
	  });

	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	}

	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 1,

	  // Can be overridden in the host environment
	  log: function log(level, message) {
	    if (typeof console !== 'undefined' && logger.level <= level) {
	      var method = logger.methodMap[level];
	      (console[method] || console.log).call(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports.logger = logger;
	var log = logger.log;

	exports.log = log;

	function createFrame(object) {
	  var frame = Utils.extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	/* [args, ]options */

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;

	// Older IE versions do not directly support indexOf so we must implement our own, sadly.
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&#x27;',
	  '`': '&#x60;'
	};

	var badChars = /[&<>"'`]/g,
	    possible = /[&<>"'`]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/*eslint-disable func-style, no-var */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	/*eslint-enable func-style, no-var */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};exports.isArray = isArray;

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;
	exports.checkRevision = checkRevision;

	// TODO: Remove this line and break up compilePartial

	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _import = __webpack_require__(18);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(19);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var _COMPILER_REVISION$REVISION_CHANGES$createFrame = __webpack_require__(17);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision],
	          compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
	      throw new _Exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _Exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _Exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _Exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _Exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _Exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      return templateSpec[i];
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      depths = options.depths ? [context].concat(options.depths) : [context];
	    }

	    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _Exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _Exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
	  }
	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    partial = options.partials[options.name];
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;

	  if (partial === undefined) {
	    throw new _Exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.__esModule = true;
	/*global window */

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Mask;

	__webpack_require__(24);

	Component = __webpack_require__(1);

	Mask = Component.extend({
	  $el: "<div class='kui-mask' style='display:none'></div>"
	});

	module.exports = Mask;


/***/ },
/* 24 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Dialog, template;

	__webpack_require__(27);

	Component = __webpack_require__(1);

	template = __webpack_require__(30);

	Dialog = Component.extend({
	  name: 'dialog',
	  $el: "<div class='kui-dialog'></div>",
	  template: template,
	  hasClose: true,
	  footer: true,
	  confirmText: '确认',
	  cancelText: '取消',
	  title: '提示',
	  content: '',
	  css: {
	    width: '500px',
	    height: '600px'
	  },
	  setContent: function(content) {
	    return this.$el.find('.kui-dialog-content').html(content);
	  },
	  setPosition: function() {
	    var $body, bodyHeight, bodyWidth, height, left, scrollTop, top, width;
	    width = parseFloat(this.$el.width()) || 0;
	    $body = $('body');
	    bodyWidth = $body.width();
	    left = ((bodyWidth - width) / 2) + 'px';
	    scrollTop = $body.scrollTop();
	    height = parseFloat(this.$el.height()) || 0;
	    bodyHeight = $(window).height();
	    top = (scrollTop + ((bodyHeight - height) / 2)) + 'px';
	    return this.$el.css({
	      left: left,
	      top: top
	    });
	  },
	  setContentHeight: function() {
	    var contentHeight, footerHeight, height, titleHeight;
	    height = parseFloat(this.css.height);
	    titleHeight = this.title ? 47 : 0;
	    footerHeight = this.footer ? 54 : 0;
	    contentHeight = height - titleHeight - footerHeight;
	    return this.$el.find('.kui-dialog-content').css('height', contentHeight + 'px');
	  },
	  renderAfter: function() {
	    var content;
	    content = this.content;
	    if (content) {
	      this.$el.find('.kui-dialog-content').html(content);
	    }
	    return this.setContentHeight();
	  },
	  events: {
	    'click .kui-dialog-close': 'close',
	    'click .kui-dialog-cancel': 'close',
	    'click .kui-dialog-confirm': 'confirm'
	  },
	  show: function() {
	    kui.mask.show();
	    this.setPosition();
	    return Component.prototype.show.call(this);
	  },
	  close: function() {
	    Component.prototype.hide.call(this);
	    kui.mask.hide();
	    return this.trigger('close');
	  },
	  confirm: function() {
	    kui.mask.hide();
	    this.hide();
	    return this.trigger('confirm');
	  }
	});

	module.exports = Dialog;


/***/ },
/* 27 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 28 */,
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    return "  <a class=\"kui-dialog-close\">x</a>\n";
	},"3":function(depth0,helpers,partials,data) {
	    var helper;

	  return "  <div class=\"kui-dialog-title\">\n    "
	    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
	    + "\n  </div>\n";
	},"5":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "  <div class=\"kui-dialog-footer\">\n"
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.confirmText : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.cancelText : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "  </div>\n";
	},"6":function(depth0,helpers,partials,data) {
	    var helper;

	  return "      <button class=\"kui-dialog-confirm btn btn-primary\">"
	    + this.escapeExpression(((helper = (helper = helpers.confirmText || (depth0 != null ? depth0.confirmText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"confirmText","hash":{},"data":data}) : helper)))
	    + "</button>\n";
	},"8":function(depth0,helpers,partials,data) {
	    var helper;

	  return "      <button class=\"kui-dialog-cancel btn btn-default\">"
	    + this.escapeExpression(((helper = (helper = helpers.cancelText || (depth0 != null ? depth0.cancelText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"cancelText","hash":{},"data":data}) : helper)))
	    + "</button>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.hasClose : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "<div class=\"kui-dialog-content\">\n\n</div>\n\n"
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.footer : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
	},"useData":true});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var Confirm, Dialog;

	Dialog = __webpack_require__(26);

	Confirm = Dialog.extend({
	  name: 'confirm',
	  title: '确认',
	  css: {
	    width: '500px',
	    height: 'auto'
	  },
	  initialize: function() {
	    Dialog.prototype.initialize.call(this);
	    return this.callbacks = [];
	  },
	  message: function(msg, title, callback) {
	    this.$el.find('.kui-dialog-content').html(msg);
	    if (title) {
	      this.$el.find('.kui-dialog-title').html(title);
	    }
	    if (callback && kyo._.isFunction(callback)) {
	      this.callbacks.push(callback);
	    }
	    return this.show();
	  },
	  close: function() {
	    Dialog.prototype.close.call(this);
	    return this.callbacks = [];
	  },
	  confirm: function() {
	    var callback;
	    Dialog.prototype.confirm.call(this);
	    if (callback = this.callbacks.pop()) {
	      return callback();
	    }
	  }
	});

	module.exports = Confirm;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var Alert, Dialog;

	Dialog = __webpack_require__(26);

	Alert = Dialog.extend({
	  name: 'alert',
	  title: '提示',
	  css: {
	    width: '500px',
	    height: 'auto'
	  },
	  cancelText: '',
	  alert: function(msg, title) {
	    this.$el.find('.kui-dialog-content').html(msg);
	    if (title) {
	      this.$el.find('.kui-dialog-title').html(title);
	    }
	    return this.show();
	  }
	});

	module.exports = Alert;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var Dialog, Loading;

	Dialog = __webpack_require__(26);

	Loading = Dialog.extend({
	  name: 'loading',
	  title: null,
	  css: {
	    width: '381px',
	    height: 'auto'
	  },
	  footer: null,
	  cancelText: null,
	  confirmText: null,
	  content: "<div class='kui-dialog-loading'></div>",
	  loading: function(msg) {
	    if (msg == null) {
	      msg = '数据加载中';
	    }
	    this.$el.find('.kui-dialog-loading').html(msg);
	    return this.show();
	  },
	  cancelLoading: function() {
	    return this.close();
	  }
	});

	module.exports = Loading;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var DatePickerAutoParse = __webpack_require__(35);

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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var DatePicker = __webpack_require__(2);

	function AutoParse(target) {
	  return DatePicker.create({
	    $target: target
	  });
	}

	module.exports =  AutoParse;


/***/ }
/******/ ])
});
;