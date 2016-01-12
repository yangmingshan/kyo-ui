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

	var Alert, AutoComplete, AutoParse, Component, Confirm, DatePicker, Dialog, DropMenu, Loading, Mask, Paging, SwitchTab, Tip, _alert, _confirm, kyo, loading, loadingMask, mask;

	kyo = __webpack_require__(1);

	Component = __webpack_require__(6);

	DatePicker = __webpack_require__(9);

	AutoComplete = __webpack_require__(33);

	SwitchTab = __webpack_require__(36);

	Mask = __webpack_require__(40);

	Dialog = __webpack_require__(43);

	Confirm = __webpack_require__(49);

	Alert = __webpack_require__(51);

	Loading = __webpack_require__(52);

	Paging = __webpack_require__(53);

	DropMenu = __webpack_require__(16);

	Tip = __webpack_require__(31);

	AutoParse = __webpack_require__(7);

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
	  Class: kyo.Class,
	  Base: kyo.Base,
	  Events: kyo.Events,
	  _: kyo._,
	  Component: Component,
	  SwitchTab: SwitchTab,
	  AutoParse: AutoParse,
	  mask: mask,
	  loadingMask: loadingMask,
	  Dialog: Dialog,
	  Confirm: Confirm,
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

	var Class = __webpack_require__(2),
	    Events = __webpack_require__(4),
	    Base = __webpack_require__(5),
	    _ = __webpack_require__(3);

	var K = {
	  Class: Class,
	  Events: Events,
	  Base: Base,
	  _: _
	}

	module.exports = K;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 模拟javascript的oo实现
	 * base
	 * var instance = Class.create({
	 * 	name: 'kkdashu',
	 * 	age: 28
	 * });
	 * console.assert(instance.name, 'kkdashu');
	 * console.assert(instance.age,  28);
	 *
	 *
	 * var Person = Class.extend({
	 *   say: function() {
	 *    console.log('My name is ' + this.name);
	 *   }
	 * });
	 *
	 * var kkdashu = Person.create({
	 * 		name: 'kkdashu'
	 * 		show: function() {
	 * 	 		console.log(this.name);
	 * 	  }
	 * 	});
	 *
	 * //通过extend实现继承效果
	 * //extend会把属性或者方法附加到构造函数的原型上
	 * //create会把属性附加到实例对象上（会覆盖掉原型上的属性）
	 * var Student = Person.extend({
	 * 	grade: '2'
	 * });
	 * var s = Student.create({
	 * 	name: 'wmeng',
	 * 	age: 28,
	 * 	grade: 11
	 * });
	 *
	 * console.assert(s.name, 'wmeng');
	 * console.assert(s.age, 28);
	 * console.assert(s.grade, 11);
	 *
	 *
	 **/

	var _ = __webpack_require__(3);

	function Class(){

	}

	Class.extend = function() {
	  var Constructor = this;

	  //返回的构造函数
	  function SubClass() {
	    //获取调用create方法时传递过来的参数
	    var properties = _.toArray(arguments);
	    var property;
	    while(property = properties.shift()) {
	      _.extend(this, property);
	    }
	    if(this.constructor === SubClass && this.initialize){
	      this.initialize.apply(this);
	    }
	  }
	  //继承当前类
	  SubClass.prototype = new Constructor();
	  //修正constructor属性
	  SubClass.prototype.constructor = SubClass;
	  //调用extend时把所有传过来的属性与方法赋值给原型
	  var properties = _.toArray(arguments);
	  mixin(SubClass.prototype, properties);
	  SubClass.extend = Class.extend;
	  SubClass.create = Class.create;
	  return SubClass;
	};

	Class.create = function() {
	  var arg = {}, par, p;
	  for(var i = 0, length = arguments.length;i < length; i++) {
	    par = arguments[i];
	    for(p in par) {
	      if(par.hasOwnProperty(p)) {
	        arg[p] = par[p];
	      }
	    }
	  }
	  // this可能是Ｃlass或者SubClass
	  if(this == Class){
	    return new _Class(arg);
	  }
	  return new this(arg);
	};

	var _Class = Class.extend({});

	function mixin(prototype, mixins) {
	  var unionProperty = union(prototype, mixins);
	  _.extend(prototype, unionProperty);
	}

	function union(prototype, properties) {
	  if(!properties.length || properties.length === 0) {
	    return {};
	  }
	  // if(properties.length == 1) {
	  //   return properties[0];
	  // }
	  var result = {};
	  var property;
	  while(property = properties.shift()) {
	    for(var p in property) {
	      if(!property.hasOwnProperty(p)) { break; }
	      var v = property[p];
	      if(result[p]) {
	        v = _.extend(v, result[p]);
	      }
	      //如果是events则遍历原型链 组合所有的events
	      if(p === 'events') {
	        var events = prototype[p];
	        if(events) {
	          v = _.extend(v, events);
	        }
	      }
	      result[p] = v;
	    }
	  }
	  return result;
	}

	module.exports = Class;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	  // Baseline setup
	  // --------------

	// Establish the root object, `window` (`self`) in the browser, `global`
	// on the server, or `this` in some virtual machines. We use `self`
	// instead of `window` for `WebWorker` support.
	var root = typeof self === 'object' && self.self === self && self ||
	          typeof global === 'object' && global.global === global && global ||
	          this;

	// Save the previous value of the `_` variable.
	var previousUnderscore = root._;

	// Save bytes in the minified (but not gzipped) version:
	var ArrayProto = Array.prototype, ObjProto = Object.prototype;

	// Create quick reference variables for speed access to core prototypes.
	var
	  push = ArrayProto.push,
	  slice = ArrayProto.slice,
	  toString = ObjProto.toString,
	  hasOwnProperty = ObjProto.hasOwnProperty;

	// All **ECMAScript 5** native function implementations that we hope to use
	// are declared here.
	var
	  nativeIsArray = Array.isArray,
	  nativeKeys = Object.keys,
	  nativeCreate = Object.create;

	// Naked function reference for surrogate-prototype-swapping.
	var Ctor = function(){};

	// Create a safe reference to the Underscore object for use below.
	var _ = function(obj) {
	  if (obj instanceof _) return obj;
	  if (!(this instanceof _)) return new _(obj);
	  this._wrapped = obj;
	};

	// Export the Underscore object for **Node.js**, with
	// backwards-compatibility for their old module API. If we're in
	// the browser, add `_` as a global object.
	if (true) {
	  if (typeof module !== 'undefined' && module.exports) {
	    exports = module.exports = _;
	  }
	  exports._ = _;
	} else {
	  root._ = _;
	}

	// Current version.
	_.VERSION = '1.8.3';

	// Internal function that returns an efficient (for current engines) version
	// of the passed-in callback, to be repeatedly applied in other Underscore
	// functions.
	var optimizeCb = function(func, context, argCount) {
	  if (context === void 0) return func;
	  switch (argCount == null ? 3 : argCount) {
	    case 1: return function(value) {
	      return func.call(context, value);
	    };
	    // The 2-parameter case has been omitted only because no current consumers
	    // made use of it.
	    case 3: return function(value, index, collection) {
	      return func.call(context, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(context, accumulator, value, index, collection);
	    };
	  }
	  return function() {
	    return func.apply(context, arguments);
	  };
	};

	// A mostly-internal function to generate callbacks that can be applied
	// to each element in a collection, returning the desired result — either
	// `identity`, an arbitrary callback, a property matcher, or a property accessor.
	var cb = function(value, context, argCount) {
	  if (value == null) return _.identity;
	  if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	  if (_.isObject(value)) return _.matcher(value);
	  return _.property(value);
	};

	_.iteratee = function(value, context) {
	  return cb(value, context, Infinity);
	};

	// Similar to ES6's rest param (http://ariya.ofilabs.com/2013/03/es6-and-rest-parameter.html)
	// This accumulates the arguments passed into an array, after a given index.
	var restArgs = function(func, startIndex) {
	  startIndex = startIndex == null ? func.length - 1 : +startIndex;
	  return function() {
	    var length = Math.max(arguments.length - startIndex, 0);
	    var rest = Array(length);
	    for (var index = 0; index < length; index++) {
	      rest[index] = arguments[index + startIndex];
	    }
	    switch (startIndex) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, arguments[0], rest);
	      case 2: return func.call(this, arguments[0], arguments[1], rest);
	    }
	    var args = Array(startIndex + 1);
	    for (index = 0; index < startIndex; index++) {
	      args[index] = arguments[index];
	    }
	    args[startIndex] = rest;
	    return func.apply(this, args);
	  };
	};

	// An internal function for creating a new object that inherits from another.
	var baseCreate = function(prototype) {
	  if (!_.isObject(prototype)) return {};
	  if (nativeCreate) return nativeCreate(prototype);
	  Ctor.prototype = prototype;
	  var result = new Ctor;
	  Ctor.prototype = null;
	  return result;
	};

	var property = function(key) {
	  return function(obj) {
	    return obj == null ? void 0 : obj[key];
	  };
	};

	// Helper for collection methods to determine whether a collection
	// should be iterated as an array or as an object.
	// Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	var getLength = property('length');
	var isArrayLike = function(collection) {
	  var length = getLength(collection);
	  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	};

	// Collection Functions
	// --------------------

	// The cornerstone, an `each` implementation, aka `forEach`.
	// Handles raw objects in addition to array-likes. Treats all
	// sparse array-likes as if they were dense.
	_.each = _.forEach = function(obj, iteratee, context) {
	  iteratee = optimizeCb(iteratee, context);
	  var i, length;
	  if (isArrayLike(obj)) {
	    for (i = 0, length = obj.length; i < length; i++) {
	      iteratee(obj[i], i, obj);
	    }
	  } else {
	    var keys = _.keys(obj);
	    for (i = 0, length = keys.length; i < length; i++) {
	      iteratee(obj[keys[i]], keys[i], obj);
	    }
	  }
	  return obj;
	};

	// Return the results of applying the iteratee to each element.
	_.map = _.collect = function(obj, iteratee, context) {
	  iteratee = cb(iteratee, context);
	  var keys = !isArrayLike(obj) && _.keys(obj),
	      length = (keys || obj).length,
	      results = Array(length);
	  for (var index = 0; index < length; index++) {
	    var currentKey = keys ? keys[index] : index;
	    results[index] = iteratee(obj[currentKey], currentKey, obj);
	  }
	  return results;
	};

	// Create a reducing function iterating left or right.
	var createReduce = function(dir) {
	  // Optimized iterator function as using arguments.length
	  // in the main function will deoptimize the, see #1991.
	  var reducer = function(obj, iteratee, memo, initial) {
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        index = dir > 0 ? 0 : length - 1;
	    if (!initial) {
	      memo = obj[keys ? keys[index] : index];
	      index += dir;
	    }
	    for (; index >= 0 && index < length; index += dir) {
	      var currentKey = keys ? keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };

	  return function(obj, iteratee, memo, context) {
	    var initial = arguments.length >= 3;
	    return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
	  };
	};

	// **Reduce** builds up a single result from a list of values, aka `inject`,
	// or `foldl`.
	_.reduce = _.foldl = _.inject = createReduce(1);

	// The right-associative version of reduce, also known as `foldr`.
	_.reduceRight = _.foldr = createReduce(-1);

	// Return the first value which passes a truth test. Aliased as `detect`.
	_.find = _.detect = function(obj, predicate, context) {
	  var key;
	  if (isArrayLike(obj)) {
	    key = _.findIndex(obj, predicate, context);
	  } else {
	    key = _.findKey(obj, predicate, context);
	  }
	  if (key !== void 0 && key !== -1) return obj[key];
	};

	// Return all the elements that pass a truth test.
	// Aliased as `select`.
	_.filter = _.select = function(obj, predicate, context) {
	  var results = [];
	  predicate = cb(predicate, context);
	  _.each(obj, function(value, index, list) {
	    if (predicate(value, index, list)) results.push(value);
	  });
	  return results;
	};

	// Return all the elements for which a truth test fails.
	_.reject = function(obj, predicate, context) {
	  return _.filter(obj, _.negate(cb(predicate)), context);
	};

	// Determine whether all of the elements match a truth test.
	// Aliased as `all`.
	_.every = _.all = function(obj, predicate, context) {
	  predicate = cb(predicate, context);
	  var keys = !isArrayLike(obj) && _.keys(obj),
	      length = (keys || obj).length;
	  for (var index = 0; index < length; index++) {
	    var currentKey = keys ? keys[index] : index;
	    if (!predicate(obj[currentKey], currentKey, obj)) return false;
	  }
	  return true;
	};

	// Determine if at least one element in the object matches a truth test.
	// Aliased as `any`.
	_.some = _.any = function(obj, predicate, context) {
	  predicate = cb(predicate, context);
	  var keys = !isArrayLike(obj) && _.keys(obj),
	      length = (keys || obj).length;
	  for (var index = 0; index < length; index++) {
	    var currentKey = keys ? keys[index] : index;
	    if (predicate(obj[currentKey], currentKey, obj)) return true;
	  }
	  return false;
	};

	// Determine if the array or object contains a given item (using `===`).
	// Aliased as `includes` and `include`.
	_.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	  if (!isArrayLike(obj)) obj = _.values(obj);
	  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	  return _.indexOf(obj, item, fromIndex) >= 0;
	};

	// Invoke a method (with arguments) on every item in a collection.
	_.invoke = restArgs(function(obj, method, args) {
	  var isFunc = _.isFunction(method);
	  return _.map(obj, function(value) {
	    var func = isFunc ? method : value[method];
	    return func == null ? func : func.apply(value, args);
	  });
	});

	// Convenience version of a common use case of `map`: fetching a property.
	_.pluck = function(obj, key) {
	  return _.map(obj, _.property(key));
	};

	// Convenience version of a common use case of `filter`: selecting only objects
	// containing specific `key:value` pairs.
	_.where = function(obj, attrs) {
	  return _.filter(obj, _.matcher(attrs));
	};

	// Convenience version of a common use case of `find`: getting the first object
	// containing specific `key:value` pairs.
	_.findWhere = function(obj, attrs) {
	  return _.find(obj, _.matcher(attrs));
	};

	// Return the maximum element (or element-based computation).
	_.max = function(obj, iteratee, context) {
	  var result = -Infinity, lastComputed = -Infinity,
	      value, computed;
	  if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
	    obj = isArrayLike(obj) ? obj : _.values(obj);
	    for (var i = 0, length = obj.length; i < length; i++) {
	      value = obj[i];
	      if (value > result) {
	        result = value;
	      }
	    }
	  } else {
	    iteratee = cb(iteratee, context);
	    _.each(obj, function(v, index, list) {
	      computed = iteratee(v, index, list);
	      if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	        result = v;
	        lastComputed = computed;
	      }
	    });
	  }
	  return result;
	};

	// Return the minimum element (or element-based computation).
	_.min = function(obj, iteratee, context) {
	  var result = Infinity, lastComputed = Infinity,
	      value, computed;
	  if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
	    obj = isArrayLike(obj) ? obj : _.values(obj);
	    for (var i = 0, length = obj.length; i < length; i++) {
	      value = obj[i];
	      if (value < result) {
	        result = value;
	      }
	    }
	  } else {
	    iteratee = cb(iteratee, context);
	    _.each(obj, function(v, index, list) {
	      computed = iteratee(v, index, list);
	      if (computed < lastComputed || computed === Infinity && result === Infinity) {
	        result = v;
	        lastComputed = computed;
	      }
	    });
	  }
	  return result;
	};

	// Shuffle a collection.
	_.shuffle = function(obj) {
	  return _.sample(obj, Infinity);
	};

	// Sample **n** random values from a collection using the modern version of the
	// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	// If **n** is not specified, returns a single random element.
	// The internal `guard` argument allows it to work with `map`.
	_.sample = function(obj, n, guard) {
	  if (n == null || guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    return obj[_.random(obj.length - 1)];
	  }
	  var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
	  var length = getLength(sample);
	  n = Math.max(Math.min(n, length), 0);
	  var last = length - 1;
	  for (var index = 0; index < n; index++) {
	    var rand = _.random(index, last);
	    var temp = sample[index];
	    sample[index] = sample[rand];
	    sample[rand] = temp;
	  }
	  return sample.slice(0, n);
	};

	// Sort the object's values by a criterion produced by an iteratee.
	_.sortBy = function(obj, iteratee, context) {
	  var index = 0;
	  iteratee = cb(iteratee, context);
	  return _.pluck(_.map(obj, function(value, key, list) {
	    return {
	      value: value,
	      index: index++,
	      criteria: iteratee(value, key, list)
	    };
	  }).sort(function(left, right) {
	    var a = left.criteria;
	    var b = right.criteria;
	    if (a !== b) {
	      if (a > b || a === void 0) return 1;
	      if (a < b || b === void 0) return -1;
	    }
	    return left.index - right.index;
	  }), 'value');
	};

	// An internal function used for aggregate "group by" operations.
	var group = function(behavior, partition) {
	  return function(obj, iteratee, context) {
	    var result = partition ? [[], []] : {};
	    iteratee = cb(iteratee, context);
	    _.each(obj, function(value, index) {
	      var key = iteratee(value, index, obj);
	      behavior(result, value, key);
	    });
	    return result;
	  };
	};

	// Groups the object's values by a criterion. Pass either a string attribute
	// to group by, or a function that returns the criterion.
	_.groupBy = group(function(result, value, key) {
	  if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	});

	// Indexes the object's values by a criterion, similar to `groupBy`, but for
	// when you know that your index values will be unique.
	_.indexBy = group(function(result, value, key) {
	  result[key] = value;
	});

	// Counts instances of an object that group by a certain criterion. Pass
	// either a string attribute to count by, or a function that returns the
	// criterion.
	_.countBy = group(function(result, value, key) {
	  if (_.has(result, key)) result[key]++; else result[key] = 1;
	});

	// Safely create a real, live array from anything iterable.
	_.toArray = function(obj) {
	  if (!obj) return [];
	  if (_.isArray(obj)) return slice.call(obj);
	  if (isArrayLike(obj)) return _.map(obj, _.identity);
	  return _.values(obj);
	};

	// Return the number of elements in an object.
	_.size = function(obj) {
	  if (obj == null) return 0;
	  return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	};

	// Split a collection into two arrays: one whose elements all satisfy the given
	// predicate, and one whose elements all do not satisfy the predicate.
	_.partition = group(function(result, value, pass) {
	  result[pass ? 0 : 1].push(value);
	}, true);

	// Array Functions
	// ---------------

	// Get the first element of an array. Passing **n** will return the first N
	// values in the array. Aliased as `head` and `take`. The **guard** check
	// allows it to work with `_.map`.
	_.first = _.head = _.take = function(array, n, guard) {
	  if (array == null) return void 0;
	  if (n == null || guard) return array[0];
	  return _.initial(array, array.length - n);
	};

	// Returns everything but the last entry of the array. Especially useful on
	// the arguments object. Passing **n** will return all the values in
	// the array, excluding the last N.
	_.initial = function(array, n, guard) {
	  return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	};

	// Get the last element of an array. Passing **n** will return the last N
	// values in the array.
	_.last = function(array, n, guard) {
	  if (array == null) return void 0;
	  if (n == null || guard) return array[array.length - 1];
	  return _.rest(array, Math.max(0, array.length - n));
	};

	// Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	// Especially useful on the arguments object. Passing an **n** will return
	// the rest N values in the array.
	_.rest = _.tail = _.drop = function(array, n, guard) {
	  return slice.call(array, n == null || guard ? 1 : n);
	};

	// Trim out all falsy values from an array.
	_.compact = function(array) {
	  return _.filter(array, _.identity);
	};

	// Internal implementation of a recursive `flatten` function.
	var flatten = function(input, shallow, strict, output) {
	  output = output || [];
	  var idx = output.length;
	  for (var i = 0, length = getLength(input); i < length; i++) {
	    var value = input[i];
	    if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	      //flatten current level of array or arguments object
	      if (shallow) {
	        var j = 0, len = value.length;
	        while (j < len) output[idx++] = value[j++];
	      } else {
	        flatten(value, shallow, strict, output);
	        idx = output.length;
	      }
	    } else if (!strict) {
	      output[idx++] = value;
	    }
	  }
	  return output;
	};

	// Flatten out an array, either recursively (by default), or just one level.
	_.flatten = function(array, shallow) {
	  return flatten(array, shallow, false);
	};

	// Return a version of the array that does not contain the specified value(s).
	_.without = restArgs(function(array, otherArrays) {
	  return _.difference(array, otherArrays);
	});

	// Produce a duplicate-free version of the array. If the array has already
	// been sorted, you have the option of using a faster algorithm.
	// Aliased as `unique`.
	_.uniq = _.unique = function(array, isSorted, iteratee, context) {
	  if (!_.isBoolean(isSorted)) {
	    context = iteratee;
	    iteratee = isSorted;
	    isSorted = false;
	  }
	  if (iteratee != null) iteratee = cb(iteratee, context);
	  var result = [];
	  var seen = [];
	  for (var i = 0, length = getLength(array); i < length; i++) {
	    var value = array[i],
	        computed = iteratee ? iteratee(value, i, array) : value;
	    if (isSorted) {
	      if (!i || seen !== computed) result.push(value);
	      seen = computed;
	    } else if (iteratee) {
	      if (!_.contains(seen, computed)) {
	        seen.push(computed);
	        result.push(value);
	      }
	    } else if (!_.contains(result, value)) {
	      result.push(value);
	    }
	  }
	  return result;
	};

	// Produce an array that contains the union: each distinct element from all of
	// the passed-in arrays.
	_.union = restArgs(function(arrays) {
	  return _.uniq(flatten(arrays, true, true));
	});

	// Produce an array that contains every item shared between all the
	// passed-in arrays.
	_.intersection = function(array) {
	  var result = [];
	  var argsLength = arguments.length;
	  for (var i = 0, length = getLength(array); i < length; i++) {
	    var item = array[i];
	    if (_.contains(result, item)) continue;
	    var j;
	    for (j = 1; j < argsLength; j++) {
	      if (!_.contains(arguments[j], item)) break;
	    }
	    if (j === argsLength) result.push(item);
	  }
	  return result;
	};

	// Take the difference between one array and a number of other arrays.
	// Only the elements present in just the first array will remain.
	_.difference = restArgs(function(array, rest) {
	  rest = flatten(rest, true, true);
	  return _.filter(array, function(value){
	    return !_.contains(rest, value);
	  });
	});

	// Complement of _.zip. Unzip accepts an array of arrays and groups
	// each array's elements on shared indices
	_.unzip = function(array) {
	  var length = array && _.max(array, getLength).length || 0;
	  var result = Array(length);

	  for (var index = 0; index < length; index++) {
	    result[index] = _.pluck(array, index);
	  }
	  return result;
	};

	// Zip together multiple lists into a single array -- elements that share
	// an index go together.
	_.zip = restArgs(_.unzip);

	// Converts lists into objects. Pass either a single array of `[key, value]`
	// pairs, or two parallel arrays of the same length -- one of keys, and one of
	// the corresponding values.
	_.object = function(list, values) {
	  var result = {};
	  for (var i = 0, length = getLength(list); i < length; i++) {
	    if (values) {
	      result[list[i]] = values[i];
	    } else {
	      result[list[i][0]] = list[i][1];
	    }
	  }
	  return result;
	};

	// Generator function to create the findIndex and findLastIndex functions
	var createPredicateIndexFinder = function(dir) {
	  return function(array, predicate, context) {
	    predicate = cb(predicate, context);
	    var length = getLength(array);
	    var index = dir > 0 ? 0 : length - 1;
	    for (; index >= 0 && index < length; index += dir) {
	      if (predicate(array[index], index, array)) return index;
	    }
	    return -1;
	  };
	};

	// Returns the first index on an array-like that passes a predicate test
	_.findIndex = createPredicateIndexFinder(1);
	_.findLastIndex = createPredicateIndexFinder(-1);

	// Use a comparator function to figure out the smallest index at which
	// an object should be inserted so as to maintain order. Uses binary search.
	_.sortedIndex = function(array, obj, iteratee, context) {
	  iteratee = cb(iteratee, context, 1);
	  var value = iteratee(obj);
	  var low = 0, high = getLength(array);
	  while (low < high) {
	    var mid = Math.floor((low + high) / 2);
	    if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	  }
	  return low;
	};

	// Generator function to create the indexOf and lastIndexOf functions
	var createIndexFinder = function(dir, predicateFind, sortedIndex) {
	  return function(array, item, idx) {
	    var i = 0, length = getLength(array);
	    if (typeof idx == 'number') {
	      if (dir > 0) {
	        i = idx >= 0 ? idx : Math.max(idx + length, i);
	      } else {
	        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	      }
	    } else if (sortedIndex && idx && length) {
	      idx = sortedIndex(array, item);
	      return array[idx] === item ? idx : -1;
	    }
	    if (item !== item) {
	      idx = predicateFind(slice.call(array, i, length), _.isNaN);
	      return idx >= 0 ? idx + i : -1;
	    }
	    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	      if (array[idx] === item) return idx;
	    }
	    return -1;
	  };
	};

	// Return the position of the first occurrence of an item in an array,
	// or -1 if the item is not included in the array.
	// If the array is large and already in sort order, pass `true`
	// for **isSorted** to use binary search.
	_.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	_.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	// Generate an integer Array containing an arithmetic progression. A port of
	// the native Python `range()` function. See
	// [the Python documentation](http://docs.python.org/library/functions.html#range).
	_.range = function(start, stop, step) {
	  if (stop == null) {
	    stop = start || 0;
	    start = 0;
	  }
	  step = step || 1;

	  var length = Math.max(Math.ceil((stop - start) / step), 0);
	  var range = Array(length);

	  for (var idx = 0; idx < length; idx++, start += step) {
	    range[idx] = start;
	  }

	  return range;
	};

	// Split an **array** into several arrays containing **count** or less elements
	// of initial array
	_.chunk = function(array, count) {
	  if (count == null || count < 1) return [];

	  var result = [];
	  var i = 0, length = array.length;
	  while (i < length) {
	    result.push(slice.call(array, i, i += count));
	  }
	  return result;
	};

	// Function (ahem) Functions
	// ------------------

	// Determines whether to execute a function as a constructor
	// or a normal function with the provided arguments
	var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	  var self = baseCreate(sourceFunc.prototype);
	  var result = sourceFunc.apply(self, args);
	  if (_.isObject(result)) return result;
	  return self;
	};

	// Create a function bound to a given object (assigning `this`, and arguments,
	// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	// available.
	_.bind = restArgs(function(func, context, args) {
	  if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	  var bound = restArgs(function(callArgs) {
	    return executeBound(func, bound, context, this, args.concat(callArgs));
	  });
	  return bound;
	});

	// Partially apply a function by creating a version that has had some of its
	// arguments pre-filled, without changing its dynamic `this` context. _ acts
	// as a placeholder by default, allowing any combination of arguments to be
	// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
	_.partial = restArgs(function(func, boundArgs) {
	  var placeholder = _.partial.placeholder;
	  var bound = function() {
	    var position = 0, length = boundArgs.length;
	    var args = Array(length);
	    for (var i = 0; i < length; i++) {
	      args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
	    }
	    while (position < arguments.length) args.push(arguments[position++]);
	    return executeBound(func, bound, this, this, args);
	  };
	  return bound;
	});

	_.partial.placeholder = _;

	// Bind a number of an object's methods to that object. Remaining arguments
	// are the method names to be bound. Useful for ensuring that all callbacks
	// defined on an object belong to it.
	_.bindAll = restArgs(function(obj, keys) {
	  keys = flatten(keys, false, false);
	  var index = keys.length;
	  if (index < 1) throw new Error('bindAll must be passed function names');
	  while (index--) {
	    var key = keys[index];
	    obj[key] = _.bind(obj[key], obj);
	  }
	});

	// Memoize an expensive function by storing its results.
	_.memoize = function(func, hasher) {
	  var memoize = function(key) {
	    var cache = memoize.cache;
	    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	    if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	    return cache[address];
	  };
	  memoize.cache = {};
	  return memoize;
	};

	// Delays a function for the given number of milliseconds, and then calls
	// it with the arguments supplied.
	_.delay = restArgs(function(func, wait, args) {
	  return setTimeout(function(){
	    return func.apply(null, args);
	  }, wait);
	});

	// Defers a function, scheduling it to run after the current call stack has
	// cleared.
	_.defer = _.partial(_.delay, _, 1);

	// Returns a function, that, when invoked, will only be triggered at most once
	// during a given window of time. Normally, the throttled function will run
	// as much as it can, without ever going more than once per `wait` duration;
	// but if you'd like to disable the execution on the leading edge, pass
	// `{leading: false}`. To disable execution on the trailing edge, ditto.
	_.throttle = function(func, wait, options) {
	  var context, args, result;
	  var timeout = null;
	  var previous = 0;
	  if (!options) options = {};
	  var later = function() {
	    previous = options.leading === false ? 0 : _.now();
	    timeout = null;
	    result = func.apply(context, args);
	    if (!timeout) context = args = null;
	  };
	  return function() {
	    var now = _.now();
	    if (!previous && options.leading === false) previous = now;
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      if (timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }
	      previous = now;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    } else if (!timeout && options.trailing !== false) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	};

	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	_.debounce = function(func, wait, immediate) {
	  var timeout, args, context, timestamp, result;

	  var later = function() {
	    var last = _.now() - timestamp;

	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    }
	  };

	  return function() {
	    context = this;
	    args = arguments;
	    timestamp = _.now();
	    var callNow = immediate && !timeout;
	    if (!timeout) timeout = setTimeout(later, wait);
	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }

	    return result;
	  };
	};

	// Returns the first function passed as an argument to the second,
	// allowing you to adjust arguments, run code before and after, and
	// conditionally execute the original function.
	_.wrap = function(func, wrapper) {
	  return _.partial(wrapper, func);
	};

	// Returns a negated version of the passed-in predicate.
	_.negate = function(predicate) {
	  return function() {
	    return !predicate.apply(this, arguments);
	  };
	};

	// Returns a function that is the composition of a list of functions, each
	// consuming the return value of the function that follows.
	_.compose = function() {
	  var args = arguments;
	  var start = args.length - 1;
	  return function() {
	    var i = start;
	    var result = args[start].apply(this, arguments);
	    while (i--) result = args[i].call(this, result);
	    return result;
	  };
	};

	// Returns a function that will only be executed on and after the Nth call.
	_.after = function(times, func) {
	  return function() {
	    if (--times < 1) {
	      return func.apply(this, arguments);
	    }
	  };
	};

	// Returns a function that will only be executed up to (but not including) the Nth call.
	_.before = function(times, func) {
	  var memo;
	  return function() {
	    if (--times > 0) {
	      memo = func.apply(this, arguments);
	    }
	    if (times <= 1) func = null;
	    return memo;
	  };
	};

	// Returns a function that will be executed at most one time, no matter how
	// often you call it. Useful for lazy initialization.
	_.once = _.partial(_.before, 2);

	_.restArgs = restArgs;

	// Object Functions
	// ----------------

	// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	var collectNonEnumProps = function(obj, keys) {
	  var nonEnumIdx = nonEnumerableProps.length;
	  var constructor = obj.constructor;
	  var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

	  // Constructor is a special case.
	  var prop = 'constructor';
	  if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	  while (nonEnumIdx--) {
	    prop = nonEnumerableProps[nonEnumIdx];
	    if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	      keys.push(prop);
	    }
	  }
	};

	// Retrieve the names of an object's own properties.
	// Delegates to **ECMAScript 5**'s native `Object.keys`
	_.keys = function(obj) {
	  if (!_.isObject(obj)) return [];
	  if (nativeKeys) return nativeKeys(obj);
	  var keys = [];
	  for (var key in obj) if (_.has(obj, key)) keys.push(key);
	  // Ahem, IE < 9.
	  if (hasEnumBug) collectNonEnumProps(obj, keys);
	  return keys;
	};

	// Retrieve all the property names of an object.
	_.allKeys = function(obj) {
	  if (!_.isObject(obj)) return [];
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  // Ahem, IE < 9.
	  if (hasEnumBug) collectNonEnumProps(obj, keys);
	  return keys;
	};

	// Retrieve the values of an object's properties.
	_.values = function(obj) {
	  var keys = _.keys(obj);
	  var length = keys.length;
	  var values = Array(length);
	  for (var i = 0; i < length; i++) {
	    values[i] = obj[keys[i]];
	  }
	  return values;
	};

	// Returns the results of applying the iteratee to each element of the object
	// In contrast to _.map it returns an object
	_.mapObject = function(obj, iteratee, context) {
	  iteratee = cb(iteratee, context);
	  var keys = _.keys(obj),
	    length = keys.length,
	    results = {};
	  for (var index = 0; index < length; index++) {
	    var currentKey = keys[index];
	    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	  }
	  return results;
	};

	// Convert an object into a list of `[key, value]` pairs.
	_.pairs = function(obj) {
	  var keys = _.keys(obj);
	  var length = keys.length;
	  var pairs = Array(length);
	  for (var i = 0; i < length; i++) {
	    pairs[i] = [keys[i], obj[keys[i]]];
	  }
	  return pairs;
	};

	// Invert the keys and values of an object. The values must be serializable.
	_.invert = function(obj) {
	  var result = {};
	  var keys = _.keys(obj);
	  for (var i = 0, length = keys.length; i < length; i++) {
	    result[obj[keys[i]]] = keys[i];
	  }
	  return result;
	};

	// Return a sorted list of the function names available on the object.
	// Aliased as `methods`
	_.functions = _.methods = function(obj) {
	  var names = [];
	  for (var key in obj) {
	    if (_.isFunction(obj[key])) names.push(key);
	  }
	  return names.sort();
	};

	// An internal function for creating assigner functions.
	var createAssigner = function(keysFunc, defaults) {
	  return function(obj) {
	    var length = arguments.length;
	    if (defaults) obj = Object(obj);
	    if (length < 2 || obj == null) return obj;
	    for (var index = 1; index < length; index++) {
	      var source = arguments[index],
	          keys = keysFunc(source),
	          l = keys.length;
	      for (var i = 0; i < l; i++) {
	        var key = keys[i];
	        if (!defaults || obj[key] === void 0) obj[key] = source[key];
	      }
	    }
	    return obj;
	  };
	};

	// Extend a given object with all the properties in passed-in object(s).
	_.extend = createAssigner(_.allKeys);

	// Assigns a given object with all the own properties in the passed-in object(s)
	// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	_.extendOwn = _.assign = createAssigner(_.keys);

	// Returns the first key on an object that passes a predicate test
	_.findKey = function(obj, predicate, context) {
	  predicate = cb(predicate, context);
	  var keys = _.keys(obj), key;
	  for (var i = 0, length = keys.length; i < length; i++) {
	    key = keys[i];
	    if (predicate(obj[key], key, obj)) return key;
	  }
	};

	// Internal pick helper function to determine if `obj` has key `key`.
	var keyInObj = function(value, key, obj) {
	  return key in obj;
	};

	// Return a copy of the object only containing the whitelisted properties.
	_.pick = restArgs(function(obj, keys) {
	  var result = {}, iteratee = keys[0];
	  if (obj == null) return result;
	  if (_.isFunction(iteratee)) {
	    if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
	    keys = _.allKeys(obj);
	  } else {
	    iteratee = keyInObj;
	    keys = flatten(keys, false, false);
	    obj = Object(obj);
	  }
	  for (var i = 0, length = keys.length; i < length; i++) {
	    var key = keys[i];
	    var value = obj[key];
	    if (iteratee(value, key, obj)) result[key] = value;
	  }
	  return result;
	});

	 // Return a copy of the object without the blacklisted properties.
	_.omit = restArgs(function(obj, keys) {
	  var iteratee = keys[0], context;
	  if (_.isFunction(iteratee)) {
	    iteratee = _.negate(iteratee);
	    if (keys.length > 1) context = keys[1];
	  } else {
	    keys = _.map(flatten(keys, false, false), String);
	    iteratee = function(value, key) {
	      return !_.contains(keys, key);
	    };
	  }
	  return _.pick(obj, iteratee, context);
	});

	// Fill in a given object with default properties.
	_.defaults = createAssigner(_.allKeys, true);

	// Creates an object that inherits from the given prototype object.
	// If additional properties are provided then they will be added to the
	// created object.
	_.create = function(prototype, props) {
	  var result = baseCreate(prototype);
	  if (props) _.extendOwn(result, props);
	  return result;
	};

	// Create a (shallow-cloned) duplicate of an object.
	_.clone = function(obj) {
	  if (!_.isObject(obj)) return obj;
	  return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	};

	// Invokes interceptor with the obj, and then returns obj.
	// The primary purpose of this method is to "tap into" a method chain, in
	// order to perform operations on intermediate results within the chain.
	_.tap = function(obj, interceptor) {
	  interceptor(obj);
	  return obj;
	};

	// Returns whether an object has a given set of `key:value` pairs.
	_.isMatch = function(object, attrs) {
	  var keys = _.keys(attrs), length = keys.length;
	  if (object == null) return !length;
	  var obj = Object(object);
	  for (var i = 0; i < length; i++) {
	    var key = keys[i];
	    if (attrs[key] !== obj[key] || !(key in obj)) return false;
	  }
	  return true;
	};


	// Internal recursive comparison function for `isEqual`.
	var eq, deepEq;
	eq = function(a, b, aStack, bStack) {
	  // Identical objects are equal. `0 === -0`, but they aren't identical.
	  // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	  if (a === b) return a !== 0 || 1 / a === 1 / b;
	  // A strict comparison is necessary because `null == undefined`.
	  if (a == null || b == null) return a === b;
	  // `NaN`s are equivalent, but non-reflexive.
	  if (a !== a) return b !== b;
	  // Exhaust primitive checks
	  var type = typeof a;
	  if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false;
	  return deepEq(a, b, aStack, bStack);
	};

	// Internal recursive comparison function for `isEqual`.
	deepEq = function(a, b, aStack, bStack) {
	  // Unwrap any wrapped objects.
	  if (a instanceof _) a = a._wrapped;
	  if (b instanceof _) b = b._wrapped;
	  // Compare `[[Class]]` names.
	  var className = toString.call(a);
	  if (className !== toString.call(b)) return false;
	  switch (className) {
	    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	    case '[object RegExp]':
	    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	    case '[object String]':
	      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	      // equivalent to `new String("5")`.
	      return '' + a === '' + b;
	    case '[object Number]':
	      // `NaN`s are equivalent, but non-reflexive.
	      // Object(NaN) is equivalent to NaN
	      if (+a !== +a) return +b !== +b;
	      // An `egal` comparison is performed for other numeric values.
	      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	    case '[object Date]':
	    case '[object Boolean]':
	      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	      // millisecond representations. Note that invalid dates with millisecond representations
	      // of `NaN` are not equivalent.
	      return +a === +b;
	  }

	  var areArrays = className === '[object Array]';
	  if (!areArrays) {
	    if (typeof a != 'object' || typeof b != 'object') return false;

	    // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	    // from different frames are.
	    var aCtor = a.constructor, bCtor = b.constructor;
	    if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                             _.isFunction(bCtor) && bCtor instanceof bCtor)
	                        && ('constructor' in a && 'constructor' in b)) {
	      return false;
	    }
	  }
	  // Assume equality for cyclic structures. The algorithm for detecting cyclic
	  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	  // Initializing stack of traversed objects.
	  // It's done here since we only need them for objects and arrays comparison.
	  aStack = aStack || [];
	  bStack = bStack || [];
	  var length = aStack.length;
	  while (length--) {
	    // Linear search. Performance is inversely proportional to the number of
	    // unique nested structures.
	    if (aStack[length] === a) return bStack[length] === b;
	  }

	  // Add the first object to the stack of traversed objects.
	  aStack.push(a);
	  bStack.push(b);

	  // Recursively compare objects and arrays.
	  if (areArrays) {
	    // Compare array lengths to determine if a deep comparison is necessary.
	    length = a.length;
	    if (length !== b.length) return false;
	    // Deep compare the contents, ignoring non-numeric properties.
	    while (length--) {
	      if (!eq(a[length], b[length], aStack, bStack)) return false;
	    }
	  } else {
	    // Deep compare objects.
	    var keys = _.keys(a), key;
	    length = keys.length;
	    // Ensure that both objects contain the same number of properties before comparing deep equality.
	    if (_.keys(b).length !== length) return false;
	    while (length--) {
	      // Deep compare each member
	      key = keys[length];
	      if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	    }
	  }
	  // Remove the first object from the stack of traversed objects.
	  aStack.pop();
	  bStack.pop();
	  return true;
	};

	// Perform a deep comparison to check if two objects are equal.
	_.isEqual = function(a, b) {
	  return eq(a, b);
	};

	// Is a given array, string, or object empty?
	// An "empty" object has no enumerable own-properties.
	_.isEmpty = function(obj) {
	  if (obj == null) return true;
	  if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	  return _.keys(obj).length === 0;
	};

	// Is a given value a DOM element?
	_.isElement = function(obj) {
	  return !!(obj && obj.nodeType === 1);
	};

	// Is a given value an array?
	// Delegates to ECMA5's native Array.isArray
	_.isArray = nativeIsArray || function(obj) {
	  return toString.call(obj) === '[object Array]';
	};

	// Is a given variable an object?
	_.isObject = function(obj) {
	  var type = typeof obj;
	  return type === 'function' || type === 'object' && !!obj;
	};

	// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	  _['is' + name] = function(obj) {
	    return toString.call(obj) === '[object ' + name + ']';
	  };
	});

	// Define a fallback version of the method in browsers (ahem, IE < 9), where
	// there isn't any inspectable "Arguments" type.
	if (!_.isArguments(arguments)) {
	  _.isArguments = function(obj) {
	    return _.has(obj, 'callee');
	  };
	}

	// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	// IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
	var nodelist = root.document && root.document.childNodes;
	if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
	  _.isFunction = function(obj) {
	    return typeof obj == 'function' || false;
	  };
	}

	// Is a given object a finite number?
	_.isFinite = function(obj) {
	  return isFinite(obj) && !isNaN(parseFloat(obj));
	};

	// Is the given value `NaN`?
	_.isNaN = function(obj) {
	  return _.isNumber(obj) && isNaN(obj);
	};

	// Is a given value a boolean?
	_.isBoolean = function(obj) {
	  return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	};

	// Is a given value equal to null?
	_.isNull = function(obj) {
	  return obj === null;
	};

	// Is a given variable undefined?
	_.isUndefined = function(obj) {
	  return obj === void 0;
	};

	// Shortcut function for checking if an object has a given property directly
	// on itself (in other words, not on a prototype).
	_.has = function(obj, key) {
	  return obj != null && hasOwnProperty.call(obj, key);
	};

	// Utility Functions
	// -----------------

	// Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	// previous owner. Returns a reference to the Underscore object.
	_.noConflict = function() {
	  root._ = previousUnderscore;
	  return this;
	};

	// Keep the identity function around for default iteratees.
	_.identity = function(value) {
	  return value;
	};

	// Predicate-generating functions. Often useful outside of Underscore.
	_.constant = function(value) {
	  return function() {
	    return value;
	  };
	};

	_.noop = function(){};

	_.property = property;

	// Generates a function for a given object that returns a given property.
	_.propertyOf = function(obj) {
	  return obj == null ? function(){} : function(key) {
	    return obj[key];
	  };
	};

	// Returns a predicate for checking whether an object has a given set of
	// `key:value` pairs.
	_.matcher = _.matches = function(attrs) {
	  attrs = _.extendOwn({}, attrs);
	  return function(obj) {
	    return _.isMatch(obj, attrs);
	  };
	};

	// Run a function **n** times.
	_.times = function(n, iteratee, context) {
	  var accum = Array(Math.max(0, n));
	  iteratee = optimizeCb(iteratee, context, 1);
	  for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	  return accum;
	};

	// Return a random integer between min and max (inclusive).
	_.random = function(min, max) {
	  if (max == null) {
	    max = min;
	    min = 0;
	  }
	  return min + Math.floor(Math.random() * (max - min + 1));
	};

	// A (possibly faster) way to get the current timestamp as an integer.
	_.now = Date.now || function() {
	  return new Date().getTime();
	};

	 // List of HTML entities for escaping.
	var escapeMap = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;'
	};
	var unescapeMap = _.invert(escapeMap);

	// Functions for escaping and unescaping strings to/from HTML interpolation.
	var createEscaper = function(map) {
	  var escaper = function(match) {
	    return map[match];
	  };
	  // Regexes for identifying a key that needs to be escaped
	  var source = '(?:' + _.keys(map).join('|') + ')';
	  var testRegexp = RegExp(source);
	  var replaceRegexp = RegExp(source, 'g');
	  return function(string) {
	    string = string == null ? '' : '' + string;
	    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	  };
	};
	_.escape = createEscaper(escapeMap);
	_.unescape = createEscaper(unescapeMap);

	// If the value of the named `property` is a function then invoke it with the
	// `object` as context; otherwise, return it.
	_.result = function(object, prop, fallback) {
	  var value = object == null ? void 0 : object[prop];
	  if (value === void 0) {
	    value = fallback;
	  }
	  return _.isFunction(value) ? value.call(object) : value;
	};

	// Generate a unique integer id (unique within the entire client session).
	// Useful for temporary DOM ids.
	var idCounter = 0;
	_.uniqueId = function(prefix) {
	  var id = ++idCounter + '';
	  return prefix ? prefix + id : id;
	};

	// By default, Underscore uses ERB-style template delimiters, change the
	// following template settings to use alternative delimiters.
	_.templateSettings = {
	  evaluate: /<%([\s\S]+?)%>/g,
	  interpolate: /<%=([\s\S]+?)%>/g,
	  escape: /<%-([\s\S]+?)%>/g
	};

	// When customizing `templateSettings`, if you don't want to define an
	// interpolation, evaluation or escaping regex, we need one that is
	// guaranteed not to match.
	var noMatch = /(.)^/;

	// Certain characters need to be escaped so that they can be put into a
	// string literal.
	var escapes = {
	  "'": "'",
	  '\\': '\\',
	  '\r': 'r',
	  '\n': 'n',
	  '\u2028': 'u2028',
	  '\u2029': 'u2029'
	};

	var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

	var escapeChar = function(match) {
	  return '\\' + escapes[match];
	};

	// JavaScript micro-templating, similar to John Resig's implementation.
	// Underscore templating handles arbitrary delimiters, preserves whitespace,
	// and correctly escapes quotes within interpolated code.
	// NB: `oldSettings` only exists for backwards compatibility.
	_.template = function(text, settings, oldSettings) {
	  if (!settings && oldSettings) settings = oldSettings;
	  settings = _.defaults({}, settings, _.templateSettings);

	  // Combine delimiters into one regular expression via alternation.
	  var matcher = RegExp([
	    (settings.escape || noMatch).source,
	    (settings.interpolate || noMatch).source,
	    (settings.evaluate || noMatch).source
	  ].join('|') + '|$', 'g');

	  // Compile the template source, escaping string literals appropriately.
	  var index = 0;
	  var source = "__p+='";
	  text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
	    index = offset + match.length;

	    if (escape) {
	      source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	    } else if (interpolate) {
	      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	    } else if (evaluate) {
	      source += "';\n" + evaluate + "\n__p+='";
	    }

	    // Adobe VMs need the match returned to produce the correct offset.
	    return match;
	  });
	  source += "';\n";

	  // If a variable is not specified, place data values in local scope.
	  if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	  source = "var __t,__p='',__j=Array.prototype.join," +
	    "print=function(){__p+=__j.call(arguments,'');};\n" +
	    source + 'return __p;\n';

	  var render;
	  try {
	    render = new Function(settings.variable || 'obj', '_', source);
	  } catch (e) {
	    e.source = source;
	    throw e;
	  }

	  var template = function(data) {
	    return render.call(this, data, _);
	  };

	  // Provide the compiled source as a convenience for precompilation.
	  var argument = settings.variable || 'obj';
	  template.source = 'function(' + argument + '){\n' + source + '}';

	  return template;
	};

	// Add a "chain" function. Start chaining a wrapped Underscore object.
	_.chain = function(obj) {
	  var instance = _(obj);
	  instance._chain = true;
	  return instance;
	};

	// OOP
	// ---------------
	// If Underscore is called as a function, it returns a wrapped object that
	// can be used OO-style. This wrapper holds altered versions of all the
	// underscore functions. Wrapped objects may be chained.

	// Helper function to continue chaining intermediate results.
	var chainResult = function(instance, obj) {
	  return instance._chain ? _(obj).chain() : obj;
	};

	// Add your own custom functions to the Underscore object.
	_.mixin = function(obj) {
	  _.each(_.functions(obj), function(name) {
	    var func = _[name] = obj[name];
	    _.prototype[name] = function() {
	      var args = [this._wrapped];
	      push.apply(args, arguments);
	      return chainResult(this, func.apply(_, args));
	    };
	  });
	};

	// Add all of the Underscore functions to the wrapper object.
	_.mixin(_);

	// Add all mutator Array functions to the wrapper.
	_.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	  var method = ArrayProto[name];
	  _.prototype[name] = function() {
	    var obj = this._wrapped;
	    method.apply(obj, arguments);
	    if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	    return chainResult(this, obj);
	  };
	});

	// Add all accessor Array functions to the wrapper.
	_.each(['concat', 'join', 'slice'], function(name) {
	  var method = ArrayProto[name];
	  _.prototype[name] = function() {
	    return chainResult(this, method.apply(this._wrapped, arguments));
	  };
	});

	// Extracts the result from a wrapped and chained object.
	_.prototype.value = function() {
	  return this._wrapped;
	};

	// Provide unwrapping proxy for some methods used in engine operations
	// such as arithmetic and JSON stringification.
	_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	_.prototype.toString = function() {
	  return '' + this._wrapped;
	};

	// AMD registration happens at the end for compatibility with AMD loaders
	// that may not enforce next-turn semantics on modules. Even though general
	// practice for AMD registration is to be anonymous, underscore registers
	// as a named module because, like jQuery, it is a base library that is
	// popular enough to be bundled in a third party lib, but not be part of
	// an AMD load request. Those cases could generate an error when an
	// anonymous define() is called outside of a loader request.
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return _;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	module.exports = _;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3);
	var eventSplitter = /\s+/;



	function on(events, callback, context) {
	  var cache, event, list;
	  if(!callback) return this;
	  cache = this.__events || (this.__events = {});
	  events = events.split(eventSplitter);
	  while(event = events.shift()) {
	    list = cache[event] || (cache[event] = []);
	    list.push(callback, context);
	  }
	  return this;
	}

	function once(events, callback, context) {
	  var that = this;
	  var cb = function() {
	    that.off(events, cb);
	    callback.apply(context || that, arguments);
	  }
	  return this.on(events, cb, context);
	}

	function off(events, callback, context) {
	  var cache, event, list, i;
	  if(!(cache = this.__events)) return this;
	  if(!(events || callback || context)) {
	    delete this.__events;
	    return this;
	  }

	  events = events ?events.split(eventSplitter) : _.keys(cache);

	  while (event = events.shift()) {
	    list = cache[event];
	    if(!list) continue;
	    if(!(callback || context)) {
	      delete cache[event];
	      continue;
	    }

	    for(i = list.length -2; i>=0; i -= 2) {
	      if(!(callback && list[i] !== callback || context && list[i + 1]) !== context) {
	        list.splice(i, 2);
	      }
	    }
	  }
	  return this;
	}

	function trigger(events) {
	  var cache, event, all, list, i, len, rest = [], args, returned = true;
	  if(!(cache = this.__events)) return this;
	  events = events.split(eventSplitter);

	  for(i = 1, len = arguments.length; i < len; i++) {
	    rest[i -1] = arguments[i];
	  }

	  while(event = events.shift()) {
	    if(all = cache.all) all = all.slice();
	    if(list = cache[event]) list = list.slice();

	    if(event !== 'all') {
	      returned = triggerEvents(list, rest, this) && returned;
	    }

	    returned = triggerEvents(all, [event].concat(rest), this) && returned;
	  }

	  return returned;
	}


	function triggerEvents(list, args, context) {
	  var pass = true;
	  if(list) {
	    var i = 0,
	        l = list.length,
	        a1 = args[0],
	        a2 = args[1],
	        a3 = args[2];

	    switch(args.length) {
	      case 0:
	        for(; i < l; i += 2) {
	          pass = list[i].call(list[i + 1] || context) !== false && pass;
	        }
	        break;
	      case 1:
	        for(; i < l; i += 2) {
	          pass = list[i].call(list[i + 1] || context, a1) !== false && pass;
	        }
	        break;
	      case 2:
	        for(; i < l; i += 2) {
	          pass = list[i].call(list[i + 1] || context, a1, a2) !== false && pass;
	        }
	        break;
	      case 3:
	        for(; i < l; i += 2) {
	          pass = list[i].call(list[i + 1] || context, a1, a2, a3) !== false && pass;
	        }
	        break;
	      default:
	        for(; i < l; i += 2) {
	          pass = list[i].apply(list[i + 1] || context, args) !== false && pass;
	        }
	        break;
	    }
	  }
	  return pass;
	}
	function build() {
	  return {
	    on: on,
	    trigger: trigger,
	    once: once,
	    off: off
	  }
	}

	module.exports = build;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Events = __webpack_require__(4),
	    Class = __webpack_require__(2);

	module.exports = Class.extend(Events());


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Base, Component, _, autoParse, delegateEventSplitter, kyo;

	kyo = __webpack_require__(1);

	Base = kyo.Base;

	_ = kyo._;

	autoParse = __webpack_require__(7);

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
	    if (this.init && _.isFunction(this.init)) {
	      this.init();
	    }
	    if (this.notNeedRender) {
	      return this.render();
	    }
	  },
	  render: function(parentEl, show) {
	    this.model = null;
	    if (this.notNeedRender) {
	      return this._renderAfter();
	    }
	    if (arguments.length === 1 && typeof arguments[0] === 'boolean') {
	      show = parentEl;
	      parentEl = void 0;
	    }
	    if (this.isRender) {
	      this.clear();
	      this.isRender = false;
	    }
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
	    if (this.template && _.isFunction(this.template)) {
	      this.$el.html(this.template(this));
	    }
	    if (this.css) {
	      this.$el.css(this.css);
	    }
	    this._modelBefore();
	    this._model();
	    return this;
	  },
	  _modelBefore: function() {
	    if (this.modelBefore && _.isFunction(this.modelBefore)) {
	      return this.modelBefore();
	    }
	  },
	  _model: function() {
	    var _m, self;
	    self = this;
	    _m = this.oldModel;
	    if (_m) {
	      if (_.isFunction(_m)) {
	        _m = _m.call(this);
	      }
	      if (_m.then) {
	        return _m.then((function(_this) {
	          return function(data) {
	            return _this._modelAfter.call(_this, data);
	          };
	        })(this)).fail((function(_this) {
	          return function(ex) {
	            return _this._modelError.call(_this, ex);
	          };
	        })(this));
	      } else {
	        return this._modelAfter(_m);
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
	    if (!data) {
	      if (!_.isFunction(this.oldModel)) {
	        data = this.oldModel;
	      }
	    }
	    this.model = data;
	    return this._render();
	  },
	  _modelError: function(ex) {
	    if (this.modelError && _.isFunction(this.modelError)) {
	      return this.modelError(ex);
	    }
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
	  _render: function() {
	    var html, self;
	    this._renderBefore();
	    self = this;
	    html = this.template;
	    if (_.isFunction(html)) {
	      html = this.template(this);
	      if (html.then && _.isFunction(html.then)) {
	        html = html.then(function(data) {
	          self.$el.html(self.templateAfter(data));
	          self.isRender = true;
	          return self._renderAfter();
	        }).fail((function(_this) {
	          return function() {
	            return self.isRender = true;
	          };
	        })(this));
	        return;
	      }
	    }
	    this.$el.html(html);
	    this.isRender = true;
	    return this._renderAfter();
	  },
	  _renderAfter: function() {
	    if (this.renderAfter) {
	      this.renderAfter();
	    }
	    if (this.load) {
	      this.load();
	    }
	    autoParse(this);
	    return this;
	  },
	  autoParse: function(el) {
	    return autoParse(this, el);
	  },
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
	  clear: function() {
	    var ref, ref1;
	    if ((ref = this.$el) != null) {
	      ref.html();
	    }
	    return (ref1 = this.$target) != null ? ref1.remove() : void 0;
	  },
	  destory: function(delegateEvent) {
	    var ref, ref1;
	    if (delegateEvent) {
	      this.undelegateEvents();
	    }
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
	  set: function(name, val) {
	    if (name === 'model') {
	      return this.oldModel = val;
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _, _parse, autoParse, getParentComponent, kyo;

	kyo = __webpack_require__(1);

	_ = kyo._;

	autoParse = function(component, $el) {
	  var $inputs;
	  if (!$el) {
	    $el = component.$el;
	  }
	  $inputs = $el.find("[data-type]");
	  return $inputs.each(function(index, ele) {
	    var $parent;
	    $parent = getParentComponent($(ele));
	    if ($parent.attr('kui-id') === component.cid) {
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
	  var DatePickerAutoParse, DropMenuAutoParse, TipAutoParse, datePicker, dropMenu, tip, type;
	  DatePickerAutoParse = __webpack_require__(8);
	  DropMenuAutoParse = __webpack_require__(15);
	  TipAutoParse = __webpack_require__(28);
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
	    case 'tip':
	      tip = TipAutoParse($e, parent);
	      tip.parent = parent;
	      return tip.render($e);
	  }
	};

	module.exports = autoParse;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var AutoParse, DatePicker;

	DatePicker = __webpack_require__(9);

	AutoParse = function(target) {
	  return DatePicker.create({
	    $target: target
	  });
	};

	module.exports = AutoParse;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Component, DatePicker;

	__webpack_require__(10);

	__webpack_require__(14);

	Component = __webpack_require__(6);

	DatePicker = Component.extend({
	  renderAfter: function() {
	    var $maxDateTarget, $minDateTarget, $target, _minDate, day, m, maxDate, minDate, operator, opt, target;
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
	        m = minDate.split(/\+|-/);
	        target = m[0];
	        day = m[1];
	        if (day) {
	          operator = minDate.match(/\+|-/)[0];
	        }
	        $minDateTarget = $(target);
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
	          var _minDate;
	          _minDate = $(this).val();
	          if (operator === '+') {
	            _minDate = moment(_minDate).add(1, 'day').format("YYYY-MM-DD");
	          }
	          if (operator === '-') {
	            _minDate = moment(_minDate).subtract(1, 'day').format("YYYY-MM-DD");
	          }
	          return $target.datepicker('option', 'minDate', _minDate);
	        }
	      });
	    }
	    if (minDate) {
	      if (!$minDateTarget) {
	        opt.minDate = minDate;
	      } else {
	        _minDate = $minDateTarget.val();
	        if (_minDate) {
	          if (operator === '+') {
	            _minDate = moment(_minDate).add(1, 'day').format("YYYY-MM-DD");
	          }
	          if (operator === '-') {
	            _minDate = moment(_minDate).subtract(1, 'day').format("YYYY-MM-DD");
	          }
	          opt.minDate = _minDate;
	        }
	      }
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
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var AutoParse, DropMenu;

	DropMenu = __webpack_require__(16);

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
	    dropMenu.dataModel = currentModel;
	  }
	  return dropMenu;
	};

	module.exports = AutoParse;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Component, DropMenu, _, kyo, template;

	kyo = __webpack_require__(1);

	__webpack_require__(17);

	Component = __webpack_require__(6);

	template = __webpack_require__(19);

	_ = kyo._;

	DropMenu = Component.extend({
	  template: template,
	  renderAfter: function() {
	    var $all, selectName, timeOut;
	    $all = this.$("a");
	    $all.attr('prevText', $all.text());
	    this.$el.addClass('kui-drop-menu');
	    this.$el.append("<b class='caret'></b>");
	    timeOut = null;
	    this.$el.on('mouseover', (function(_this) {
	      return function() {
	        if (timeOut) {
	          window.clearTimeout(timeOut);
	        }
	        return _this.$("ul").show();
	      };
	    })(this));
	    this.$el.on('mouseout', (function(_this) {
	      return function() {
	        return timeOut = window.setTimeout(function() {
	          return _this.$("ul").hide();
	        }, 300);
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
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(20);
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
	    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.dataModel : depth0)) != null ? stack1.title : stack1), depth0))
	    + "</a>\n<ul>\n"
	    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.dataModel : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
	    + "</ul>\n";
	},"useData":true});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(21)['default'];


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;

	var _import = __webpack_require__(22);

	var base = _interopRequireWildcard(_import);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _SafeString = __webpack_require__(25);

	var _SafeString2 = _interopRequireWildcard(_SafeString);

	var _Exception = __webpack_require__(24);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var _import2 = __webpack_require__(23);

	var Utils = _interopRequireWildcard(_import2);

	var _import3 = __webpack_require__(26);

	var runtime = _interopRequireWildcard(_import3);

	var _noConflict = __webpack_require__(27);

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	exports.createFrame = createFrame;

	var _import = __webpack_require__(23);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(24);

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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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

	var _import = __webpack_require__(23);

	var Utils = _interopRequireWildcard(_import);

	var _Exception = __webpack_require__(24);

	var _Exception2 = _interopRequireWildcard(_Exception);

	var _COMPILER_REVISION$REVISION_CHANGES$createFrame = __webpack_require__(22);

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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var AutoParse, TipComponent;

	__webpack_require__(29);

	TipComponent = __webpack_require__(31);

	AutoParse = function(target, parent) {
	  var tip;
	  tip = TipComponent.create({
	    $target: target,
	    $el: target,
	    tip: target.data('tip')
	  });
	  return tip;
	};

	module.exports = AutoParse;


/***/ },
/* 29 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var Component, TipComponent, template;

	Component = __webpack_require__(6);

	template = __webpack_require__(32);

	TipComponent = Component.extend({
	  classNames: ['kui-tip'],
	  tip: '',
	  template: template,
	  renderAfter: function() {
	    var timeOut;
	    timeOut = null;
	    this.$target.on('mouseover', (function(_this) {
	      return function() {
	        if (timeOut) {
	          window.clearTimeout(timeOut);
	        }
	        return _this.$el.show();
	      };
	    })(this));
	    return this.$target.on('mouseout', (function(_this) {
	      return function() {
	        return timeOut = window.setTimeout(function() {
	          return _this.$el.hide();
	        }, 500);
	      };
	    })(this));
	  }
	});

	module.exports = TipComponent;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(20);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    var stack1;

	  return "<div class=\"kui-tip-content\">\n  "
	    + ((stack1 = this.lambda((depth0 != null ? depth0.tip : depth0), depth0)) != null ? stack1 : "")
	    + "\n</div>\n";
	},"useData":true});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var AutoComplete, Component;

	__webpack_require__(34);

	Component = __webpack_require__(6);

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
	          return _this.trigger('select', v.item);
	        };
	      })(this)
	    });
	  }
	});

	module.exports = AutoComplete;


/***/ },
/* 34 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 35 */,
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var Component, SwitchTab, template;

	__webpack_require__(37);

	Component = __webpack_require__(6);

	template = __webpack_require__(39);

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
	    var left, top;
	    if (this.position && this.$target) {
	      left = this.position.left || 0;
	      top = this.position.top || 0;
	      this.$el.offset({
	        left: left,
	        top: top
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
/* 37 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 38 */,
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(20);
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Mask;

	__webpack_require__(41);

	Component = __webpack_require__(6);

	Mask = Component.extend({
	  classNames: ['kui-mask']
	});

	module.exports = Mask;


/***/ },
/* 41 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 42 */,
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Dialog, _, kyo, template;

	kyo = __webpack_require__(1);

	__webpack_require__(44);

	Component = __webpack_require__(6);

	template = __webpack_require__(48);

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
	    top = scrollTop + ((bodyHeight - height) / 2);
	    if (top < 15) {
	      top = 15;
	    }
	    return this.$el.css({
	      left: left,
	      top: top + 'px'
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
	  _renderAfter: function() {
	    var content;
	    content = this.content;
	    if (_.isFunction(content)) {
	      content = content.call(this);
	    }
	    if (content) {
	      this.$el.find('.kui-dialog-content').append(content);
	    }
	    this.setContentHeight();
	    return Component.prototype._renderAfter.call(this);
	  },
	  events: {
	    'click .kui-dialog-close': 'close',
	    'click .kui-dialog-cancel': 'close',
	    'click .kui-dialog-confirm': 'confirm'
	  },
	  addChild: function(name, component) {
	    Component.prototype.addChild.call(this, name, component);
	    return component.$parentEl = this.$el.find('.kui-dialog-content');
	  },
	  switchTo: function(name, callback) {
	    return _.each(this.children, (function(_this) {
	      return function(v, k) {
	        if (k === name || v.cid === name.cid) {
	          if (callback && _.isFunction(callback)) {
	            callback();
	          }
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
/* 44 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(20);
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Confirm, MaskDialog, _, kyo;

	kyo = __webpack_require__(1);

	MaskDialog = __webpack_require__(50);

	Component = __webpack_require__(6);

	_ = kyo._;

	Confirm = MaskDialog.extend({
	  classNames: ['kui-dialog', 'kui-confirm'],
	  name: 'confirm',
	  title: '确认',
	  css: {
	    width: '500px',
	    height: 'auto'
	  },
	  callbacks: [],
	  cancelCallbacks: [],
	  initialize: function() {
	    Component.prototype.initialize.call(this);
	    return this.callbacks = [];
	  },
	  message: function(msg, title, callback) {
	    var cancel, cancelText, confirmText, options;
	    if (arguments.length === 1) {
	      options = arguments[0];
	      msg = options.msg;
	      title = options.title;
	      callback = options.confirm;
	      cancel = options.cancel;
	      confirmText = options.confirmText;
	      cancelText = options.cancelText;
	    }
	    this.$el.find('.kui-dialog-content').html(msg);
	    this.$('.kui-dialog-confirm').html(confirmText || this.confirmText);
	    this.$('.kui-dialog-cancel').html(cancelText || this.cancelText);
	    if (_.isFunction(title)) {
	      callback = title;
	      title = void 0;
	    }
	    if (title) {
	      this.$el.find('.kui-dialog-title').html(title);
	    }
	    if (cancel && kyo._.isFunction(cancel)) {
	      this.cancelCallbacks.push(cancel);
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
	      callback();
	    }
	    this.callbacks = [];
	    return this.cancelCallbacks = [];
	  },
	  close: function() {
	    var cancel;
	    MaskDialog.prototype.close.call(this);
	    if (cancel = this.cancelCallbacks.pop()) {
	      cancel();
	    }
	    this.callbacks = [];
	    return this.cancelCallbacks = [];
	  }
	});

	module.exports = Confirm;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Dialog, MaskDialog;

	Dialog = __webpack_require__(43);

	Component = __webpack_require__(6);

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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var Alert, Component, MaskDialog, _, kyo;

	kyo = __webpack_require__(1);

	MaskDialog = __webpack_require__(50);

	Component = __webpack_require__(6);

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
	  },
	  close: function() {
	    var callback;
	    MaskDialog.prototype.close.call(this);
	    if (callback = this.callbacks.pop()) {
	      return callback();
	    }
	  }
	});

	module.exports = Alert;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Loading, LoadingMask, MaskDialog, loadingMask;

	MaskDialog = __webpack_require__(50);

	Component = __webpack_require__(6);

	LoadingMask = __webpack_require__(40);

	loadingMask = LoadingMask.create({
	  classNames: ['kui-mask', 'kui-loading-mask']
	});

	loadingMask.render(false);

	Loading = MaskDialog.extend({
	  name: 'loading',
	  classNames: ['kui-dialog', 'kui-loading'],
	  title: null,
	  css: {
	    width: '361',
	    height: 'auto'
	  },
	  index: 0,
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
	    if (this.index === 0) {
	      loadingMask.show();
	      this.setPosition();
	      Component.prototype.show.call(this);
	    }
	    this.trigger('open');
	    return this.index += 1;
	  },
	  cancelLoading: function() {
	    if (this.index >= 1) {
	      this.index -= 1;
	    }
	    if (this.index === 0) {
	      Component.prototype.hide.call(this);
	      loadingMask.hide();
	    }
	    return this.trigger('close');
	  }
	});

	module.exports = Loading;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var Component, Paging, _, buildModel, buildSplitModel, kyo, template;

	kyo = __webpack_require__(1);

	__webpack_require__(54);

	Component = __webpack_require__(6);

	template = __webpack_require__(56);

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
	    if (!_.isNumber(pageIndex)) {
	      return;
	    }
	    pageIndex = Math.floor(pageIndex);
	    if (pageIndex <= 0) {
	      return;
	    }
	    currentPageIndex = this.pageIndex;
	    if (pageIndex === currentPageIndex) {
	      return;
	    }
	    this.pageIndex = Math.floor(pageIndex);
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
/* 54 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 55 */,
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(20);
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