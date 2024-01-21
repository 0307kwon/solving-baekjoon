const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0];
const numbers = inputs[1].split(" ").map((num) => +num);
const points = Array(N).fill(null);

points[N - 1] = numbers[N - 1];

for (let i = 1; i < N - 1; i++) {
  const target = numbers[i];
  const prev = numbers[i - 1];
  const next = numbers[i + 1];

  if (prev < target && target > next) {
    points[i] = target;
    continue;
  }

  if (prev < target && target < next) {
    points[i] = target;
  }
}

let result = Array(N).fill(-1);
let pointStack = [points[N - 1]];

for (let i = N - 2; i >= 0; i--) {
  if (pointStack.length > 0) {
    for (let j = points.length - 1; j >= 0; j--) {
      if (pointStack[j] > numbers[i]) {
        result[i] = pointStack[j];
        break;
      }
    }
  }

  if (points[i]) {
    pointStack.push(points[i]);
  }
}

console.log(result.join(" "));
