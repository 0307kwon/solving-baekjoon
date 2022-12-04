const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0].split(" ")[0];
const M = +inputs[0].split(" ")[1];
let deque = [...Array(N)].map((_, idx) => idx + 1);

// 오른쪽이나 왼쪽 모두 현재 위치보다 숫자가 무조건 큼

let count = 0;

const popFront = () => {
  return deque.shift();
};

const moveLeft = () => {
  const value = popFront();
  deque.push(value);
  count += 1;
};

const moveRight = () => {
  const value = deque.pop();
  deque = [value, ...deque];
  count += 1;
};

const getRightDistance = (targetNum) => {
  let distance = 0;
  let curNum = 0;

  while (deque[curNum] !== targetNum) {
    curNum += 1;
    distance += 1;
  }

  return distance;
};

const getLeftDistance = (targetNum) => {
  let distance = 0;
  let curNum = 0;

  while (deque[curNum] !== targetNum) {
    curNum -= 1;
    if (curNum < 0) {
      curNum = deque.length - 1;
    }

    distance += 1;
  }

  return distance;
};

const shouldPickValues = inputs[1].split(" ").map((value) => +value);

for (let i = 0; i < M; i++) {
  const targetValue = shouldPickValues[i];

  // idx 0은 항상 현재 위치
  if (targetValue === deque[0]) {
    popFront();
    continue;
  }

  const leftDistance = getLeftDistance(targetValue);
  const rightDistance = getRightDistance(targetValue);

  if (leftDistance < rightDistance) {
    [...Array(leftDistance)].forEach(moveRight);
  } else {
    [...Array(rightDistance)].forEach(moveLeft);
  }

  popFront();
}

console.log(count);
