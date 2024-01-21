const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const [N, P, Q] = inputs[0].split(" ").map((num) => +num);

const dp = {};

// AN 을 구하는 것이 목표

const recursive = (n) => {
  if (n === 0) return 1;
  if (dp[n]) return dp[n];

  dp[n] = recursive(Math.floor(n / P)) + recursive(Math.floor(n / Q));

  return dp[n];
};

console.log(recursive(N));
