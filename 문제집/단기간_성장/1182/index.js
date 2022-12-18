const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0].split(" ")[0];
const S = +inputs[0].split(" ")[1];

// 순서 고정
const numbers = inputs[1]
  .split(" ")
  .map((value) => +value)
  .sort();
let count = 0;

const pick = (curNumbers, curCombination) => {
  if (curNumbers.length === 0) {
    return;
  }

  for (let i = 0; i < curNumbers.length; i++) {
    const newNumbers = [...curNumbers];

    const pickedValue = newNumbers[i];
    newNumbers.splice(0, i + 1);

    const newCombination = [...curCombination, pickedValue];

    const sum = newCombination.reduce((prev, cur) => prev + cur, 0);

    if (sum === S) {
      count += 1;
    }

    pick(newNumbers, newCombination);
  }
};

pick(numbers, []);

console.log(count);
