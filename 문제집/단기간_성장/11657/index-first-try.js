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
const graph = [...Array(N + 1)].map(() => [...Array(N + 1)].fill(null));

inputs.slice(1).forEach((input) => {
  if (!input) return;
  const [start, end, cost] = input.split(" ").map((num) => +num);

  if (graph[start][end] === null) {
    graph[start][end] = {
      cost,
      routes: [start, end],
    };
    return;
  }

  graph[start][end].cost = Math.min(graph[start][end].cost, cost);
});

const getCycleRoutes = (routes) => {
  const targetNum = routes[routes.length - 1];

  for (let i = 0; i < routes.length - 1; i++) {
    if (routes[i] === targetNum) {
      return routes.slice(i);
    }
  }
};
const isMinusCycle = (cycle) => {
  let cycleCost = 0;

  // 음의 사이클인지 확인
  for (let i = 0; i < cycle.length - 1; i++) {
    const start = cycle[i];
    const end = cycle[i + 1];

    cycleCost += graph[start][end].cost;
  }

  return cycleCost < 0;
};

for (let i = 0; i < N - 1; i++) {
  for (let start = 2; start <= N; start++) {
    for (let end = 1; end <= N; end++) {
      if (graph[start][end] === null) continue;

      // 1 -> start -> end
      // 1 -> start가 존재하지 않는 경우
      if (graph[1][start] === null) continue;

      // 1 -> start가 존재하는 경우

      // 1 -> end가 존재하지 않는 경우
      if (graph[1][end] === null) {
        graph[1][end] = {
          cost: graph[1][start].cost + graph[start][end].cost,
          routes: [
            ...graph[1][start].routes,
            ...graph[start][end].routes.slice(1),
          ],
        };

        // 음의 사이클 존재 여부 확인
        const cycle = getCycleRoutes(graph[1][end].routes);
        if (cycle === undefined) continue;
        if (isMinusCycle(cycle)) {
          console.log(-1);
          return;
        }

        continue;
      }

      // 1 -> start -> end가 1 -> end보다 큰 경우
      const detourCost = graph[1][start].cost + graph[start][end].cost;
      if (detourCost >= graph[1][end].cost) continue;

      // 1 -> start -> end가 1 -> end보다 작은 경우
      graph[1][end] = {
        cost: detourCost,
        routes: [
          ...graph[1][start].routes,
          ...graph[start][end].routes.slice(1),
        ],
      };

      // 음의 사이클 존재 여부 확인
      const cycle = getCycleRoutes(graph[1][end].routes);
      if (cycle === undefined) continue;
      if (isMinusCycle(cycle)) {
        console.log(-1);
        return;
      }
    }
  }
}

// N이 1인 경우는 제외
for (let i = 2; i <= N; i++) {
  if (graph[1][i] === null) {
    console.log(-1);
    continue;
  }

  console.log(graph[1][i].cost);
}
