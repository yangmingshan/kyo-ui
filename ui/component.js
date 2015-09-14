var Base = kyo.Base,
    _ = kyo._;

var delegateEventSplitter = /^(\S+)\s*(.*)$/;

var Component = Base.extend({
  $el: null,
  templete: null,
  /**
   * 初始化
   */
  initialize: function() {
    this.cid = _.uniqueId('component');
    this.isRender = false;
    if(this.$target && _.isString(this.$target)) {
      this.$target = $("#"+this.$target);
    }
    this.createEl();

    this.delegateEvents();
  },
  render: function(parentEl, show) {
    if(arguments.length == 1 && typeof arguments[0] === 'boolean') {
      show = parentEl;
      parentEl = undefined;
    }
    if(this.isRender) {
      this.destory();
      this.isRender = false;
    }
    this._renderBefore();
    //如果没有templete则认为不需要渲染
    if(!this.template &&!this.$el) {
      this.renderAfter();
      return;
    }
    if(parentEl) {
      this.$parentEl = $(parentEl);
    }
    if(!this.$parentEl) {
      this.$parentEl = $('body');
    }
    if(show) {
      this.show()
    } else {
      this.hide();
    }
    this.$parentEl.append(this.$el);
    if(this.css) {
      this.$el.css(this.css);
    }
    //保存model为oldModel
    this.oldModel = this.model;
    this._model();
  },
  _model: function() {
    var self = this;
    if(this.model) {
      if(_.isFunction(this.model)) {
        this.model = this.model();
      }
      //是一个promise
      if(this.model.then) {
        this.model.then(function(data) {
          self._modelAfter(data);
        }, function(err) {

        });
      } else {
        this._modelAfter(this.model);
      }
    } else {
      this._modelAfter();
    }
  },
  _renderBefore: function(data) {
    if(this.modelBefore && _.isFunction(this.modelBefore)) {
      this.modelBefore(data);
    }
  },
  _modelAfter: function(data) {
    if(this.modelAfter && _.isFunction(this.modelAfter)) {
      data = this.modelAfter(data);
    }
    this.model = data;
    this._setContent();
  },
  delegateEvents: function() {
    var self = this;
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
          method = _.bind(method, self);
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
    var self = this;
    var html = this.template;
    if(_.isFunction(this.template)) {
      html = this.template(this);
      if(html.then && _.isFunction(html.then)) {
        html = html.then(function(data) {
         self.$el.html(self.templateAfter(data));
         self.isRender = true;
         self.renderAfter();
        });
        return;
      }
    }
    this.$el.html(html);
    this.isRender = true;
    this.renderAfter();
  },
  renderAfter: function() {

  },
  _renderBefore: function() {

  },
  hide: function() {
    this.$el && this.$el.hide();
  },
  show: function() {
    this.$el && this.$el.show();
  },
  destory: function(delegateEvent) {
    if(delegateEvent) {
      this.undelegateEvents();
    }
    this.model = this.oldModel;
    if(this.$el) {
      this.$el.html('');
    }
    if(this.$target) {
      this.$target.remove();
    }
  },
  parent: null,
  children: {},
  addChild: function(name, component) {
    component.parent = this;
    this.children[name] = component;
  },
  $: function(selector) {
    return this.$el.find(selector);
  },
  getData: function(container) {
    container = container || this.$el;
  	var inputs = container.find("input[name],select[name]"),
  	data = {};
  	inputs.each(function() {
  		var $this = $(this);
  		var name = $this.attr("name"),
  		val = '';
  		var type = $this.prop("type");
  		if (type == "checkbox" || type == "radio") {
  			val = $this.prop("checked");
  			if (!val) return;
  			if ($this.data('value')) {
  				val = $this.data('value');
  			}
  		} else {
  			val = $this.val().trim();
  		}
  		if (/\[\]/.test(name)) {
  			if (data[name]) {
  				data[name].push(val);
  			} else {
  				data[name] = [val];
  			}
  		} else {
  			data[name] = val;
  		}
  	});
  	return data;
  },
  createEl: function() {
    var self = this;
    var tagName = this.tagName || 'div';
    var el = document.createElement(tagName);
    this.$el = $(el);
    if(this.classNames) {
      this.classNames.forEach(function(n) {
        self.$el && self.$el.addClass(n);
      })
    }
  }
});

module.exports = Component;
