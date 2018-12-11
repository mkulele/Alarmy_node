var year = String(new Date().getFullYear());
var month = String(new Date().getMonth());
var date = String(new Date().getDate());
var hour = new Date().getHours();
var minute = new Date().getMinutes();
var second = new Date().getSeconds();
var timestamp = year+'-'+month+'-'+date+hour+minute+second;

console.log(timestamp);

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var hour=date.getHours();
var minute=date.getMinutes();
var second=date.getSeconds();
var timestamp = year+'-'+month+'-'+day+'-'+hour+minute+second;

console.log(timestamp);
