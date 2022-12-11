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

const map = [];

[...Array(N)].forEach((_, idx) => {
  map.push([...inputs[idx + 1]].map((value) => +value));
});

const queue = [[0, 0]];
const possibleNextPosOffsets = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

while (queue.length > 0) {
  const [row, col] = queue.shift();

  // 최종 위치에 도착하면 while문 끝
  if (row === N - 1 && col === M - 1) {
    break;
  }

  // 다음 방문 가능 위치 큐에 입력
  possibleNextPosOffsets.forEach(([offsetRow, offsetCol]) => {
    const [nextRow, nextCol] = [row + offsetRow, col + offsetCol];

    if (nextRow < 0 || nextRow > N - 1) {
      return;
    }

    if (nextCol < 0 || nextCol > M - 1) {
      return;
    }

    if (map[nextRow][nextCol] === 1) {
      queue.push([nextRow, nextCol]);

      map[nextRow][nextCol] += map[row][col];
    }
  });

  // 현재 위치 방문함으로 변경
  map[row][col] = 0;
}

console.log(map[N - 1][M - 1]);
