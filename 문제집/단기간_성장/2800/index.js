const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const expression = inputs[0];

const bracketStack = [];

const bracketPair = [];

for (let i = 0; i < expression.length; i++) {
  const char = expression[i];
  if (char !== "(" && char !== ")") {
    continue;
  }

  if (bracketStack[0] === undefined) {
    bracketStack.push([char, i]);
    continue;
  }

  if (char === "(") {
    bracketStack.push([char, i]);
    continue;
  }

  const lastItem = bracketStack.at(-1);

  if (lastItem[0] === ")") {
    bracketStack.push([char, i]);
    continue;
  }

  const openBracketIndex = bracketStack.pop()[1];
  const closeBracketIndex = i;

  bracketPair.push([openBracketIndex, closeBracketIndex]);
}

// DFS

const result = [];

const DFS = (curString, bracketPair) => {
  if (bracketPair.length === 0) {
    if (curString !== expression) {
      result.push(curString);
    }
    return;
  }

  const curPair = bracketPair[0];
  // 제거하냐 하지않냐 2가지 경우의 수
  // 제거 O
  const nextString =
    curString.slice(0, curPair[0]) +
    curString.slice(curPair[0] + 1, curPair[1]) +
    curString.slice(curPair[1] + 1, curString.length);

  const nextBracketPair = bracketPair.slice(1);
  for (let i = 0; i < nextBracketPair.length; i++) {
    if (nextBracketPair[i][1] > curPair[1]) {
      nextBracketPair[i] = [...nextBracketPair[i]];
      nextBracketPair[i][1] -= 1;
    }

    if (nextBracketPair[i][1] > curPair[0]) {
      nextBracketPair[i] = [...nextBracketPair[i]];
      nextBracketPair[i][1] -= 1;
    }

    if (nextBracketPair[i][0] > curPair[1]) {
      nextBracketPair[i] = [...nextBracketPair[i]];
      nextBracketPair[i][0] -= 1;
    }

    if (nextBracketPair[i][0] > curPair[0]) {
      nextBracketPair[i] = [...nextBracketPair[i]];
      nextBracketPair[i][0] -= 1;
    }
  }
  DFS(nextString, nextBracketPair);
  // 제거 X
  DFS(curString, bracketPair.slice(1));
};

DFS(expression, bracketPair);

Array.from(new Set(result))
  .sort()
  .forEach((r) => console.log(r));
