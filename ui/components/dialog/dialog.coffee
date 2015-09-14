require './dialog.css'
Component = require '../../component'
template = require './dialog.hbs'
_ = kyo._

Dialog = Component.extend({
  name: 'dialog'
  classNames: ['kui-dialog']
  $el: "<div class='kui-dialog'></div>"
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
    top = ( scrollTop + ( ( bodyHeight - height ) /2 ) ) + 'px'
    @$el.css({left: left, top: top})
  setContentHeight: ->
    height = parseFloat(@css.height)
    titleHeight = if @title then 47 else 0
    footerHeight = if @footer then 54 else 0
    contentHeight = height - titleHeight - footerHeight
    @$el.find('.kui-dialog-content').css('height', contentHeight + 'px')
  renderAfter: ->
    content = @content
    @$el.find('.kui-dialog-content').append(content) if content
    @setContentHeight()
  events: {
    'click .kui-dialog-close': 'close',
    'click .kui-dialog-cancel': 'close',
    'click .kui-dialog-confirm': 'confirm'
  }
  addChild: (name, component) ->
    Component.prototype.addChild.call(@, name, component);
    component.$parentEl = @$el.find('.kui-dialog-content');
    component.render();
  switchTo: (name) ->
    _.each(@children, (v, k) ->
      if k == name
        v.show();
      else
        v.hide();
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
