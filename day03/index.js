const fs = require('fs');
const path = './input.txt';
const input = fs
  .readFileSync(path)
  .toString()
  .split('\n');
/**
 * Get answer 1
 * @param {Array} input 
 */
const getAnswer1 = input => {
  // return a matrix (i think that's the correct term?) of objects
  // to represent a grid with locations and settings
  const fabricMatrix = returnFabricMatrix(1000);
  // go through the array of inputs and first create an elfSheet,
  // an array of IDs derived from the fabricMatic that represent a
  // claimed subset of 1 sq in locations based on the input passed
  // to returnElfSheet with sheetString.
  input.forEach(sheetString => {
    const elfSheet = returnElfSheet(sheetString, fabricMatrix);
    // using each ID in elfSheet, increment the referenced location
    // in fabricMatrix[id].claimCount by 1.
    elfSheet.forEach(id => {
      fabricMatrix[id].claimCount++;
    });
  });
  // once all of the elfSheets have been process and their respective
  // claimed ids recored in the fabricMatrix, return a count of how
  // many locations have been claimed more than once.
  console.log(getOverlaps(fabricMatrix));
};

/**
 * return a count of how many locations have been claimed more than once.
 * @param {Array} fabricMatrix 
 */
const getOverlaps = (fabricMatrix) => {
    let overlapCount = 0;
    fabricMatrix.forEach( (locationObj) => {
        if (locationObj.claimCount > 1) {
            overlapCount++;
        }
    })
    return overlapCount;
}
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

  // based on our input, well find a list of 'claimed' IDs
  // and push them into here
  const elfSheet = [];

  // get a list of values that represent the x locations
  // on the fabricMatix that would be occupied by the currently
  // processed elfSheet. Do this by counting thought the 
  // value of width and for each iteration, push leftMove 
  // (converted from 0 base to 1 base) added to the current value
  // of i
  const xCoords = [];
  for (let i = 0; i < width; i++) {
      xCoords.push(leftMove + 1 + i);
  }
  //console.log(`xCoords: ${xCoords}`);
    
  // get a list of values that represent the y locations
  // on the fabricMatix that would be occupied by the currently
  // processed elfSheet. Do this by counting thought the 
  // value of height and for each iteration, push topMove 
  // (converted from 0 base to 1 base) added to the current value
  // of i
  const yCoords = [];
  for (let i = 0; i < height; i++) {
    yCoords.push(topMove + 1 + i);
  }
  //console.log(`yCoords: ${yCoords}`);

  // loop though either axis of the elfSheet, in this
  // case, the horizontal values (x) and, in a nested loop
  // for each value of the parent loop, loop though
  // the other axis (in this case y) and find locations in the
  // fabricMatix that have an x/y value that matches both of
  // the coordinates being referenced in the current iteration.
  // push that objects id value into elfSheet.
  xCoords.forEach(x => {
    yCoords.forEach(y => {
      const foundLocation = fabricMatrix.find(locationObj => {
        return locationObj.x == x && locationObj.y == y;
      });
      elfSheet.push(foundLocation.id);
    });
  });
  console.log(`sheet completed: `, sheetString);
  // return an array of ids found in the above nested loop.
  // this is a single elf's sheet of claimed locations
  return elfSheet;
};
/**
 * Based on the assumption that fabrixMatix is a square,
 * return an array of objects that will represent a
 * sheet of fabric from which each elf's claimed locartion
 * will be represented by a value of 1 or more in each
 * objects claimCount value.
 * @param {Number} inches the length of on side of the fabric
 */
const returnFabricMatrix = inches => {
  const area = inches * inches;
  const fabricMatrix = [];
  let yIncrementor = 1;
  // create an object for every square inch of the calculated
  // area.
  for (let i = 0; i < area; i++) {
    locationObj = {
      claimCount: 0,
      id: i
    };
    // use modulo to repeat a sequense of x values
    // that represent each column of inches in the fabric.
    // make sure we start at 1 not 0
    locationObj.x = (i % inches) + 1;
    // the y value of each object represents a row of inches
    // in the fabric. The row value (y) increases when the
    // last column is calculated with modulo
    locationObj.y = yIncrementor;
    if ((i + 1) % inches == 0) {
      yIncrementor++;
    }
    fabricMatrix.push(locationObj);
  }
  // return an array of objects created and pushed above that 
  // represent the fabricMatix
  return fabricMatrix;
};

getAnswer1(input);
