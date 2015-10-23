require './drop_menu.css'
Component = require '../../component'
template = require('./drop_menu.hbs')
_ = kyo._

##
# DropMenu 组件
# <div class="drop-menu" data-type="drop-menu">
#   <a>title</a>
#   <ul>
#     <li>item1</li>
#     <li>item2</li>
#   </ul>
# </div>


DropMenu = Component.extend({
  template: template,
  renderAfter: ->
    @$el = @$target
    $all = @$("a")
    $all.attr('prevText', $all.text())
    @$el.addClass('kui-drop-menu')
    @$el.append("<b class='caret'></b>")
    @$el.on('mouseover', =>
      @$("ul").show()
    )
    @$el.on('mouseout', =>
      @$("ul").hide()
    )
    @$("li").on('click', (e) =>
     @$("li").removeAttr('selected')
     $current = $(e.currentTarget)
     $all.html($current.html())
     $current.attr('selected', true)
     selectName = @$el.attr('on-select')
     @action(selectName, @getSelected()) if selectName
    )

  getSelected: ->
    @$el.getDropMenuSelected()
})

## jquery plugin

$.fn.extend({
  getDropMenuSelected: ->
    $selected = $(@).find("[selected='selected']")
    value = ''
    if $selected.length > 0
      value = $selected.attr('data-value')
      value ?= $selected.text()
    value
})

module.exports = DropMenu
