const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const [N, M] = inputs[0].split(" ").map((v) => +v);

// index 0은 사용하지 않음
const subjects = [...new Array(N + 1)].fill(1);

const relations = inputs
  .slice(1, 1 + M)
  .map((v) => v.split(" ").map((v) => +v));

relations.sort((a, b) => a[1] - b[1]);

relations.forEach(([a, b]) => {
  subjects[b] = Math.max(subjects[b], subjects[a] + 1);
});

console.log(subjects.slice(1).join(" "));
