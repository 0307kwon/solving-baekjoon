const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0].split(" ")[0];
const array = inputs[1]
  .trim()
  .split(" ")
  .map((value) => +value)
  .sort((a, b) => a - b);

const answer1 = () => {
  // 1. A[0] > A[1]

  let first;
  let end;
  const odd = [];
  const even = [];
  const ascendingOrder = [...array];

  [...Array(N)].forEach((_, idx) => {
    if (idx === 0 || idx === N - 1) return;

    if (idx % 2 === 0) {
      // 큰 값 push
      even.push(ascendingOrder.pop());
    } else {
      // 작은 값 push
      odd.push(ascendingOrder.shift());
    }
  });

  first = ascendingOrder.pop();
  end = ascendingOrder.shift();

  let result;

  if (N % 2 === 0) {
    result =
      first -
      end -
      2 * odd.reduce((prev, cur) => prev + cur, 0) +
      2 * even.reduce((prev, cur) => prev + cur, 0);
  } else {
    result =
      first +
      end -
      2 * odd.reduce((prev, cur) => prev + cur, 0) +
      2 * even.reduce((prev, cur) => prev + cur, 0);
  }

  return result;
};

const answer2 = () => {
  // 1. A[0] < A[1]

  let first;
  let end;
  const odd = [];
  const even = [];
  const ascendingOrder = [...array];

  [...Array(N)].forEach((_, idx) => {
    if (idx === 0 || idx === N - 1) return;

    if (idx % 2 === 0) {
      // 작은 값 push
      even.push(ascendingOrder.shift());
    } else {
      // 큰 값 push
      odd.push(ascendingOrder.pop());
    }
  });

  // 작은 값 push
  first = ascendingOrder.shift();
  // 큰 값 push
  end = ascendingOrder.pop();

  let result;

  if (N % 2 === 0) {
    result =
      -first +
      end +
      2 * odd.reduce((prev, cur) => prev + cur, 0) -
      2 * even.reduce((prev, cur) => prev + cur, 0);
  } else {
    result =
      -first -
      end +
      2 * odd.reduce((prev, cur) => prev + cur, 0) -
      2 * even.reduce((prev, cur) => prev + cur, 0);
  }

  return result;
};

console.log(Math.max(answer1(), answer2()));
