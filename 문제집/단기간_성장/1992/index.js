const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const input = inputs[0].split(" ").map((v) => +v);
const A = BigInt(input[0]);
const B = input[1];
const C = BigInt(input[2]);

const getRemainder = (exponent) => {
  if (exponent === 1) {
    return A % C;
  }

  // log n으로 연산량을 줄이기 위해 2로 나눔.
  // k = A^(exponent / 2) % C
  // k = BigInt
  const k = getRemainder(Math.floor(exponent / 2));

  // 짝수
  if (exponent % 2 === 0) {
    return (k * k) % C;
  }

  // 홀수
  return (k * k * (A % C)) % C;
};

console.log(getRemainder(B).toString());
