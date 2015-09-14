require './paging.css'
Component = require '../../component'
template = require './paging.hbs'
_ = kyo._

##
# Paper 分页组件
# paper = Paper.create({
#
#   pageSize: 20,
#   totalCount: 100
# })
Paging = Component.extend({
  name: 'paging'
  tagName: 'ul'
  classNames: ['kui-paging']
  $el: "<ul class='kui-paging'></ul>"
  template: template
  splitText: '...'
  pageIndex: 1
  prevCount: 2
  middleCount: 5
  nextCount: 2
  prevPagerText: '上一页'
  nextPagerText: '下一页'
  model: ->
    self = @
    _model = []
    pageSize = @pageSize
    totalCount = @totalCount
    middleCount = @middleCount
    return unless totalCount
    #有多少页
    pageCount = @pageCount = Math.ceil(totalCount / pageSize)
    pageIndex = @pageIndex
    nearPageCount = Math.floor((middleCount / 2))
    #如果当前页码大于1 显示 上一页
    if pageIndex > 1 then @prevPager = true else @prevPager = false
    if pageIndex < pageCount then @nextPager = true else @nextPager = false
    #渲染当前页码左边的页码
    if pageIndex <= @prevCount + nearPageCount + 1
        _.each(_.range(1, pageIndex), (value) ->
          _model.push(buildModel.call(self, value))
          )
    else
        _.each(_.range(1, @prevCount), (value) ->
          _model.push(buildModel.call(self, value))
          )
        _model.push(buildSplitModel())
        _.each(_.range(pageIndex - nearPageCount, pageIndex), (value) ->
          _model.push(buildModel.call(self, value))
        )
    #渲染当前页码
    _model.push(buildModel.call(self, pageIndex))
    #渲染当前页码后面的页码
    if pageIndex >= pageCount - @nextCount - nearPageCount
      _.each(_.range(pageIndex + 1, pageCount + 1), (value) ->
        _model.push(buildModel.call(self, value))
      )
    else
      _.each(_.range(pageIndex + 1, pageIndex + nearPageCount + 1), (val) ->
        _model.push(buildModel.call(self, val))
      )
      _model.push(buildSplitModel())
      _.each(_.range(pageCount - @nextCount + 1, pageCount + 1), (val) ->
        _model.push(buildModel.call(self, val))
      )
    _model
  pageSize: 20
  totalCount: null
  events: {
   'click .kui-paging-prev': 'prev',
   'click .kui-paging-item': 'paging',
   'click .kui-paging-next': 'next'
  }
  prev: (e)->
    index = @pageIndex
    @_paging(index - 1)
  next: (e)->
    index = @pageIndex
    @_paging(index + 1)
  paging: (e) ->
    index = Number($(e.currentTarget).text())
    @_paging(index)
  _paging: (pageIndex) ->
    currentPageIndex = @pageIndex
    return if pageIndex is currentPageIndex
    @pageIndex = pageIndex
    @trigger('paging', pageIndex)
    #@render(true)
  setTotalCount: (count) ->
    @totalCount = count
    @render(true)
})

buildModel = (value) ->
  return { value: value, isCurrent: true } if value is @pageIndex
  { value: value }

buildSplitModel = ->
  { isSplit: true }

module.exports = Paging
