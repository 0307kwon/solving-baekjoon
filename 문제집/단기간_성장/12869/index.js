const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const getCases = (remainedAttacks, pickedAttacks) => {
  if (remainedAttacks.length === 0) {
    return [pickedAttacks];
  }

  const cases = [];

  for (let pickedIdx = 0; pickedIdx < remainedAttacks.length; pickedIdx++) {
    const newRemainedAttacks = [...remainedAttacks];
    const pickedAttack = newRemainedAttacks.splice(pickedIdx, 1)[0];
    const newPickedAttacks = [...pickedAttacks, pickedAttack];

    const newCases = getCases(newRemainedAttacks, newPickedAttacks);
    cases.push(...newCases);
  }

  return cases;
};

const scvCount = +inputs[0];

const scvHps = inputs[1].split(" ").map((v) => +v);

const maxSumScvHps = scvHps.reduce((sum, cur) => sum + cur, 0);

const dp = new Array(maxSumScvHps + 1).fill([]);

dp[dp.length - 1] = [
  {
    currentHps: [...scvHps],
    attackCount: 0,
  },
];

const allAttacks = [9, 3, 1];

let curPointer = dp.length - 1;
const cases = getCases(allAttacks.slice(0, scvCount), []);
while (dp[0].length === 0) {
  // 모든 케이스에 대해 hp를 감소시켜본다.
  let nextDps = [];

  const currentDps = dp[curPointer];
  const nextAttackCount = currentDps[0].attackCount + 1;
  let nextHpsSum = Infinity;
  for (let i = 0; i < currentDps.length; i++) {
    const currentDp = currentDps[i];
    for (const attackCase of cases) {
      const hpsInCase = [...currentDp.currentHps].map((hp, index) =>
        hp - attackCase[index] < 0 ? 0 : hp - attackCase[index]
      );

      const hpsSumInCase = hpsInCase.reduce((sum, cur) => sum + cur, 0);
      if (nextHpsSum === hpsSumInCase) {
        // 중복이면 추가하지 않음.
        const sortedHpsInCase = [...hpsInCase].sort((a, b) => a - b);
        const isOverlapped = nextDps.some(
          (dp) => dp.currentHps.join(",") === sortedHpsInCase.join(",")
        );

        if (isOverlapped) {
          continue;
        }

        nextDps.push({
          currentHps: sortedHpsInCase,
          attackCount: nextAttackCount,
        });
        continue;
      }

      if (nextHpsSum > hpsSumInCase) {
        nextDps = [
          {
            currentHps: hpsInCase,
            attackCount: nextAttackCount,
          },
        ];
        nextHpsSum = hpsSumInCase;
      }
    }
  }

  dp[nextHpsSum] = nextDps;
  curPointer = nextHpsSum;
}

console.log(dp[0][0].attackCount);
