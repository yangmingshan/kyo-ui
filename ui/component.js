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
    if(this.$target && _.isString(this.$target)) {
      this.$target = $("#"+this.$target);
    }
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
        parentEl = document.body || document.documentElement;
    }
    parentEl = this.$parentEl = $(parentEl);
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
    var html = this.template({model: this.model});
    this.$el.html(html);
  },
  renderAfter: function() {

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
