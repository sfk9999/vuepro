import Mock from 'mockjs';
// export default Mock.mock('http://g.cn',{
//   'list|30-50':[
//     {
//       'id|+1':1,
//       'name':'@name',
//       'age|1-100':30,
//       'birth':'@date',
//       'addr':'@county'}
//   ]
// });
var Users = [];
var a=Mock.mock('http://g.cn',{
  'list|30-50':[
    {
      'id|+1':1,
      'name':'@name',
      'age|1-100':30,
      'birth':'@date',
      'addr':'@county'}
  ]
});
Users=a;
export { Users };

