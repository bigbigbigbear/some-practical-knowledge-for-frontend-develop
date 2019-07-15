// json对象的数字转字符串
var o = { a: 1, b: "name" };
var s = JSON.stringify(o, function (k, v) {
    return typeof v === "number" ? v + "" : v;
});
console.log(s);    // {"a":"1","b":"name"}

