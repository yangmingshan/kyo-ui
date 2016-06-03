kyo = require 'kyo'
require './dialog.css'
Component = require '../../component.coffee'
template = require './dialog.hbs'
_ = kyo._

Dialog = Component.extend({
  name: 'dialog'
  classNames: ['kui-dialog']
  template: template
  hasClose: true
  footer: true
  confirmText: '确认'
  cancelText: '取消'
  title: '提示'
  content: ''
  css: {
    width: '500px',
    height: '600px'
  },
  setContent: (content)->
    @$el.find('.kui-dialog-content').html(content)
  setPosition: ->
    #设置居中显示
    width = parseFloat(@$el.width()) or 0
    $body = $('body')
    bodyWidth = $body.width()
    left = ((bodyWidth - width) / 2 ) + 'px'
    #set top
    scrollTop = $body.scrollTop()
    height = parseFloat(@$el.height()) or 0
    bodyHeight = $(window).height()
    top = ( scrollTop + ( ( bodyHeight - height ) /2 ) )
    top = 15 if top < 15
    @$el.css({left: left, top: top + 'px'})
  setContentHeight: ->
    height = parseFloat(@css.height)
    if !isNaN(height)
      titleHeight = if @title then 47 else 0
      footerHeight = if @footer then 54 else 0
      contentHeight = height - titleHeight - footerHeight
      @$el.find('.kui-dialog-content').css('height', contentHeight + 'px')
  _renderAfter: ->
    content = @content
    content = content.call(@) if _.isFunction(content)
    @$el.find('.kui-dialog-content').append(content) if content
    @setContentHeight()
    Component.prototype._renderAfter.call(@)
  events: {
    'click .kui-dialog-close': 'close',
    'click .kui-dialog-cancel': 'close',
    'click .kui-dialog-confirm': 'confirm'
  }
  addChild: (name, component) ->
    Component.prototype.addChild.call(@, name, component)
    component.$parentEl = @$el.find('.kui-dialog-content')
    #component.render()
  switchTo: (name, callback) ->
    _.each(@children, (v, k) =>
      if k == name or v.cid == name.cid
        callback() if callback and _.isFunction(callback)
        v.show()
        @setTitle v.title if v.title
      else
        v.hide()
    )
  setTitle: (title) ->
    @$el.find(".kui-dialog-title").html(title)
  open: ->
    @show()
  show: ->
    @trigger('open')
    kui.mask.show()
    @setPosition()
    Component.prototype.show.call(@)
  close: ->
    @trigger('close')
    Component.prototype.hide.call(@)
    kui.mask.hide()
  confirm: ->
    @trigger('confirm')
    kui.mask.hide()
    @hide()
})

module.exports = Dialog
