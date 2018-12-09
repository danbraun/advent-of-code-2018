const fs  = require("fs");
const path = './input.txt';
const input = fs.readFileSync(path).toString().split('\n');

const inputInt = input.map( (str) => Number(str) );
const answer = inputInt.reduce( (acc, current) => acc + current);
console.log(answer);