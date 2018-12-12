const fs = require('fs');
const path = './input.txt';
const input = fs
  .readFileSync(path)
  .toString()
  .split('\n');

const testArr = ['aabbbd', 'aabbcd', 'abcdef'];
testArr.forEach(element => {
  console.log(element.split(''));
});
