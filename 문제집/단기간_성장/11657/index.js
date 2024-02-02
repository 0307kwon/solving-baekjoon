const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

// N = 도시 수, M = 간선 수
const [N, M] = inputs[0].split(" ").map((num) => +num);

// 0 index는 사용하지 않음.
// graph[row][col] = row에서 col로 가는 비용
const graph = [...Array(N + 1)].map(() => [...Array(N + 1)].fill(Infinity));

inputs.slice(1).forEach((input) => {
  if (!input) return;
  const [start, end, cost] = input.split(" ").map((num) => +num);

  graph[start][end] = Math.min(graph[start][end], cost);
});

// 벨만 포드 알고리즘
// 정보 불균형 문제를 해결하기 위해 N - 1번 반복
for (let i = 0; i < N - 1; i++) {
  // 모든 간선에 대해 노드 1을 기준으로 최단 거리 갱신
  // 시작 노드에 1 노드도 포함한다. (1 -> 1 케이스도 있기 때문)
  for (let start = 1; start <= N; start++) {
    for (let end = 1; end <= N; end++) {
      if (graph[start][end] === Infinity) continue;
      // 1 -> end vs 1 -> start -> end
      graph[1][end] = Math.min(
        graph[1][end],
        graph[1][start] + graph[start][end]
      );
    }
  }
}

// 음의 사이클이 있는지 확인하기 위해 한번 더 반복
// 있다면, 최단 거리가 갱신됨
for (let start = 1; start <= N; start++) {
  for (let end = 1; end <= N; end++) {
    if (graph[start][end] === Infinity) continue;

    if (graph[1][end] > graph[1][start] + graph[start][end]) {
      console.log(-1);
      return;
    }
  }
}

for (let i = 2; i <= N; i++) {
  if (graph[1][i] === Infinity) {
    console.log(-1);
    continue;
  }

  console.log(graph[1][i]);
}
