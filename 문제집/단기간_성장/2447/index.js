const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const N = +inputs[0];

const starString = [...new Array(N)].fill("*").join("");

const output = [starString];

let curIdx = output.length;
let loopCount = 1;

while (curIdx < N) {
  const startIdx = output.length;
  // row
  const sectionLength = Math.pow(3, loopCount - 1);
  for (
    let rowStart = startIdx;
    rowStart < startIdx + Math.ceil(sectionLength / 2);
    rowStart++
  ) {
    const refIdx = rowStart - startIdx;
    let curString = output[refIdx];

    // col
    let colStartIdx = startIdx;
    let colEndIdx = colStartIdx + sectionLength - 1;
    while (colStartIdx < N) {
      curString =
        curString.slice(0, colStartIdx) +
        " ".repeat(sectionLength) +
        curString.slice(colEndIdx + 1);

      colStartIdx += sectionLength * 3;
      colEndIdx += sectionLength * 3;
    }

    output.push(curString);
  }

  // 나머지 부분은 이전것을 복사
  output.push(...output.slice(0, -1).reverse());
  loopCount++;
  curIdx = output.length;
}

output.forEach((row) => console.log(row));
