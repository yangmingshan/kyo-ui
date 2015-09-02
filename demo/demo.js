new kui.AutoParse('page').autoParse();

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
]

var switchTab = kui.SwitchTab.create({
  model: switchTabData,
  position: {top: 30, left: 0},
  $target: 'belongCitySwitch'
});

$('#belongCitySwitch').on('click', function(e) {
  switchTab.render();
})
