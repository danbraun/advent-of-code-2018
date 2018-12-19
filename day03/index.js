const fs = require('fs');
const path = './input.txt';
const input = fs
  .readFileSync(path)
  .toString()
  .split('\n');

const getAnswer1 = (input) => {
    const fabricMatrix = returnFabricMatrix(8);
    const topLeft = input[0].split('@ ')[1].split(':')[0].split(',');
    const widthHeight = input[0].split(': ')[1].split('x');
    
    const leftMove = Number(topLeft[0]);
    const topMove = Number(topLeft[1]);
    const width = Number(widthHeight[0]);
    const height = Number(widthHeight[1]);

    const foundLocationIds = [];

    for (let i = 0; i < width; i++) {
        const foundLocation = fabricMatrix.find( (locationObj) => {
            const x = leftMove+1;
            const y = topMove+1
            return locationObj.x == x+i && locationObj.y == y;
        })
        foundLocationIds.push(foundLocation.id);
    }
    for (let i = 0; i < height; i++) {
        const foundLocation = fabricMatrix.find( (locationObj) => {
            const x = leftMove+1;
            const y = topMove+1
            return locationObj.x == x && locationObj.y == y+1;
        })
        foundLocationIds.push(foundLocation.id);
    }
    console.log(foundLocationIds);
    foundLocationIds.forEach( (id) => {
        fabricMatrix[id].claimCount++;
    })
    console.log(fabricMatrix);
    
}

const testInput = [
    '#1 @ 1,3: 4x4'
];
const returnFabricMatrix = (inches) => {
    const area = inches*inches;
    const fabricMatrix = [];
    let yIncrementor = 1;
    for ( let i = 0; i<area; i++) {
        locationObj = {
            claimCount: 0,
            id: i
        }
        locationObj.x = i%inches+1;
        locationObj.y = yIncrementor;
        if ((i+1)%inches == 0) {
            yIncrementor++;
        }
        fabricMatrix.push(locationObj);
    }
    return fabricMatrix;
}
getAnswer1(testInput)