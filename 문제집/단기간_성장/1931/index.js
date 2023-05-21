const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0].split(" ")[0];

const meetings = [];

for (let i = 1; i <= N; i++) {
  const [start, end] = inputs[i].split(" ").map((v) => +v);

  meetings.push([start, end]);
}

meetings.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  }

  return a[1] - b[1];
});

const result = [];

for (let i = 0; i < meetings.length; i++) {
  if (result.length === 0) {
    result.push(meetings[i]);
    continue;
  }

  const cur = meetings[i];
  const last = result[result.length - 1];

  if (last[1] > cur[0]) {
    continue;
  }

  result.push(cur);
}

console.log(result.length);
