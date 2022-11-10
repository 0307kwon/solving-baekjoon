const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forSubmit)
  .toString()
  .split("\n");

const count = inputs[0].split(" ")[0] * 1;
const maxWeight = inputs[0].split(" ")[1] * 1;

// dp[i][k] 배낭의 최대 무게가 k일 때 i번째 물건까지 고려한 경우의 value
const dp = [...Array(count + 1)].map(() => [...Array(maxWeight + 1)].fill(0));
const items = [];

for (let i = 1; i < inputs.length; i++) {
  if (inputs[i] === "") {
    continue;
  }
  const [w, v] = inputs[i].split(" ");
  items[i] = {
    w: w * 1,
    v: v * 1,
  };
}

for (let k = 1; k <= maxWeight; k++) {
  for (let i = 1; i <= count; i++) {
    if (items[i].w <= k) {
      dp[i][k] = items[i].v;

      const restK = k - items[i].w;
      if (i - 1 > 0 && restK > 0) {
        dp[i][k] += dp[i - 1][restK];
      }
    }

    if (i > 0 && !dp[i][k] && dp[i - 1][k]) {
      dp[i][k] = dp[i - 1][k];
    }

    if (dp[i][k]) {
      dp[i][k] = Math.max(dp[i - 1][k], dp[i][k]);
    }
  }
}

console.log(dp[count][maxWeight]);
