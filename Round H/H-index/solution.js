process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on('end', (_) => {
  inputString = inputString
    .trim()
    .split('\n')
    .map((str) => str.trim());
  solution();
});

function readLine() {
  return inputString[currentLine++];
}

let segmentTree;

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let N = Number(readLine());
    let citations = readLine().split(/\s+/).map(Number);
    segmentTree = Array(2 ** (Math.ceil(Math.log2(1e5 + 1)) + 1)).fill(0);
    let hIndex = 0;
    let ans = [];

    for (let i = 0; i < citations.length; i++) {
      let c = citations[i];
      update(0, 1e5, c);
      let right = 1e5;
      let mid;
      while (hIndex < right) {
        mid = (hIndex + right + 1) >> 1;
        if (query(0, 1e5, mid) >= mid) {
          hIndex = mid;
        } else {
          right = mid - 1;
        }
      }
      ans.push(hIndex);
    }
    console.log(`Case #${t + 1}: ${ans.join(' ')}`);
  }
}

function update(start, end, at, node = 0) {
  segmentTree[node] += 1;
  if (at <= start && end <= at) {
    return;
  }
  let mid = (start + end) >> 1;
  if (at <= mid) {
    let leftChildNode = (node << 1) | 1;
    update(start, mid, at, leftChildNode);
  } else {
    let rightChildNode = (node + 1) << 1;
    update(mid + 1, end, at, rightChildNode);
  }
}

function query(start, end, from, node = 0) {
  if (1e5 < start || end < from) {
    return 0;
  }
  if (from <= start && end <= 1e5) {
    return segmentTree[node];
  }
  let mid = (start + end) >> 1;

  let leftChildNode = (node << 1) | 1;
  let rightChildNode = (node + 1) << 1;
  return query(start, mid, from, leftChildNode) + query(mid + 1, end, from, rightChildNode);
}
