const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const [M, N] = inputs[0].split(" ").map((v) => +v);

let maxTomatoCount = 0;
let ripeTomatoCount = 0;
// {x: number, y:number, day: number}
const queue = [];
let curQueuePointer = 0;

const tomatoBox = inputs.slice(1, 1 + N).map((v, yIndex) =>
  v.split(" ").map((v, xIndex) => {
    const tomato = +v;

    if (tomato === 1) {
      ripeTomatoCount += 1;
      queue.push({ x: xIndex, y: yIndex, day: 0 });
    }
    if (tomato !== -1) {
      maxTomatoCount += 1;
    }

    return tomato;
  })
);

// tomatoBox[y][x]
let ripeTomato = queue[curQueuePointer];
curQueuePointer += 1;
let lastDay = 0;

if (maxTomatoCount === ripeTomatoCount) {
  console.log(lastDay);
  return;
}

dx = [0, 1, 0, -1];
dy = [-1, 0, 1, 0];

while (ripeTomato) {
  const { x, y, day } = ripeTomato;
  lastDay = day + 1;

  for (let i = 0; i < 4; i++) {
    const targetTomato = { x: x + dx[i], y: y + dy[i], day: day + 1 };
    const tomato = tomatoBox[targetTomato.y]?.[targetTomato.x];

    if (tomato === undefined) continue;
    if (tomato !== 0) continue;

    tomatoBox[targetTomato.y][targetTomato.x] = 1;
    ripeTomatoCount += 1;

    if (maxTomatoCount === ripeTomatoCount) {
      console.log(lastDay);
      return;
    }

    queue.push(targetTomato);
  }

  ripeTomato = queue[curQueuePointer];
  curQueuePointer += 1;
}

if (ripeTomatoCount === maxTomatoCount) {
  console.log(lastDay);
} else {
  console.log(-1);
}
