const fs = require('fs');
const path = './input.txt';
const input = fs
  .readFileSync(path)
  .toString()
  .split('\n');

const getAnswer1 = input => {
  // return a matrix (i think that's the correct term?) of objects
  // to represent a grid with locations and settings
  const fabricMatrix = returnFabricMatrix(8);
  // for testing, return values from a test string: '#1 @ 1,3: 4x4'
  const topLeft = input[0]
    .split('@ ')[1]
    .split(':')[0]
    .split(',');
  const widthHeight = input[0].split(': ')[1].split('x');

  // from all the splitting above, we now have a left / top (leftMove / topMOve)
  // corner to begin a claimed rectangle. Additionally we have a width
  // and height for the rectangle
  const leftMove = Number(topLeft[0]);
  const topMove = Number(topLeft[1]);
  const width = Number(widthHeight[0]);
  const height = Number(widthHeight[1]);

  // based on our input, well find a list of 'claimed' objects
  // and push them into here
  const foundLocationIds = [];

  // loop through a total identified by width and use Array.find
  // to find the top row of the claimed rectangle
  for (let i = 0; i < width; i++) {
    // with each iteration of width, use Array.find to loop though the
    // entire fabricMatrix array and find location objects in the matrix
    // that have x's and y's that match x+i (which increases with each iteration
    // of the above for loop) and y (which for now stays the same)
    const foundLocation = fabricMatrix.find(locationObj => {
      // locationObj.x and locationObj.y are 1 based so add one to leftMove / topMove
      const x = leftMove + 1 + i;
      const y = topMove + 1;
      return locationObj.x == x && locationObj.y == y;
    });
    //console.log(`foundLocation.id: ${foundLocation.id}`);
    foundLocationIds.push(foundLocation.id);
  }

  foundLocationIds.forEach(id => {
    fabricMatrix[id].claimCount++;
  });
  //console.log(fabricMatrix);
};

// Find all coords that should be claimed?
const coordsToClaim = [];
for (let i = 0; i < width; i++) {}

const testInput = ['#1 @ 1,3: 4x4'];
const returnFabricMatrix = inches => {
  const area = inches * inches;
  const fabricMatrix = [];
  let yIncrementor = 1;
  for (let i = 0; i < area; i++) {
    locationObj = {
      claimCount: 0,
      id: i
    };
    locationObj.x = (i % inches) + 1;
    locationObj.y = yIncrementor;
    if ((i + 1) % inches == 0) {
      yIncrementor++;
    }
    fabricMatrix.push(locationObj);
  }
  return fabricMatrix;
};
getAnswer1(testInput);
