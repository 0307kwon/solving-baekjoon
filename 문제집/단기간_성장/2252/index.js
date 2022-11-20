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

const graph = [...Array(N + 1)].map(() => []);
const lineCounts = [...Array(N + 1)].fill(0);

// 인접 리스트 - 정점 연결
for (let i = 1; i < inputs.length; i++) {
  if (inputs[i] === "") {
    continue;
  }

  const x = +inputs[i].split(" ")[0];
  const y = +inputs[i].split(" ")[1];

  lineCounts[y] += 1;
  graph[x].push(y);
}

const queue = [];
const tOrder = [];

const findInDegreeZeros = () => {
  const result = [];

  for (let i = 1; i < lineCounts.length; i++) {
    if (lineCounts[i] === -1) {
      continue;
    }

    // 진입 차수 0인 정점 찾기
    const lineCount = lineCounts[i];

    if (lineCount === 0) {
      result.push(i);
    }
  }

  return result;
};

queue.push(...findInDegreeZeros());

for (let i = 0; i < N; i++) {
  const nodeNum = queue.shift();

  // 선택된 정점과 연결된 모든 간선 제거
  for (let i = 0; i < graph[nodeNum].length; i++) {
    const arrivedNode = graph[nodeNum][i];

    lineCounts[arrivedNode] -= 1;
  }
  graph[nodeNum] = [];
  lineCounts[nodeNum] = -1;

  tOrder.push(nodeNum);

  if (queue.length === 0) {
    queue.push(...findInDegreeZeros());
  }
}

console.log(tOrder.join(" "));
