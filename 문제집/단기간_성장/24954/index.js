const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0].split(" ")[0];
const products = [...Array(N)].map((_, idx) => idx + 1);
const prices = inputs[1].split(" ").map((v) => +v);
const promotions = [];

let inputIdx = 2;
while (1) {
  const numberOfPromotionsInput = inputs[inputIdx];

  if (!numberOfPromotionsInput) {
    break;
  }

  const numberOfPromotions = +numberOfPromotionsInput;

  if (inputs[inputIdx] === "") {
    break;
  }

  if (numberOfPromotions === 0) {
    promotions.push([[0, 0]]);
    inputIdx += 1;
    continue;
  }

  promotions.push([
    ...[...Array(numberOfPromotions)].map(() => {
      inputIdx += 1;
      const promotion = inputs[inputIdx].split(" ").map((v) => +v);

      return promotion;
    }),
  ]);

  inputIdx += 1;
}

let answer = Infinity;

const solve = (remainProducts, prices, cost) => {
  if (remainProducts.length <= 0) {
    answer = Math.min(answer, cost);
    return;
  }

  for (let i = 0; i < remainProducts.length; i++) {
    // 하나 선택
    const newRemainProducts = [...remainProducts];
    const productNum = newRemainProducts.splice(i, 1)[0];
    const newPrices = [...prices];

    // 구매
    const newCost = cost + newPrices[productNum - 1];

    // 할인
    for (let j = 0; j < promotions[productNum - 1].length; j++) {
      const [targetNum, promotionValue] = promotions[productNum - 1][j];

      if (targetNum === 0) {
        continue;
      }

      newPrices[targetNum - 1] -= promotionValue;
      if (newPrices[targetNum - 1] <= 0) {
        newPrices[targetNum - 1] = 1;
      }
    }

    solve(newRemainProducts, newPrices, newCost);
  }
};

solve(products, prices, 0);

console.log(answer);
