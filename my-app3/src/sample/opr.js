// 구조분해할당
let a, b, rest;
({a, b} = {a:10, b:20});
console.log(a); // 10
console.log(b); // 20

({a, b} = {b:20, c:20});
console.log(a); // undefined
console.log(b); // 20

console.log("=============");

({a, b, ...rest} = {d:30, e:40, b:20, c:10});
console.log(a); //undefined
console.log(b); // 20
console.log(rest); // { d: 30, e: 40, c: 10 }
console.log("=============");
function f(x) {
  x = 20;
}
let value = 10;
f(value);

console.log(value); // 10
console.log("=============");
function f2(x) {
  x.a = 20;
}
let val = {a:10}; //object(주소값)
f2(val);
console.log(val); // {a: 20}




