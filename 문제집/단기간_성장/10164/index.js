const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const [N, M, K] = inputs[0].split(" ").map((v) => +v);

const trackBackward = (point, startPoint) => {
  if (point === startPoint) {
    return 1;
  }

  const horizontalBackPoint = point - 1;
  const verticalBackPoint = point - M;

  let result = 0;

  // horizontal과 현재 point가 같은 행에 있어야함
  if (
    Math.floor((horizontalBackPoint - 1) / M) === Math.floor((point - 1) / M)
  ) {
    result += trackBackward(horizontalBackPoint, startPoint);
  }

  if (verticalBackPoint >= startPoint) {
    result += trackBackward(verticalBackPoint, startPoint);
  }

  return result;
};

const calcPaths = (start, end) => {
  return trackBackward(end, start);
};

let answer;

if (K === 0) {
  answer = calcPaths(1, N * M);
} else {
  answer = calcPaths(1, K) * calcPaths(K, N * M);
}

console.log(answer);
