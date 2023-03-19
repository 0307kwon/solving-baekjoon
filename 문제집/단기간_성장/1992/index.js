const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

// 재귀로
const N = +inputs[0];

const picture = [...new Array(N)].map(() => [...new Array(N)]);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    picture[i][j] = +inputs[i + 1][j];
  }
}

// [y][x]
const recursive = (range) => {
  const { start, end } = range;

  const n = end.x - start.x + 1;

  if (n === 2) {
    // 종료 조건
    const stringSum = `${picture[start.y][start.x]}${picture[start.y][end.x]}${
      picture[end.y][start.x]
    }${picture[end.y][end.x]}`;

    if (stringSum === "0000") {
      return "0";
    }

    if (stringSum === "1111") {
      return "1";
    }

    return `(${stringSum})`;
  }

  // 가로 세로 반 잘라서 4번 리커시브
  const topLeft = recursive({
    start,
    end: { x: start.x + n / 2 - 1, y: start.y + n / 2 - 1 },
  });
  const topRight = recursive({
    start: { x: start.x + n / 2, y: start.y },
    end: { x: end.x, y: end.y - n / 2 },
  });
  const bottomLeft = recursive({
    start: { x: start.x, y: start.y + n / 2 },
    end: { x: end.x - n / 2, y: end.y },
  });
  const bottomRight = recursive({
    start: { x: start.x + n / 2, y: start.y + n / 2 },
    end,
  });

  const sumString = `${topLeft}${topRight}${bottomLeft}${bottomRight}`;

  if (sumString === "0000") {
    return "0";
  }

  if (sumString === "1111") {
    return "1";
  }

  return `(${sumString})`;
};

let answer;

if (N === 1) {
  answer = inputs[1];
} else {
  answer = recursive({
    start: { x: 0, y: 0 },
    end: { x: N - 1, y: N - 1 },
  });
}

console.log(answer);
