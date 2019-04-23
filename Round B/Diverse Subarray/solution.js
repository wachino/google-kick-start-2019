process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString
    .trim()
    .split('\n')
    .map(str => str.trim());
  solution();
});

function readLine() {
  return inputString[currentLine++];
}

let segmentTree;
let sumUpTo;
let lazyTree;

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [N, S] = readLine()
      .split(' ')
      .map(Number);
    let A = readLine()
      .split(' ')
      .map(Number);

    let maxTrinket = Math.max(...A);
    let minTrinket = Math.min(...A);

    let positionsOfTrinketInA = Array(maxTrinket - minTrinket + 1)
      .fill(0)
      .map(() => []);
    let relativePositionToSimilarTrinket = Array(A.length).fill(0);

    for (let i = 0; i < A.length; i++) {
      positionsOfTrinketInA[A[i] - minTrinket].push(i);
      relativePositionToSimilarTrinket[i] = positionsOfTrinketInA[A[i] - minTrinket].length;
    }

    sumUpTo = Array(A.length).fill(0);
    sumUpTo[0] = 1;
    for (let i = 1; i < A.length; i++) {
      sumUpTo[i] = sumUpTo[i - 1];
      if (relativePositionToSimilarTrinket[i] === S + 1) {
        sumUpTo[i] -= S;
      } else if (relativePositionToSimilarTrinket[i] <= S) {
        sumUpTo[i]++;
      }
    }

    segmentTree = Array(2 * N).fill(0);
    lazyTree = Array(2 * N).fill(0);
    buildSegmentTree(0, N - 1, 0);
    let max = 0;
    for (let i = 0; i < N; i++) {
      max = Math.max(max, query(0, N - 1, i, N - 1, 0));
      let trinket = A[i] - minTrinket;
      if (positionsOfTrinketInA[trinket].length - S > relativePositionToSimilarTrinket[i] - 1) {
        let tmp = positionsOfTrinketInA[trinket][relativePositionToSimilarTrinket[i] + S - 1];
        let tmp2 = positionsOfTrinketInA[trinket][relativePositionToSimilarTrinket[i] + S] || N;
        update(-1, 0, N - 1, i + 1, tmp - 1, 0);
        update(S, 0, N - 1, tmp, tmp2 - 1, 0);
      } else {
        update(-1, 0, N - 1, i + 1, N - 1, 0);
      }
    }
    console.log(`Case #${t + 1}: ${max}`);
  }
}

function update(addValue, start, end, left, right, node) {
  if (left <= start && end <= right) {
    segmentTree[node] += addValue;
    lazyTree[node] += addValue;
    return;
  }
  pushDown(node);
  let mid = (start + end) >> 1;
  let leftChildNode = (node << 1) | 1;
  let rightChildNode = (node + 1) << 1;
  if (left <= mid) update(addValue, start, mid, left, right, leftChildNode);
  if (right > mid) update(addValue, mid + 1, end, left, right, rightChildNode);

  pushUp(node);
}

function buildSegmentTree(start, end, node) {
  if (start === end) {
    segmentTree[node] = sumUpTo[start];
  } else {
    let mid = (start + end) >> 1;
    let leftChildNode = (node << 1) | 1;
    let rightChildNode = (node + 1) << 1;
    buildSegmentTree(start, mid, leftChildNode);
    buildSegmentTree(mid + 1, end, rightChildNode);
    segmentTree[node] = Math.max(segmentTree[leftChildNode], segmentTree[rightChildNode]);
  }
}

function query(start, end, left, right, node) {
  if (right < start || end < left) {
    return 0;
  }
  if (left <= start && end <= right) {
    return segmentTree[node];
  }
  let mid = (start + end) >> 1;
  pushDown(node);
  let leftChildNode = (node << 1) | 1;
  let rightChildNode = (node + 1) << 1;
  return Math.max(
    query(start, mid, left, right, leftChildNode),
    query(mid + 1, end, left, right, rightChildNode)
  );
}

function pushDown(node) {
  if (lazyTree[node]) {
    let leftChildNode = (node << 1) | 1;
    let rightChildNode = (node + 1) << 1;

    segmentTree[leftChildNode] += lazyTree[node];
    segmentTree[rightChildNode] += lazyTree[node];
    lazyTree[leftChildNode] += lazyTree[node];
    lazyTree[rightChildNode] += lazyTree[node];
    lazyTree[node] = 0;
  }
}

function pushUp(node) {
  let leftChildNode = (node << 1) | 1;
  let rightChildNode = (node + 1) << 1;

  segmentTree[node] = Math.max(segmentTree[leftChildNode], segmentTree[rightChildNode]);
}
