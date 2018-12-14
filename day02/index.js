const fs = require('fs');
const path = './input.txt';
const input = fs
  .readFileSync(path)
  .toString()
  .split('\n');

const getAnswer1 = input => {
  // integers that will be incremented for each box that contains
  // either duplicate or triplicate characters and then multiplied
  // together to find checksum
  let boxesWith2 = 0;
  let boxesWith3 = 0;

  input.forEach(id => {
    let matchedObj = {};
    let idSplit = id.split('');

    idSplit.forEach(char => {
      if (matchedObj[char]) {
        matchedObj[char]++;
      } else {
        matchedObj[char] = 1;
      }
    });

    const charCount = Object.values(matchedObj);
    console.log('charCount:', charCount);
    let foundOccuranceOf2 = false;
    let foundOccuranceOf3 = false;
    charCount.forEach(element => {
      if (element == 2 && !foundOccuranceOf2) {
        boxesWith2++;
        foundOccuranceOf2 = true;
      } else if (element == 3 && !foundOccuranceOf3) {
        boxesWith3++;
        foundOccuranceOf3 = true;
      }
    });
  });
  console.log('boxesWith2:', boxesWith2, ' boxesWith3:', boxesWith3);
  console.log('answer 1:', boxesWith2 * boxesWith3);
};
getAnswer1(input);
