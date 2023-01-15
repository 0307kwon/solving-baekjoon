const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0].split(" ")[0];
const processes = [];

const solve = (plateCountToMove, curPos, nextPos) => {
  if (plateCountToMove === 0) return;

  // 4, 1, 2
  // 1. 맨 아래에 있는 원판을 nextPos까지 옮기기 위해 나머지 원판을
  // curPos, nextPos를 제외한 나머지 장대로 임시 이동한다.
  solve(plateCountToMove - 1, curPos, 6 - curPos - nextPos);
  // 5, 1, 3
  // 2. 맨 아래에 있는 원판을 curPos에서 nextPos로 이동함.
  processes.push([curPos, nextPos]);
  // 4, 2, 3
  // 3. 1번에서 임시로 이동시켜놓았던 원판들을 nextPos(최종 위치)로 이동시킴
  solve(plateCountToMove - 1, 6 - curPos - nextPos, nextPos);
};

solve(N, 1, 3);

console.log(
  `${processes.length}\n${processes
    .map((p) => {
      return p.join(" ");
    })
    .join("\n")}`
);
