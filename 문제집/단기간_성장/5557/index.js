const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0];
const inputNumbers = inputs[1].split(" ").map((v) => +v);
const leftTerms = inputNumbers.slice(0, N - 1); // 0 ~ N-2
const rightTerm = inputNumbers[N - 1];

// [i][j]
// i = 0 ~ N-2, j = 0 ~ 20
const dp = new Array(N - 1).fill(0).map(() => new Array(21).fill(BigInt(-1)));

// 상향식 재귀 접근
dp[0][leftTerms[0]] = BigInt(1);
const getCases = (i, j) => {
  if (i < 0 || j < 0 || j > 20) return BigInt(0);
  if (dp[i][j] !== BigInt(-1)) return dp[i][j];

  // 이미 계산된 값이 아니라면 계산.
  dp[i][j] =
    getCases(i - 1, j - leftTerms[i]) + getCases(i - 1, j + leftTerms[i]);

  return dp[i][j];
};

console.log(getCases(N - 2, rightTerm).toString());
