const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0].split(" ")[0];

let answer = 0;
const bundles = [];
const v = [];

let countResult = Infinity;

const recursion = (curCombination, count) => {
  if (curCombination.length === N) {
    countResult = Math.min(count, countResult);
    return;
  }

  for (let i = 0; i < N; i++) {
    if (v[i]) continue;
    v[i] = true;

    const nextCombination = [...curCombination];
    nextCombination.push(bundles[i]);

    recursion(
      nextCombination,
      count +
        (nextCombination.length > 1 &&
        nextCombination[nextCombination.length - 2][1] !==
          nextCombination[nextCombination.length - 1][0]
          ? 1
          : 0)
    );
    v[i] = false;
  }
};

for (let i = 0; i < N; i++) {
  let input = inputs[i + 1];

  for (let j = 0; j < input.length - 1; j++) {
    if (input[j] !== input[j + 1]) {
      answer += 1;
    }
  }

  // 단순화
  bundles.push(input[0] + input[input.length - 1] ?? input[0]);
}

recursion([], 0);
answer += countResult;

console.log(answer);
