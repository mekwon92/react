//과일 갯수 counter
const title = '제목';
const content = '내용';
const memberEmail = '작성자';
const obj = {title: '1234', content: 'abcd'};

//변수를 key로 사용하는 법
obj.title = title;
obj['memberEmail'] = memberEmail;
console.log(obj);

const e = {};
e.target = {};
e.target.name = 'title';
e.target.value = '작성한 제목';

console.log(e);

const {name, value} = e.target;
console.log(name, value);
// obj[name] = value;
// 위의 것을 불변성 유지 후 넣는 법
obj = {...obj, [name] : value};
console.log(obj);


// const name = e.target.name; //  title
// const value = e.target.value; // 작성한 제목