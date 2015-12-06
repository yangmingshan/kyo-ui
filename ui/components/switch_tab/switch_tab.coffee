require('./switch_tab.css')
Component = require('../../component')
template = require('./switch_tab.hbs')

SwitchTab = Component.extend({
  classNames: ['switch_tab'],
  template: template,
  events: {
    'click .switch_tab_head_item': 'switchTab',
    'click .switch_tab_content_select': '_select'
  },
  switchTab: (e) ->
    $target = $(e.currentTarget)
    @$el.find('.active').removeClass('active')
    $target.addClass('active')
    index = $target.data('index')
    @$el.find('.switch_tab_content_item').hide()
    @$el.find('.switch_tab_content_item').filter('[data-index='+index+']').show()
    e.stopPropagation()
  _select: (e) ->
    $target = $(e.currentTarget)
    @$target.val($target.attr('title'))
    @hide()
    @trigger('select', $target.attr('title'));
  renderAfter: (e) ->
    if @position and @$target
      left = @position.left or 0
      top = @position.top or 0
      @.$el.offset({
        left: left ,
        top: top
      })
    @$target.on('click', (e) =>
      @show()
      e.stopPropagation()
    )
    $("body").on('click', =>
      @hide()
    )
    @$el.find('.switch_tab_head_item:first').trigger('click')
})

module.exports = SwitchTab
