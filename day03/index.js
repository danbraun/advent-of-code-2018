const fs = require('fs');
const path = './input.txt';
const input = fs
  .readFileSync(path)
  .toString()
  .split('\n');

const getAnswer1 = tempInput => {
  // return a matrix (i think that's the correct term?) of objects
  // to represent a grid with locations and settings
  const fabricMatrix = returnFabricMatrix(1000);
  // for testing, return values from a test string: '#1 @ 1,3: 4x4'

  tempInput.forEach(sheetString => {
    const elfSheet = returnElfSheet(sheetString, fabricMatrix);
    elfSheet.forEach(id => {
      fabricMatrix[id].claimCount++;
    });
  });
};
/**
 * Return an 'elf sheet', an array of ids that represent
 * all of the claimed inches of a particular sheet.
 * @param {string} sheetString
 * @param {Array} fabricMatrix
 */
const returnElfSheet = (sheetString, fabricMatrix) => {
  const topLeft = sheetString
    .split('@ ')[1]
    .split(':')[0]
    .split(',');
  const widthHeight = sheetString.split(': ')[1].split('x');

  // from all the splitting above, we now have a left / top (leftMove / topMOve)
  // corner to begin a claimed rectangle. Additionally we have a width
  // and height for the rectangle
  const leftMove = Number(topLeft[0]);
  const topMove = Number(topLeft[1]);
  const width = Number(widthHeight[0]);
  const height = Number(widthHeight[1]);

  // based on our input, well find a list of 'claimed' objects
  // and push them into here
  const elfSheet = [];

  const xCoords = [];
  const yCoords = [];
  for (let i = 0; i < width; i++) {
    xCoords.push(leftMove + 1 + i);
  }
  //console.log(`xCoords: ${xCoords}`);

  for (let i = 0; i < height; i++) {
    yCoords.push(topMove + 1 + i);
  }
  //console.log(`yCoords: ${yCoords}`);

  xCoords.forEach(x => {
    yCoords.forEach(y => {
      const foundLocation = fabricMatrix.find(locationObj => {
        return locationObj.x == x && locationObj.y == y;
      });
      elfSheet.push(foundLocation.id);
    });
  });
  console.log(`len: ${elfSheet.length} elfSheet: `, elfSheet);
  return elfSheet;
};

const testInput = ['#1 @ 1,3: 2x3'];
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
getAnswer1(input.splice(0, 10));
