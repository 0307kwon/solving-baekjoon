## 문제 소개

[하노이 탑 이동 순서](https://www.acmicpc.net/problem/11729)

## 풀이

처음에는 bfs로 풀어야한다고 생각했다.

하지만 아무리 풀어봐도 시간 제한에 걸려 실패했다.

그래서 답을 보니 재귀로 푸는 문제였음.

bfs로 짰을 때는 원판을 움직인 횟수를 기준으로 다음 움직일 수 있는 모든 경우의 수를 큐에 담아

풀었는데, 연산량이 많아서 실패한 것 같다.

재귀는 1.움직일 원판 갯수 2.현재 위치 3.이동할 다음 위치

3개의 인자를 받는 함수로 만들면 된다.

6 - curPos - nextPos의 의미는 장대의 위치가 1,2,3이 있으므로

1+2+3 = 6 이고, curPos와 nextPos는 각각 중복 없이 1,2,3 중 하나이다.

따라서 6 - curPos - nextPos는 현재 위치와 다음 위치를 제외한 장대 위치를

계산하는 식이고, 해당 장대로 잠깐 원판을 옮겨두기 위해 사용한다.



## 처음 코드

``` js
const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0].split(" ")[0];

let queue = [];

queue.push({
  1: [...Array(N)].map((_, idx) => N - idx),
  2: [],
  3: [],
  moveCount: 0,
});

const cloneStatus = (status) => {
  const newStatus = {
    ...status,
  };
  [1, 2, 3].forEach((key) => {
    newStatus[key] = [...status[key]];
  });

  return newStatus;
};

let answer;
let toBe = N;
const dp = {};

const getDpKey = (status) => {
  return `${status[1].join(".")},${status[2].join(".")},${status[3].join(".")}`;
};

while (queue.length > 0) {
  const status = queue.shift();

  if (status[3].length === N) {
    answer = status.moveCount;
    break;
  }

  const dpKey = getDpKey(status);

  // 이미 이전에 한번 세팅되었던 상태면 무시.
  if (dp[dpKey]) {
    continue;
  }

  dp[dpKey] = true;

  // 모든 경우의 수를 파악하여 큐에 추가.
  [1, 2, 3].forEach((poleNum) => {
    const newStatus = cloneStatus(status);
    const plateNumToMove = newStatus[poleNum].pop();
    if (!plateNumToMove) return;

    // 키를 제외한 장대
    for (let i = 1; i <= 3; i++) {
      if (i === poleNum) {
        continue;
      }

      const targetPoleNum = i;
      const _newStatus = cloneStatus(newStatus);
      // 장대에 쌓는게 가능하면 추가.
      const topPlateNumOfPole =
        _newStatus[targetPoleNum][_newStatus[targetPoleNum].length - 1];

      if (topPlateNumOfPole && topPlateNumOfPole <= plateNumToMove) {
        // 불가능
        continue;
      }

      // toBe = 3
      _newStatus.moveCount += 1;
      _newStatus[targetPoleNum].push(plateNumToMove);

      if (_newStatus[3][N - toBe] === toBe) {
        queue = [_newStatus];
        toBe -= 1;
        break;
      }

      queue.push(_newStatus);
    }
  });
}

console.log(answer);
```
