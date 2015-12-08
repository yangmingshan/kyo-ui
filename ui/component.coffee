kyo = require 'kyo'
Base = kyo.Base
_ = kyo._
autoParse = require './auto_parse'

delegateEventSplitter = /^(\S+)\s*(.*)$/

Component = Base.extend({
  $el: null
  templete: null
  ##初始化##
  initialize: ->
    @cid = _.uniqueId('component')
    @isRender = false
    if @notNeedRender
      @$el = $(@$el) if _.isString(@$el)
    else
      @createEl()
    if @$target and _.isString(@$target)
      @$target = $("#" + @$target)
    @$el.attr('kui-component', '').attr('kui-id', @cid)
    @delegateEvents()
    ##保存model为oldModel
    @oldModel = @model
    @render() if @notNeedRender
  render: (parentEl, show) ->
    return @_renderAfter() if @notNeedRender
    if arguments.length is 1 and typeof arguments[0] is 'boolean'
      show = parentEl
      parentEl = undefined
    if @isRender
      @destory()
      @isRender = false
    @$parentEl = $(parentEl) if parentEl
    @$parentEl = $('body') unless @$parentEl
    if show
      @show()
    else
      @hide()
    @$parentEl.append(@$el)
    @$el.html(@template(@)) if @template and _.isFunction(@template)
    @$el.css(@css) if @css
    @_modelBefore()
    @_model()
    @
  _modelBefore: ->
    @modelBefore() if @modelBefore && _.isFunction(@modelBefore)
  _model: ->
    self = this
    _m = @oldModel
    if _m
      @model = _m() if _.isFunction(_m)
      ##是一个promise
      if _m.then
        _m.then((data) =>
          @_modelAfter(data)
        ).fail((ex)=>
          @_modelAfter(ex);
        )
      else
        @_modelAfter(@model)
    else
      @_modelAfter()
  _renderBefore: (data) ->
    @renderBefore(data) if @renderBefore && _.isFunction(@renderBefore)
  _modelAfter: (data) ->
    data = @modelAfter(data) if @modelAfter and _.isFunction(@modelAfter)
    @model = data
    @_render()
  delegateEvents: ->
    self = this
    events = this.events
    return @ unless events
    @undelegateEvents()
    for key of events
      method = events[key]
      method = @[events[key]] unless _.isFunction(method)
      continue unless method
      match = key.match(delegateEventSplitter)
      eventName = match[1]
      selector = match[2]
      method = _.bind(method, self)
      eventName += '.delegateEvents' + this.cid
      if selector is ''
        $el.on(eventName, method)
      else
        @$el.on(eventName, selector, method)
    return this
  undelegateEvents: ->
    @$el.off('.delegateEvents' + @cid)
    this
  _render: ->
    @_renderBefore()
    self = this
    html = this.template
    if _.isFunction(html)
      html = @template(@)
      if html.then and _.isFunction(html.then)
        html = html.then( (data) ->
         self.$el.html(self.templateAfter(data))
         self.isRender = true
         self._renderAfter()
        ).fail( =>
          self.isRender = true
        )
        return
    @$el.html(html)
    @isRender = true
    @_renderAfter()
  _renderAfter: ->
    @renderAfter() if @renderAfter
    autoParse(@)
    @load() if @load
  autoParse: (el)->
    autoParse(@, el)
  hide: ->
    @beforeHide?()
    @$el?.hide()
    @afterHide?()
  show: ->
    @beforeShow?()
    @$el?.show()
    @afterShow?()
  destory: (delegateEvent) ->
    @undelegateEvents() if delegateEvent
    @model = @oldModel if @oldModel
    @$el?.html()
    @$target?.remove()
  parent: null
  children: {}
  addChild: (name, component) ->
    component.parent = @
    @children[name] = component
  $: (selector) ->
    @$el.find(selector)
  getData: (container) ->
    container =  @$el unless container
    inputs = container.find("input[name],select[name]")

    data = {}
    inputs.each( ->
      $this = $(this)
      name = $this.attr('name')
      val = ''
      type = $this.prop('type')
      if type is 'checkbox' or type is 'radio'
        val = $this.prop('checked')
        return unless val
        val = $this.data('value') if $this.data('value')
      else
        val = $this.val().trim()
      if /\[\]/.test(name)
        if data[name]
          data[name].push(val)
        else
          data[name] = [val]
      else
        data[name] = val
    )
    data
  createEl: ->
    tagName = @tagName ? 'div'
    el = document.createElement(tagName)
    @$el = $(el)
    if @classNames
      @classNames.forEach( (n) =>
        @.$el?.addClass(n)
      )
  action: (name, params) ->
    if @[name] and _.isFunction(@[name])
      @[name](params)
    else
      parent = @parent
      while parent is not null and ( parent[name] and _.isFunction(parent[name]) )
        parent = parent.parent
      parent[name](params) if parent and parent[name] and _.isFunction(parent[name])
})

##
# 递归解析 设置了data-type 的组件
#
#autoParse = (component) ->


module.exports = Component
