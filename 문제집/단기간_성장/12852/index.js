const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const input = +inputs[0];

// 모든 경우의 수를 구해야하므로 dp를 사용한다.

const MAX_NUM = 1000000;

const dp = [...new Array(MAX_NUM + 1)];
const prevValue = [...new Array(MAX_NUM + 1)];

prevValue[1] = 0;

dp[1] = 0;

for (let i = 2; i < dp.length; i++) {
  dp[i] = dp[i - 1] + 1;
  prevValue[i] = i - 1;

  if (i % 2 === 0 && dp[i / 2] + 1 < dp[i]) {
    dp[i] = dp[i / 2] + 1;
    prevValue[i] = i / 2;
  }

  if (i % 3 === 0 && dp[i / 3] + 1 < dp[i]) {
    dp[i] = dp[i / 3] + 1;
    prevValue[i] = i / 3;
  }
}

console.log(dp[input]);

const history = [input];

let curNum = input;
while (prevValue[curNum] !== 0) {
  const prev = prevValue[curNum];

  if (prev === 0) break;

  history.push(prev);
  curNum = prev;
}

console.log(history.join(" "));
