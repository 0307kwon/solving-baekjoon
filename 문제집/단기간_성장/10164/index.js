const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const [N, r, c] = inputs[0].split(" ").map((v) => +v);

const getSegmentNumber = (n, r, c) => {
  const center = Math.pow(2, n) / 2;

  let segmentNumber = 0;
  if (c >= center) {
    segmentNumber += 1;
  }
  if (r >= center) {
    segmentNumber += 2;
  }

  return segmentNumber;
};

let visitingNumber = 0;

const recursive = (n, r, c) => {
  if (n === 0) {
    return;
  }

  const segmentNumber = getSegmentNumber(n, r, c);
  visitingNumber += Math.pow(2, n - 1) * Math.pow(2, n - 1) * segmentNumber;

  let nextRow = r;
  let nextCol = c;

  if (segmentNumber === 1 || segmentNumber === 3) {
    nextCol -= Math.pow(2, n - 1);
  }
  if (segmentNumber === 2 || segmentNumber === 3) {
    nextRow -= Math.pow(2, n - 1);
  }

  recursive(n - 1, nextRow, nextCol);
};

recursive(N, r, c);
console.log(visitingNumber);
