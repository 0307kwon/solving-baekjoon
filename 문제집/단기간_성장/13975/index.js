const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forTest)
  .toString()
  .split("\n");

const T = +inputs[0];

for (let i = 0; i < T; i++) {
  // 우선순위 큐
  // 최소 힙으로 구현한다.
  const filePriorityQueue = [];

  const pushQueue = (value) => {
    filePriorityQueue.push(value);

    let currentIdx = filePriorityQueue.length - 1;
    // log n / log 2
    while (currentIdx > 0) {
      // 부모 노드 구함
      const parentIdx = Math.floor(currentIdx / 2);

      if (filePriorityQueue[parentIdx] > filePriorityQueue[currentIdx]) {
        // 자식 노드가 더 작으면 부모 노드와 교환
        const parentTemp = filePriorityQueue[parentIdx];
        filePriorityQueue[parentIdx] = filePriorityQueue[currentIdx];
        filePriorityQueue[currentIdx] = parentTemp;
        currentIdx = parentIdx;
        continue;
      }

      break;
    }
  };

  const popQueue = () => {
    const result = filePriorityQueue[0];
    filePriorityQueue[0] = filePriorityQueue[filePriorityQueue.length - 1];
    filePriorityQueue.pop();
    let currentIdx = 0;
    let leftChildIdx = currentIdx * 2 + 1;
    let rightChildIdx = currentIdx * 2 + 2;
    while (
      leftChildIdx < filePriorityQueue.length ||
      rightChildIdx < filePriorityQueue.length
    ) {
      // 둘 중 더 작은 것과 교환해야한다.
      const leftChildTarget = filePriorityQueue[leftChildIdx] ?? Infinity;
      const rightChildTarget = filePriorityQueue[rightChildIdx] ?? Infinity;

      // 자식 둘다 부모보다 크면 종료
      if (
        filePriorityQueue[currentIdx] < leftChildTarget &&
        filePriorityQueue[currentIdx] < rightChildTarget
      ) {
        break;
      }

      if (leftChildTarget < rightChildTarget) {
        // 교환
        const childTemp = filePriorityQueue[leftChildIdx];
        filePriorityQueue[leftChildIdx] = filePriorityQueue[currentIdx];
        filePriorityQueue[currentIdx] = childTemp;

        currentIdx = leftChildIdx;
        leftChildIdx = currentIdx * 2 + 1;
        rightChildIdx = currentIdx * 2 + 2;
        continue;
      }

      // 교환
      const childTemp = filePriorityQueue[rightChildIdx];
      filePriorityQueue[rightChildIdx] = filePriorityQueue[currentIdx];
      filePriorityQueue[currentIdx] = childTemp;

      currentIdx = rightChildIdx;
      leftChildIdx = currentIdx * 2 + 1;
      rightChildIdx = currentIdx * 2 + 2;
      continue;
    }

    return result;
  };

  let files = inputs[2 + i * 2].split(" ").map((v) => +v);

  for (let i = 0; i < files.length; i++) {
    pushQueue(files[i]);
  }

  let cost = 0;

  let file1ToMerge = popQueue();
  let file2ToMerge = popQueue();

  // 최대 K-1 순회
  while (file1ToMerge != undefined && file2ToMerge != undefined) {
    const merged = file1ToMerge + file2ToMerge;
    cost += merged;

    pushQueue(merged);
    file1ToMerge = popQueue();
    file2ToMerge = popQueue();
  }

  console.log(cost);
}
