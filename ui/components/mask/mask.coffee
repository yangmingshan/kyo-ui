require('./mask.css')
Component = require('../../component')

Mask = Component.extend({
  classNames: ['kui-mask']
  index: 0
  show: ->
    if @index is 0
      Component.prototype.show.call(@)
    @index++
    @
  hide: ->
    @index-- if @index >= 1
    if @index is 0
      Component.prototype.hide.call(@)
    @
})

module.exports = Mask
