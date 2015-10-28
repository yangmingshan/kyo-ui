Component = require '../../component'
template = require './tip.hbs'

##
# Tip组件
# <div data-type="tip" tip="这是一个提示组件, 移动到我上面则会显示这条信息"></div>
TipComponent = Component.extend({
  classNames: ['kui-tip'],
  tip: '',
  template: template,
  renderAfter: ->
    timeOut = null
    @$target.on('mouseover', =>
      window.clearTimeout(timeOut) if timeOut
      @$el.show()
    )
    @$target.on('mouseout', =>
      timeOut = window.setTimeout( =>
        @$el.hide()
      , 500)
    )
})

module.exports = TipComponent
