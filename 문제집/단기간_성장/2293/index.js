const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const [N, K] = inputs[0].split(" ").map((v) => +v);

const dp = [...new Array(K + 1)].fill(0);

dp[0] = 1;

const coins = [];

for (let i = 0; i < N; i++) {
  coins.push(+inputs[i + 1]);
}

coins.sort();

for (let i = 0; i < coins.length; i++) {
  const coinValue = coins[i];

  for (let j = coinValue; j < K + 1; j++) {
    dp[j] = dp[j] + dp[j - coinValue];
  }
}

console.log(dp[K]);
