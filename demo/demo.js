new kui.AutoParse('#page').autoParse();

var cityAotoCompleteData = [
  {  name: '成都市', code: 'cd' },
  {  name: '达州市', code: 'dz' },
  {  name: '南充市', code: 'nc' },
  {  name: '遂宁市', code: 'sn' },
  {  name: '自贡市', code: 'zg' },
  {  name: '雅安市', code: 'ya' },
  {  name: '长沙市', code: 'cs' },
  {  name: '衡阳市', code: 'hy' },
  {  name: '岳阳市', code: 'zz' },
  {  name: '张家界市', code: 'ds' },
  {  name: '湘潭市', code: 'fd' },
  {  name: '邵阳市', code: 'hg' },
];

var belongCity = kui.AutoComplete.create({
  $target: 'belongCity',
  model: cityAotoCompleteData
});

belongCity.render();



var switchTabData = [
  {
    name: '四川',
    values: [
      {  name: '成都市', code: 'cd' },
      {  name: '达州市', code: 'dz' },
      {  name: '南充市', code: 'nc' },
      {  name: '遂宁市', code: 'sn' },
      {  name: '自贡市', code: 'zg' },
      {  name: '雅安市', code: 'ya' },
   ]
  },
  {
    name: '湖南',
    values: [
      {  name: '长沙市', code: 'cs' },
      {  name: '衡阳市', code: 'hy' },
      {  name: '岳阳市', code: 'zz' },
      {  name: '张家界市', code: 'ds' },
      {  name: '湘潭市', code: 'fd' },
      {  name: '邵阳市', code: 'hg' },
   ]
  }
];

var switchTab = kui.SwitchTab.create({
  model: switchTabData,
  position: {top: 30, left: 0},
  $target: 'belongCitySwitch',
  css: {width: '520px', hieght: '250px', overflow: 'auto'}
});
switchTab.render();
$('#belongCitySwitch').on('click', function(e) {
  switchTab.show();
  e.stopPropagation();
});

var switchTab2 = kui.SwitchTab.create({
  model: switchTabData,
  position: {top: 30, left: 0},
  $target: 'belongCitySwitch2'
});
switchTab2.render();

$('#belongCitySwitch2').on('click', function(e) {
  switchTab2.show();
  e.stopPropagation();
});
$('body').on('click', function() {
  switchTab.hide();
  switchTab2.hide();
});

$("#ui-mask").on('click', function() {
  kui.mask.show();
});

var dialog = kui.Dialog.create({
  content: 'dialog content',
  beforeShow: function() {
    console.log('beforeShow');
  },
  afterShow: function() {
    console.log('afterShow');
  },
  beforeHide: function() {
    console.log('beforeHide');
  },
  afterHide: function() {
    console.log('afterHide');
  }
});
dialog.on('confirm', function() {
  kui.loading();
  window.setTimeout(function() {
    kui.cancelLoading();
    kui.alert('confrim success!');
  }, 2000);
});
dialog.render();
$("#open-dialog").on('click', function(){
  dialog.show();
});

var dialog2 = kui.Dialog.create({

});

var component1 = kui.Component.create({
  $el: '<div></div>',
  template: 'component1',
  title: '1'
});

var component2 = kui.Component.create({
  $el: '<div></div>',
  template: 'component2',
  title: 2
});
$("#open-dialog2").on('click', function(){
  dialog2.show();
});
dialog2.render();
dialog2.addChild('c1', component1);
dialog2.addChild('c2', component2);
dialog2.on('open', function() {
  this.switchTo('c1');
});

$("#open-confirm").on('click', function(){
  kui.confirm('确定？', function() {
    window.alert('确定');
  });
});
$("#open-alert").on('click', function(){
  kui.alert('alert', function() {
    alert('alert');
  });
});
$("#open-loading").on('click', function(){
  kui.loading();
});


//paper
//
var paging = kui.Paging.create({
  totalCount: 200
});
paging.on('paging', function() {
  window.setTimeout(function() {
    paging.setTotalCount(301);
  }, 3000);
  //this.totalCount = 301;
});
paging.render('#paging');
paging.show();
