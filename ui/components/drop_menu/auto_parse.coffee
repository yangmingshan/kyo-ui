DropMenu = require './drop_menu'

AutoParse = (target, parent) ->
  dropMenu = DropMenu.create({
    $target: target,
    $el: target
  })
  model = target.attr('data-model')
  currentModel = parent[model] if parent[model]
  dropMenu.dataModel = currentModel if currentModel
  dropMenu

module.exports = AutoParse
