const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0];

let criterionPoint;

let vectorA;
let vectorB;

let area = 0;

for (let i = 1; i < N + 1; i++) {
  const [x, y] = inputs[i].split(" ").map((v) => +v);

  if (i === 1) {
    criterionPoint = { x, y };
    continue;
  }

  if (!vectorA) {
    vectorA = { x: x - criterionPoint.x, y: y - criterionPoint.y };
    continue;
  }

  vectorB = { x: x - criterionPoint.x, y: y - criterionPoint.y };

  // 벡터 A x 벡터 B

  const crossProductZ = vectorA.x * vectorB.y - vectorA.y * vectorB.x;

  area += crossProductZ / 2.0;

  // 벡터 A를 B 값으로 대체

  vectorA = vectorB;
  vectorB = undefined;
}

// 계산 순서에 따라서 결과 값이 음수가 나올 수 있으므로 절대값
console.log((Math.round(Math.abs(area) * 10) / 10).toFixed(1));
