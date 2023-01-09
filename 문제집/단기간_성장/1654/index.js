const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const K = +inputs[0].split(" ")[0];
const N = +inputs[0].split(" ")[1];

const lineLengths = [];

for (let i = 1; i < inputs.length; i++) {
  if (!inputs[i]) continue;

  lineLengths.push(+inputs[i]);
}

let hi = Math.max(...lineLengths);
let lo = 1;
let mid = Math.floor((hi + lo) / 2.0);
let answer = 1;

while (1) {
  // 어떤 길이 x에 대해서 만들 수 있는 선의 갯수를 구함.
  let lineCount = 0;

  lineLengths.forEach((length) => {
    const count = Math.floor(length / mid);

    lineCount += count;
  });

  const prevMid = mid;
  if (lineCount >= N) {
    // lineCount가 N보다 크면 오른쪽 (+ 큰 값을 찾는 것이므로 N과 같을 때도 오른쪽)
    // 큰 값 지향이므로 lo 값에 mid를 포함한다.
    lo = mid;
    mid = Math.ceil((hi + lo) / 2.0);
  } else {
    // N보다 작으면 왼쪽
    hi = mid - 1;
    mid = Math.ceil((hi + lo) / 2.0);
  }

  // 중단조건 : 하나로 수렴하면
  if (prevMid === mid) {
    answer = mid;
    break;
  }
}

console.log(answer);
