const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0];
const M = +inputs[1];

// index 0은 사용하지 않음.
const graph = [...new Array(N + 1)].map(() =>
  [...new Array(N + 1)].fill(Infinity)
);

inputs.slice(2, 2 + N).forEach((input, indexI) => {
  if (!input) return;

  input.split(" ").forEach((num, indexJ) => {
    const startIndex = indexI + 1;
    const endIndex = indexJ + 1;
    graph[startIndex][endIndex] = +num;
  });
});

for (let i = 1; i <= N; i++) {
  for (let row = 1; row <= N; row++) {
    for (let col = row + 1; col <= N; col++) {
      // row -> col으로 바로 가는 길이 있을 때
      if (graph[row][col] === 1) continue;

      // row -> k -> col 로 가는 길이 있는지 확인
      for (let k = 1; k <= N; k++) {
        if (k === row || k === col) continue;
        if (graph[row][k] === 1 && graph[k][col] === 1) {
          graph[row][col] = 1;
          graph[col][row] = 1;
        }
      }
    }
  }
}

for (let i = 1; i <= N; i++) {
  graph[i][i] = 1;
}

const travelPlan = inputs[2 + N].split(" ").map((num) => +num);

for (let i = 1; i < travelPlan.length; i++) {
  const startCity = travelPlan[i - 1];
  const endCity = travelPlan[i];
  if (!graph[startCity][endCity]) {
    console.log("NO");
    return;
  }
}

console.log("YES");
