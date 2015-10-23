DropMenu = require './drop_menu'

AutoParse = (target, parent) ->
  dropMenu = DropMenu.create({
    $target: target
  })
  model = target.attr('data-model')
  currentModel = parent[model] if parent[model]
  dropMenu.model = currentModel if currentModel
  dropMenu

module.exports = AutoParse
