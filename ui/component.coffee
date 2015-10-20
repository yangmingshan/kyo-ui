Base = kyo.Base
_ = kyo._
AutoParse = require './auto_parse'

delegateEventSplitter = /^(\S+)\s*(.*)$/

Component = Base.extend({
  $el: null
  templete: null
  ##初始化##
  initialize: ->
    @cid = _.uniqueId('component')
    @isRender = false
    if @$target and _.isString(@$target)
      @$target = $("#" + @$target)
    if @notNeedRender
      @$el = $(@$el)
    else
      @createEl()
    @delegateEvents()
    ##保存model为oldModel
    @oldModel = @model
    @render() if @notNeedRender
  render: (parentEl, show) ->
    return @renderAfter() if @notNeedRender
    if arguments.length is 1 and typeof arguments[0] is 'boolean'
      show = parentEl
      parentEl = undefined
    if @isRender
      @destory()
      @isRender = false
    @_renderBefore()
    @$parentEl = $(parentEl) if parentEl
    @$parentEl = $('body') unless @$parentEl
    if show
      @show()
    else
      @hide()
    @$parentEl.append(@$el)
    @$el.css(@css) if @css
    @_model()
  _model: ->
    self = this
    if @model
      @model = @model() if _.isFunction(@model)
      ##是一个promise
      if @model.then
        @model.then((data) =>
          @_modelAfter(data)
        )
      else
        @_modelAfter(@model)
    else
      @_modelAfter()
  _renderBefore: (data) ->
    @modelBefore(data) if @modelBefore && _.isFunction(@modelBefore)
  _modelAfter: (data) ->
    data = @modelAfter(data) if @modelAfter and _.isFunction(@modelAfter)
    @model = data
    @_setContent()
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

    this.$el.on('click', (e) ->
      e.stopPropagation()
    )
    return this
  undelegateEvents: ->
    @$el.off('.delegateEvents' + @cid)
    this
  _setContent: ->
    self = this
    html = this.template
    if _.isFunction(html)
      html = @template(@)
      if html.then and _.isFunction(html.then)
        html = html.then( (data) ->
         self.$el.html(self.templateAfter(data))
         self.isRender = true
         self.renderAfter()
        )
        return
    @$el.html(html)
    @isRender = true
    @renderAfter()
  renderAfter: ->
    new AutoParse(@$el).autoParse()
    @load() if @load
  _renderBefore: ->

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
    @model = @oldModel
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
})
module.exports = Component
