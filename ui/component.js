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
    this._model();
  },
  _model: function() {
    var self = this;
    if(this.model) {
      //保存model为oldModel
      this.oldModel = this.model;
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
  }
});

module.exports = Component;
