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

	var Alert, AutoComplete, AutoParse, Component, Confirm, DatePicker, Dialog, DropMenu, Loading, Mask, Paging, SwitchTab, _alert, _confirm, loading, loadingMask, mask;

	Component = __webpack_require__(1);

	DatePicker = __webpack_require__(4);

	AutoComplete = __webpack_require__(23);

	SwitchTab = __webpack_require__(26);

	Mask = __webpack_require__(30);

	Dialog = __webpack_require__(33);

	Confirm = __webpack_require__(39);

	Alert = __webpack_require__(41);

	Loading = __webpack_require__(42);

	Paging = __webpack_require__(43);

	DropMenu = __webpack_require__(11);

	AutoParse = __webpack_require__(2);

	mask = Mask.create();

	mask.render(false);

	loadingMask = Mask.create({
	  classNames: ['kui-mask', 'kui-loading-mask']
	});

	loadingMask.render(false);

	_confirm = Confirm.create();

	_confirm.render(false);

	_alert = Alert.create();

	_alert.render(false);

	loading = Loading.create();

	loading.render(false);

	module.exports = {
	  Component: Component,
	  SwitchTab: SwitchTab,
	  AutoParse: AutoParse,
	  mask: mask,
	  loadingMask: loadingMask,
	  Dialog: Dialog,
	  confirm: kyo._.bind(_confirm.message, _confirm),
	  alert: kyo._.bind(_alert.alert, _alert),
	  loading: kyo._.bind(loading.loading, loading),
	  cancelLoading: kyo._.bind(loading.cancelLoading, loading),
	  Paging: Paging,
	  AutoComplete: AutoComplete
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Base, Component, _, autoParse, delegateEventSplitter;

	Base = kyo.Base;

	_ = kyo._;

	autoParse = __webpack_require__(2);

	delegateEventSplitter = /^(\S+)\s*(.*)$/;

	Component = Base.extend({
	  $el: null,
	  templete: null,
	  initialize: function() {
	    this.cid = _.uniqueId('component');
	    this.isRender = false;
	    if (this.notNeedRender) {
	      if (_.isString(this.$el)) {
	        this.$el = $(this.$el);
	      }
	    } else {
	      this.createEl();
	    }
	    if (this.$target && _.isString(this.$target)) {
	      this.$target = $("#" + this.$target);
	    }
	    this.$el.attr('kui-component', '').attr('kui-id', this.cid);
	    this.delegateEvents();
	    this.oldModel = this.model;
	    if (this.notNeedRender) {
	      return this.render();
	    }
	  },
	  render: function(parentEl, show) {
	    if (this.notNeedRender) {
	      return this.renderAfter();
	    }
	    if (arguments.length === 1 && typeof arguments[0] === 'boolean') {
	      show = parentEl;
	      parentEl = void 0;
	    }
	    if (this.isRender) {
	      this.destory();
	      this.isRender = false;
	    }
	    this._renderBefore();
	    if (parentEl) {
	      this.$parentEl = $(parentEl);
	    }
	    if (!this.$parentEl) {
	      this.$parentEl = $('body');
	    }
	    if (show) {
	      this.show();
	    } else {
	      this.hide();
	    }
	    this.$parentEl.append(this.$el);
	    if (this.css) {
	      this.$el.css(this.css);
	    }
	    this._model();
	    return this;
	  },
	  _model: function() {
	    var self;
	    self = this;
	    if (this.model) {
	      if (_.isFunction(this.model)) {
	        this.model = this.model();
	      }
	      if (this.model.then) {
	        return this.model.then((function(_this) {
	          return function(data) {
	            return _this._modelAfter(data);
	          };
	        })(this));
	      } else {
	        return this._modelAfter(this.model);
	      }
	    } else {
	      return this._modelAfter();
	    }
	  },
	  _renderBefore: function(data) {
	    if (this.renderBefore && _.isFunction(this.renderBefore)) {
	      return this.renderBefore(data);
	    }
	  },
	  _modelAfter: function(data) {
	    if (this.modelAfter && _.isFunction(this.modelAfter)) {
	      data = this.modelAfter(data);
	    }
	    this.model = data;
	    return this._setContent();
	  },
	  delegateEvents: function() {
	    var eventName, events, key, match, method, selector, self;
	    self = this;
	    events = this.events;
	    if (!events) {
	      return this;
	    }
	    this.undelegateEvents();
	    for (key in events) {
	      method = events[key];
	      if (!_.isFunction(method)) {
	        method = this[events[key]];
	      }
	      if (!method) {
	        continue;
	      }
	      match = key.match(delegateEventSplitter);
	      eventName = match[1];
	      selector = match[2];
	      method = _.bind(method, self);
	      eventName += '.delegateEvents' + this.cid;
	      if (selector === '') {
	        $el.on(eventName, method);
	      } else {
	        this.$el.on(eventName, selector, method);
	      }
	    }
	    return this;
	  },
	  undelegateEvents: function() {
	    this.$el.off('.delegateEvents' + this.cid);
	    return this;
	  },
	  _setContent: function() {
	    var html, self;
	    self = this;
	    html = this.template;
	    if (_.isFunction(html)) {
	      html = this.template(this);
	      if (html.then && _.isFunction(html.then)) {
	        html = html.then(function(data) {
	          self.$el.html(self.templateAfter(data));
	          self.isRender = true;
	          return self.renderAfter();
	        });
	        return;
	      }
	    }
	    this.$el.html(html);
	    this.isRender = true;
	    return this.renderAfter();
	  },
	  renderAfter: function() {
	    autoParse(this);
	    if (this.load) {
	      return this.load();
	    }
	  },
	  _renderBefore: function() {},
	  hide: function() {
	    var ref;
	    if (typeof this.beforeHide === "function") {
	      this.beforeHide();
	    }
	    if ((ref = this.$el) != null) {
	      ref.hide();
	    }
	    return typeof this.afterHide === "function" ? this.afterHide() : void 0;
	  },
	  show: function() {
	    var ref;
	    if (typeof this.beforeShow === "function") {
	      this.beforeShow();
	    }
	    if ((ref = this.$el) != null) {
	      ref.show();
	    }
	    return typeof this.afterShow === "function" ? this.afterShow() : void 0;
	  },
	  destory: function(delegateEvent) {
	    var ref, ref1;
	    if (delegateEvent) {
	      this.undelegateEvents();
	    }
	    this.model = this.oldModel;
	    if ((ref = this.$el) != null) {
	      ref.html();
	    }
	    return (ref1 = this.$target) != null ? ref1.remove() : void 0;
	  },
	  parent: null,
	  children: {},
	  addChild: function(name, component) {
	    component.parent = this;
	    return this.children[name] = component;
	  },
	  $: function(selector) {
	    return this.$el.find(selector);
	  },
	  getData: function(container) {
	    var data, inputs;
	    if (!container) {
	      container = this.$el;
	    }
	    inputs = container.find("input[name],select[name]");
	    data = {};
	    inputs.each(function() {
	      var $this, name, type, val;
	      $this = $(this);
	      name = $this.attr('name');
	      val = '';
	      type = $this.prop('type');
	      if (type === 'checkbox' || type === 'radio') {
	        val = $this.prop('checked');
	        if (!val) {
	          return;
	        }
	        if ($this.data('value')) {
	          val = $this.data('value');
	        }
	      } else {
	        val = $this.val().trim();
	      }
	      if (/\[\]/.test(name)) {
	        if (data[name]) {
	          return data[name].push(val);
	        } else {
	          return data[name] = [val];
	        }
	      } else {
	        return data[name] = val;
	      }
	    });
	    return data;
	  },
	  createEl: function() {
	    var el, ref, tagName;
	    tagName = (ref = this.tagName) != null ? ref : 'div';
	    el = document.createElement(tagName);
	    this.$el = $(el);
	    if (this.classNames) {
	      return this.classNames.forEach((function(_this) {
	        return function(n) {
	          var ref1;
	          return (ref1 = _this.$el) != null ? ref1.addClass(n) : void 0;
	        };
	      })(this));
	    }
	  },
	  action: function(name, params) {
	    var parent;
	    if (this[name] && _.isFunction(this[name])) {
	      return this[name](params);
	    } else {
	      parent = this.parent;
	      while (parent === !null && (parent[name] && _.isFunction(parent[name]))) {
	        parent = parent.parent;
	      }
	      if (parent && parent[name] && _.isFunction(parent[name])) {
	        return parent[name](params);
	      }
	    }
	  }
	});

	module.exports = Component;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var _, _parse, autoParse, getParentComponent;

	_ = kyo._;

	autoParse = function(component) {
	  var $el, $inputs;
	  $el = component.$el;
	  $inputs = $el.find("[data-type]");
	  return $inputs.each(function(index, ele) {
	    var $parent;
	    $parent = getParentComponent($(ele));
	    if ($parent.attr('kui-id') === $el.attr('kui-id')) {
	      return _parse($(ele), component);
	    }
	  });
	};

	getParentComponent = function($e) {
	  var $parent;
	  $parent = $e.parent();
	  while (!($parent && $parent.attr('kui-id'))) {
	    $parent = $parent.parent();
	  }
	  return $parent;
	};

	_parse = function($e, parent) {
	  var DatePickerAutoParse, DropMenuAutoParse, datePicker, dropMenu, type;
	  DatePickerAutoParse = __webpack_require__(3);
	  DropMenuAutoParse = __webpack_require__(10);
	  type = $e.data('type');
	  switch (type) {
	    case 'date':
	      datePicker = DatePickerAutoParse($e);
	      datePicker.parent = parent;
	      return datePicker.render();
	    case 'drop-menu':
	      dropMenu = DropMenuAutoParse($e, parent);
	      dropMenu.parent = parent;
	      return dropMenu.render($e, true);
	  }
	};

	module.exports = autoParse;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var AutoParse, DatePicker;

	DatePicker = __webpack_require__(4);

	AutoParse = function(target) {
	  return DatePicker.create({
	    $target: target
	  });
	};

	module.exports = AutoParse;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Component, DatePicker;

	__webpack_require__(5);

	__webpack_require__(9);

	Component = __webpack_require__(1);

	DatePicker = Component.extend({
	  renderAfter: function() {
	    var $maxDateTarget, $minDateTarget, $target, maxDate, minDate, opt;
	    $target = this.$target;
	    $minDateTarget;
	    $maxDateTarget;
	    opt = {
	      changeYear: $target.attr('change-year') || false,
	      changeMonth: $target.attr('change-month') || false,
	      numberOfMonths: Number($target.attr('number-month')) || 1,
	      defaultDate: $target.attr('default-date'),
	      hideIfNoPrevNext: true,
	      yearRange: '1900:2050'
	    };
	    minDate = $target.attr("min-date");
	    if (minDate) {
	      if (/^#/.test(minDate)) {
	        $minDateTarget = $(minDate);
	      }
	    }
	    maxDate = $target.attr("max-date");
	    if ($maxDateTarget) {
	      maxDate = '+99999';
	    } else {
	      if (/^#/.test(maxDate)) {
	        $maxDateTarget = $(maxDate);
	      }
	    }
	    if ($minDateTarget) {
	      $minDateTarget.datepicker("option", {
	        onSelect: function() {
	          return $target.datepicker('option', 'minDate', $(this).val());
	        }
	      });
	    }
	    if (minDate) {
	      opt.minDate = minDate;
	    }
	    if (maxDate) {
	      opt.maxDate = maxDate;
	    }
	    $target.datepicker(opt);
	    return this;
	  }
	});

	module.exports = DatePicker;


/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var AutoParse, DropMenu;

	DropMenu = __webpack_require__(11);

	AutoParse = function(target, parent) {
	  var currentModel, dropMenu, model;
	  dropMenu = DropMenu.create({
	    $target: target,
	    $el: target
	  });
	  model = target.attr('data-model');
	  if (parent[model]) {
	    currentModel = parent[model];
	  }
	  if (currentModel) {
	    dropMenu.model = currentModel;
	  }
	  return dropMenu;
	};

	module.exports = AutoParse;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Component, DropMenu, _, template;

	__webpack_require__(12);

	Component = __webpack_require__(1);

	template = __webpack_require__(14);

	_ = kyo._;

	DropMenu = Component.extend({
	  template: template,
	  renderAfter: function() {
	    var $all, selectName;
	    $all = this.$("a");
	    $all.attr('prevText', $all.text());
	    this.$el.addClass('kui-drop-menu');
	    this.$el.append("<b class='caret'></b>");
	    this.$el.on('mouseover', (function(_this) {
	      return function() {
	        return _this.$("ul").show();
	      };
	    })(this));
	    this.$el.on('mouseout', (function(_this) {
	      return function() {
	        return _this.$("ul").hide();
	      };
	    })(this));
	    selectName = this.$el.parent().attr('on-select');
	    return this.$("li").on('click', (function(_this) {
	      return function(e) {
	        var $current;
	        _this.$("li").removeAttr('selected');
	        $current = $(e.currentTarget);
	        $all.html($current.html());
	        $current.attr('selected', true);
	        if (selectName) {
	          return _this.action(selectName, _this.getSelected());
	        }
	      };
	    })(this));
	  },
	  getSelected: function() {
	    return this.$el.getDropMenuSelected();
	  }
	});

	$.fn.extend({
	  getDropMenuSelected: function() {
	    var $selected, value;
	    $selected = $(this).find("[selected='selected']");
	    value = '';
	    if ($selected.length > 0) {
	      value = $selected.attr('data-value');
	      if (value === void 0) {
	        value = $selected.text();
	      }
	    }
	    return value;
	  }
	});

	module.exports = DropMenu;


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

	  return "  <li data-value=\""
	    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
	    + "\">"
	    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
	    + "</li>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "<a>"
	    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
	    + "</a>\n<ul>\n"
	    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "</ul>\n";
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

	var AutoComplete, Component;

	__webpack_require__(24);

	Component = __webpack_require__(1);

	AutoComplete = Component.extend({
	  close: function() {
	    return this.$target.autocomplete('close');
	  },
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
	      select: (function(_this) {
	        return function(e, v) {
	          return _this.trigger('select', v.item.label);
	        };
	      })(this)
	    });
	  }
	});

	module.exports = AutoComplete;


/***/ },
/* 24 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Component, SwitchTab, template;

	__webpack_require__(27);

	Component = __webpack_require__(1);

	template = __webpack_require__(29);

	SwitchTab = Component.extend({
	  classNames: ['switch_tab'],
	  template: template,
	  events: {
	    'click .switch_tab_head_item': 'switchTab',
	    'click .switch_tab_content_select': '_select'
	  },
	  switchTab: function(e) {
	    var $target, index;
	    $target = $(e.currentTarget);
	    this.$el.find('.active').removeClass('active');
	    $target.addClass('active');
	    index = $target.data('index');
	    this.$el.find('.switch_tab_content_item').hide();
	    this.$el.find('.switch_tab_content_item').filter('[data-index=' + index + ']').show();
	    return e.stopPropagation();
	  },
	  _select: function(e) {
	    var $target;
	    $target = $(e.currentTarget);
	    this.$target.val($target.attr('title'));
	    this.hide();
	    return this.trigger('select', $target.attr('title'));
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
	    this.$target.on('click', (function(_this) {
	      return function(e) {
	        _this.show();
	        return e.stopPropagation();
	      };
	    })(this));
	    $("body").on('click', (function(_this) {
	      return function() {
	        return _this.hide();
	      };
	    })(this));
	    return this.$el.find('.switch_tab_head_item:first').trigger('click');
	  }
	});

	module.exports = SwitchTab;


/***/ },
/* 27 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 28 */,
/* 29 */
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

	  return "<ul class=\"switch_tab_head cf\">\n"
	    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.model : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "</ul>\n<div class=\"switch_tab_content\">\n"
	    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.model : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "</div>\n";
	},"useData":true});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Mask;

	__webpack_require__(31);

	Component = __webpack_require__(1);

	Mask = Component.extend({
	  classNames: ['kui-mask']
	});

	module.exports = Mask;


/***/ },
/* 31 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Dialog, _, template;

	__webpack_require__(34);

	Component = __webpack_require__(1);

	template = __webpack_require__(38);

	_ = kyo._;

	Dialog = Component.extend({
	  name: 'dialog',
	  classNames: ['kui-dialog'],
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
	      this.$el.find('.kui-dialog-content').append(content);
	    }
	    return this.setContentHeight();
	  },
	  events: {
	    'click .kui-dialog-close': 'close',
	    'click .kui-dialog-cancel': 'close',
	    'click .kui-dialog-confirm': 'confirm'
	  },
	  addChild: function(name, component) {
	    Component.prototype.addChild.call(this, name, component);
	    component.$parentEl = this.$el.find('.kui-dialog-content');
	    return component.render();
	  },
	  switchTo: function(name) {
	    return _.each(this.children, (function(_this) {
	      return function(v, k) {
	        if (k === name) {
	          v.show();
	          if (v.title) {
	            return _this.setTitle(v.title);
	          }
	        } else {
	          return v.hide();
	        }
	      };
	    })(this));
	  },
	  setTitle: function(title) {
	    return this.$el.find(".kui-dialog-title").html(title);
	  },
	  open: function() {
	    return this.show();
	  },
	  show: function() {
	    this.trigger('open');
	    kui.mask.show();
	    this.setPosition();
	    return Component.prototype.show.call(this);
	  },
	  close: function() {
	    this.trigger('close');
	    Component.prototype.hide.call(this);
	    return kui.mask.hide();
	  },
	  confirm: function() {
	    this.trigger('confirm');
	    kui.mask.hide();
	    return this.hide();
	  }
	});

	module.exports = Dialog;


/***/ },
/* 34 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data) {
	    return "  <a class=\"kui-dialog-close\"></a>\n";
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

	  return "      <button class=\"kui-dialog-confirm btn btn-blue btn-large\">"
	    + this.escapeExpression(((helper = (helper = helpers.confirmText || (depth0 != null ? depth0.confirmText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"confirmText","hash":{},"data":data}) : helper)))
	    + "</button>\n";
	},"8":function(depth0,helpers,partials,data) {
	    var helper;

	  return "      <button class=\"kui-dialog-cancel btn btn-default btn-large\">"
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Confirm, MaskDialog, _;

	MaskDialog = __webpack_require__(40);

	Component = __webpack_require__(1);

	_ = kyo._;

	Confirm = MaskDialog.extend({
	  classNames: ['kui-dialog', 'kui-confirm'],
	  name: 'confirm',
	  title: '确认',
	  css: {
	    width: '500px',
	    height: 'auto'
	  },
	  initialize: function() {
	    Component.prototype.initialize.call(this);
	    return this.callbacks = [];
	  },
	  message: function(msg, title, callback) {
	    this.$el.find('.kui-dialog-content').html(msg);
	    if (_.isFunction(title)) {
	      callback = title;
	      title = void 0;
	    }
	    if (title) {
	      this.$el.find('.kui-dialog-title').html(title);
	    }
	    if (callback && kyo._.isFunction(callback)) {
	      this.callbacks.push(callback);
	    }
	    return this.show();
	  },
	  close: function() {
	    MaskDialog.prototype.close.call(this);
	    return this.callbacks = [];
	  },
	  confirm: function() {
	    var callback;
	    MaskDialog.prototype.confirm.call(this);
	    if (callback = this.callbacks.pop()) {
	      return callback();
	    }
	  }
	});

	module.exports = Confirm;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Dialog, MaskDialog;

	Dialog = __webpack_require__(33);

	Component = __webpack_require__(1);

	MaskDialog = Dialog.extend({
	  show: function() {
	    kui.loadingMask.show();
	    this.setPosition();
	    Component.prototype.show.call(this);
	    return this.trigger('open');
	  },
	  close: function() {
	    Component.prototype.hide.call(this);
	    kui.loadingMask.hide();
	    return this.trigger('close');
	  },
	  confirm: function() {
	    Component.prototype.hide.call(this);
	    kui.loadingMask.hide();
	    return this.trigger('confirm');
	  }
	});

	module.exports = MaskDialog;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var Alert, Component, MaskDialog, _;

	MaskDialog = __webpack_require__(40);

	Component = __webpack_require__(1);

	_ = kyo._;

	Alert = MaskDialog.extend({
	  classNames: ['kui-dialog', 'kui-alert'],
	  name: 'alert',
	  title: '提示',
	  css: {
	    width: '360px',
	    height: 'auto'
	  },
	  initialize: function() {
	    Component.prototype.initialize.call(this);
	    return this.callbacks = [];
	  },
	  cancelText: '',
	  alert: function(msg, title, callback) {
	    this.$el.find('.kui-dialog-content').html(msg);
	    if (_.isFunction(title)) {
	      callback = title;
	      title = void 0;
	    }
	    if (title) {
	      this.$el.find('.kui-dialog-title').html(title);
	    }
	    if (callback && kyo._.isFunction(callback)) {
	      this.callbacks.push(callback);
	    }
	    return this.show();
	  },
	  confirm: function() {
	    var callback;
	    MaskDialog.prototype.confirm.call(this);
	    if (callback = this.callbacks.pop()) {
	      return callback();
	    }
	  }
	});

	module.exports = Alert;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Loading, MaskDialog;

	MaskDialog = __webpack_require__(40);

	Loading = MaskDialog.extend({
	  name: 'loading',
	  classNames: ['kui-dialog', 'kui-loading'],
	  title: null,
	  css: {
	    width: '400px',
	    height: 'auto'
	  },
	  footer: null,
	  hasClose: false,
	  cancelText: null,
	  confirmText: null,
	  content: "<div class='kui-dialog-loading'></div>",
	  loading: function(msg) {
	    if (msg == null) {
	      msg = '数据加载中';
	    }
	    this.$el.find('.kui-dialog-loading').html(msg);
	    return MaskDialog.prototype.show.call(this);
	  },
	  cancelLoading: function() {
	    return MaskDialog.prototype.close.call(this);
	  }
	});

	module.exports = Loading;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Paging, _, buildModel, buildSplitModel, template;

	__webpack_require__(44);

	Component = __webpack_require__(1);

	template = __webpack_require__(46);

	_ = kyo._;

	Paging = Component.extend({
	  name: 'paging',
	  tagName: 'ul',
	  classNames: ['kui-paging', 'cf'],
	  template: template,
	  splitText: '...',
	  pageIndex: 1,
	  prevCount: 2,
	  middleCount: 5,
	  nextCount: 2,
	  prevPagerText: '上一页',
	  nextPagerText: '下一页',
	  model: function() {
	    var _model, middleCount, nearPageCount, pageCount, pageIndex, pageSize, self, totalCount;
	    self = this;
	    _model = [];
	    pageSize = this.pageSize;
	    totalCount = this.totalCount;
	    middleCount = this.middleCount;
	    if (!totalCount) {
	      return [];
	    }
	    pageCount = this.pageCount = Math.ceil(totalCount / pageSize);
	    pageIndex = this.pageIndex;
	    nearPageCount = Math.floor(middleCount / 2);
	    if (pageCount > 1) {
	      this.goto = true;
	    } else {
	      this.goto = false;
	    }
	    if (pageIndex > 1) {
	      this.prevPager = true;
	    } else {
	      this.prevPager = false;
	    }
	    if (pageIndex < pageCount) {
	      this.nextPager = true;
	    } else {
	      this.nextPager = false;
	    }
	    if (pageIndex <= this.prevCount + nearPageCount + 1) {
	      _.each(_.range(1, pageIndex), function(value) {
	        return _model.push(buildModel.call(self, value));
	      });
	    } else {
	      _.each(_.range(1, this.prevCount), function(value) {
	        return _model.push(buildModel.call(self, value));
	      });
	      _model.push(buildSplitModel());
	      _.each(_.range(pageIndex - nearPageCount, pageIndex), function(value) {
	        return _model.push(buildModel.call(self, value));
	      });
	    }
	    _model.push(buildModel.call(self, pageIndex));
	    if (pageIndex >= pageCount - this.nextCount - nearPageCount) {
	      _.each(_.range(pageIndex + 1, pageCount + 1), function(value) {
	        return _model.push(buildModel.call(self, value));
	      });
	    } else {
	      _.each(_.range(pageIndex + 1, pageIndex + nearPageCount + 1), function(val) {
	        return _model.push(buildModel.call(self, val));
	      });
	      _model.push(buildSplitModel());
	      _.each(_.range(pageCount - this.nextCount + 1, pageCount + 1), function(val) {
	        return _model.push(buildModel.call(self, val));
	      });
	    }
	    return _model;
	  },
	  pageSize: 20,
	  totalCount: null,
	  events: {
	    'click .kui-paging-prev': 'prev',
	    'click .kui-paging-item': 'paging',
	    'click .kui-paging-next': 'next',
	    'click .kui-pageing-goto': 'goto'
	  },
	  prev: function(e) {
	    var index;
	    index = this.pageIndex;
	    return this._paging(index - 1);
	  },
	  next: function(e) {
	    var index;
	    index = this.pageIndex;
	    return this._paging(index + 1);
	  },
	  goto: function(e) {
	    var goto, totalSize;
	    goto = Number(this.$(".kui-paging-page-index").val());
	    totalSize = this.pageCount;
	    if (_.isNumber(goto) && goto <= totalSize) {
	      return this._paging(goto);
	    }
	  },
	  paging: function(e) {
	    var index;
	    index = Number($(e.currentTarget).text());
	    return this._paging(index);
	  },
	  _paging: function(pageIndex) {
	    var currentPageIndex;
	    currentPageIndex = this.pageIndex;
	    if (pageIndex === currentPageIndex) {
	      return;
	    }
	    this.pageIndex = pageIndex;
	    return this.trigger('paging', pageIndex);
	  },
	  setTotalCount: function(count) {
	    this.totalCount = count;
	    return this.render(true);
	  }
	});

	buildModel = function(value) {
	  if (value === this.pageIndex) {
	    return {
	      value: value,
	      isCurrent: true
	    };
	  }
	  return {
	    value: value
	  };
	};

	buildSplitModel = function() {
	  return {
	    isSplit: true
	  };
	};

	module.exports = Paging;


/***/ },
/* 44 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 45 */,
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(15);
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;

	  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.prevPager : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.model : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.nextPager : depth0),{"name":"if","hash":{},"fn":this.program(12, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['goto'] : depth0),{"name":"if","hash":{},"fn":this.program(14, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
	},"2":function(depth0,helpers,partials,data) {
	    var helper;

	  return "    <li class=\"kui-paging-prev\">"
	    + this.escapeExpression(((helper = (helper = helpers.prevPagerText || (depth0 != null ? depth0.prevPagerText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"prevPagerText","hash":{},"data":data}) : helper)))
	    + "</li>\n";
	},"4":function(depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;

	  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isSplit : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0, blockParams, depths),"inverse":this.program(7, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
	},"5":function(depth0,helpers,partials,data,blockParams,depths) {
	    return "      <li class=\"kui-paging-split\">"
	    + this.escapeExpression(this.lambda((depths[2] != null ? depths[2].splitText : depths[2]), depth0))
	    + "</li>\n";
	},"7":function(depth0,helpers,partials,data) {
	    var stack1;

	  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isCurrent : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.program(10, data, 0),"data":data})) != null ? stack1 : "");
	},"8":function(depth0,helpers,partials,data) {
	    var helper;

	  return "        <li class=\"kui-paging-active kui-paging-item\">"
	    + this.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
	    + "</li>\n";
	},"10":function(depth0,helpers,partials,data) {
	    var helper;

	  return "        <li class=\"kui-paging-item\">"
	    + this.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
	    + "</li>\n";
	},"12":function(depth0,helpers,partials,data) {
	    var helper;

	  return "    <li class=\"kui-paging-next\">"
	    + this.escapeExpression(((helper = (helper = helpers.nextPagerText || (depth0 != null ? depth0.nextPagerText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"nextPagerText","hash":{},"data":data}) : helper)))
	    + "</li>\n";
	},"14":function(depth0,helpers,partials,data) {
	    return "    <li>\n      跳转到<input type=\"text\" class=\"kui-paging-page-index\" />\n      页 <button class=\"kui-pageing-goto\">确认</button>\n    </li>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
	    var stack1;

	  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.model : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
	},"useData":true,"useDepths":true});

/***/ }
/******/ ])
});
;