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

var _ = require('./underscore.js');

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
