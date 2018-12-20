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
    // console.log('charCount:', charCount);
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
//getAnswer1(input);

const getAnswer2 = input => {
  input.forEach((box, i) => {
    // looping though every box id, first get a list of
    // box ids that don't include the one we're going to check
    // all others against
    let everyOtherBox = input.slice(0);
    everyOtherBox.splice(i, 1);
    // using .some so that we can stop the loop as soon as
    // checkUs finds an answer and returns true
    everyOtherBox.some(otherBox => {
      // check the box id we're currently on in the forEach loop
      // against one of the other box ids in the whole input list of box ids
      return checkUs(box, otherBox);
    });
  });
};

const checkUs = (box1, box2) => {
  // break each of the box ids into an array of characters
  const box1arr = box1.split('');
  const box2arr = box2.split('');
  // initialize an array to hold our cumulative list
  // of matched ids
  const matchedChars = [];
  // this loop assumes that all of our box ids have the same
  // number of characters, so just use the length of the first
  // one.
  // Check each character from box1 with against each character
  // in box2 in the same position
  box1arr.forEach((char, i) => {
    if (char === box2arr[i]) {
      matchedChars.push(char);
    }
  });
  // if the cumulative total of matchedChars is equal in length of
  // a box id (which are all the same) minus 1, then it satifies the
  // puzzle's test requirement of matching all characters from one box
  // id with another's in the same positions except for one.
  // This will return the answer twice, as the second of the matched
  // will again match the first as we loop though all box ids in the
  // function calling this one. Inefficent perhaps...
  if (matchedChars.length == box1arr.length - 1) {
    console.log(`Answer 2 is: ${matchedChars.join('')}`);
    return true;
  }
  return false;
};

getAnswer2(input);
