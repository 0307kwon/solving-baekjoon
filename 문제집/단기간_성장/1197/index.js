const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const [V, E] = inputs[0].split(" ").map((input) => +input);

const edges = inputs.slice(1, 1 + E).map((input) => {
  const [A, B, C] = input.split(" ").map((num) => +num);
  return {
    start: A,
    end: B,
    weight: C,
  };
});

const sortedEdges = edges.sort((a, b) => a.weight - b.weight);

// 0은 사용하지 않음.
// const isVisited = Array(V + 1).fill(false);

const unionFindArray = [...Array(V + 1)].map((_, index) => index);

// root 노드 찾기
const find = (x) => {
  if (unionFindArray[x] === x) return x;

  return find(unionFindArray[x]);
};

const union = (x, y) => {
  const rootX = find(x);
  const rootY = find(y);

  if (rootX === rootY) return;

  unionFindArray[rootY] = rootX;
};

const answerEdgeWeights = [];
for (let i = 0; i < sortedEdges.length; i++) {
  const { start, end, weight } = sortedEdges[i];

  if (answerEdgeWeights.length === V - 1) {
    break;
  }

  // 사이클 확인
  if (find(start) === find(end)) continue;

  union(start, end);
  answerEdgeWeights.push(weight);
}

console.log(answerEdgeWeights.reduce((acc, cur) => acc + cur, 0));
