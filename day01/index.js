const fs  = require("fs");
const path = './input.txt';
const input = fs.readFileSync(path).toString().split('\n');

const inputInt = input.map( (str) => Number(str) );

// Puzzle 1

const answer1 = inputInt.reduce( (acc, current) => acc + current);
//console.log('answer 1:', answer1 );

// Puzzle 2

let currentSum = 0;
let sums = [];
// count only used for stat in output
let count = 0;

for (let i = 0; i < inputInt.length; i++) {

    // prevSum not necessary, just for logging pretty equations on command line
    let prevSum = currentSum;
    currentSum = currentSum + inputInt[i];
    console.log('equation:', currentSum, ' = ', prevSum, ' + ', inputInt[i]);

    // start over at beginning of list of inputs if necessary (dup not found below)
    if (i == inputInt.length-1) {
        i = -1;
    }
    
    // search accumulated sums array for duplicate of currentSum
    if (sums.find((element) => element === currentSum)) {
        // only pushing this last sum so it appears at the end of the array in the result log
        sums.push(currentSum);
        console.log('sums:', sums.toString(), ' currentSum:', currentSum);
        console.log('found first duplicate after ', count, ' tries');
        console.log('answer 2:', currentSum);
        break;
    }
    // keep a list of accumulated sums to check back on for first duplicate
    // with each iteration of the loop
    sums.push(currentSum);
    count++;
}