const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0];
const M = +inputs[2];

const combinationA = inputs[1].split(" ").map((v) => +v);
const combinationB = inputs[3].split(" ").map((v) => +v);

const combinationGCD = [];

const getGCD = (numberA, numberB) => {
  if (numberA === 0) {
    return numberB;
  }

  if (numberB === 0) {
    return numberA;
  }

  if (numberA >= numberB) {
    return getGCD(numberB, numberA % numberB);
  }

  return getGCD(numberA, numberB % numberA);
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const gcd = getGCD(combinationA[i], combinationB[j]);

    combinationA[i] /= gcd;
    combinationB[j] /= gcd;
    combinationGCD.push(gcd);
  }
}

console.log(
  combinationGCD
    .reduce((acc, cur) => acc * BigInt(cur), BigInt(1))
    .toString()
    .slice(-9)
);
