const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0];

const numbers = inputs[1]
  .split(" ")
  .map((v) => +v)
  .sort((a, b) => Math.abs(a) - Math.abs(b));

let similarValueToZero = Infinity;
let result = [];

for (let i = 0; i < numbers.length - 1; i++) {
  const leftValue = numbers[i];
  const rightValue = numbers[i + 1];

  const sum = leftValue + rightValue;

  if (Math.abs(similarValueToZero) > Math.abs(sum)) {
    similarValueToZero = sum;
    result = [leftValue, rightValue];
  }
}

console.log(result.sort((a, b) => a - b).join(" "));
