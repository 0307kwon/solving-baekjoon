const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const [n, x, y] = inputs[0].split(" ").map((v) => +v);

// idx = 0은 연산에서 제외합니다.
const isCalculatedList = [...new Array(n + 1)].fill(false);
const array = [...new Array(2 * n + 1)].fill(null);

const sameValue = y - x - 1;

array[x] = sameValue;
array[y] = sameValue;

isCalculatedList[sameValue] = true;

let answer = 0;

const iterate = (_array, _IsCalculatedList) => {
  const targetNum = _IsCalculatedList.lastIndexOf(false);

  if (targetNum === 0) {
    answer += 1;
    return;
  }

  // 경우의 수 진행
  for (let i = 1; i < _array.length; i++) {
    const startIdx = i;
    const endIdx = i + targetNum + 1;
    // console.log("모지", startIdx, endIdx, targetNum);

    // length를 넘기면
    if (endIdx >= _array.length) {
      break;
    }

    // 이미 값이 있으면
    if (_array[startIdx] !== null) {
      continue;
    }

    // 끝 지점에 이미 값이 있으면
    if (_array[endIdx] !== null) {
      continue;
    }

    const newArray = [..._array];
    newArray[startIdx] = targetNum;
    newArray[endIdx] = targetNum;

    const newIsCalculatedList = [..._IsCalculatedList];
    newIsCalculatedList[targetNum] = true;

    iterate(newArray, newIsCalculatedList);
  }
};

iterate(array, isCalculatedList);

console.log(answer);
