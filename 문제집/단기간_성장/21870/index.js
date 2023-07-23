const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const numbers = inputs[1].split(" ").map((v) => +v);

const getGCD = (a, b) => {
  if (b === 0) {
    return a;
  }

  return getGCD(b, a % b);
};

let gcdSum = 0;

const getMaxGCDSum = (selectedNumbers, curSum) => {
  if (selectedNumbers.length === 1) {
    const lastNumber = selectedNumbers[0];
    gcdSum = Math.max(gcdSum, curSum + lastNumber);
    return;
  }

  const leftSelectedCount = Math.floor(selectedNumbers.length / 2);
  const rightNumbers = selectedNumbers.slice(
    leftSelectedCount,
    selectedNumbers.length
  );
  const leftNumbers = selectedNumbers.slice(0, leftSelectedCount);

  // 오른쪽 계산 후 왼쪽 numbers 넘김.
  const rightGCD = rightNumbers.reduce(
    (gcd, curNumber) => getGCD(curNumber, gcd),
    0
  );
  getMaxGCDSum(leftNumbers, curSum + rightGCD);
  // 왼쪽 계산 후 오른쪽 numbers 넘김
  const leftGCD = leftNumbers.reduce(
    (gcd, curNumber) => getGCD(curNumber, gcd),
    0
  );
  getMaxGCDSum(rightNumbers, curSum + leftGCD);
};

getMaxGCDSum(numbers, 0);

console.log(gcdSum);
