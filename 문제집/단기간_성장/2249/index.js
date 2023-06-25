const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const [n, k] = inputs[0].split(" ").map((v) => +v);

const valueSumArr = [...new Array(k + 1)].fill(-1);

valueSumArr[0] = 0;

const coins = inputs.slice(1, n + 1).map((v) => +v);

for (let i = 0; i < valueSumArr.length; i++) {
  const curValueSum = valueSumArr[i];

  if (i !== 0 && curValueSum === -1) continue;

  for (let j = 0; j < coins.length; j++) {
    const nextIdx = i + coins[j];

    if (nextIdx > k) continue;

    if (valueSumArr[nextIdx] === -1) {
      valueSumArr[nextIdx] = curValueSum + 1;
      continue;
    }

    valueSumArr[nextIdx] = Math.min(valueSumArr[nextIdx], curValueSum + 1);
  }
}
console.log(valueSumArr[k]);
