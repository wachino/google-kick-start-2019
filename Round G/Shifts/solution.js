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
    let [N, H] = readLine().split(/\s+/).map(Number);
    let happiness = [readLine().split(/\s+/).map(Number), readLine().split(/\s+/).map(Number)];
    let count = 0;

    if (N < 2) {
      let combinations = getCombinations(happiness, 0, N);
      for (let i = 0; i < combinations.length; i++) {
        if (combinations[i][0] >= H && combinations[i][1] >= H) {
          count++;
        }
      }
    } else {
      let P = Math.ceil(N / 2);

      let A1 = getCombinations(happiness, 0, P);
      let A2 = getCombinations(happiness, P, N);
      A1.sort((a, b) => (a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]));
      A2.sort((a, b) => (a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]));
      let p2 = [...new Set(A2.map((a) => a[1]))].sort((a, b) => b - a);

      let keyP2 = {};
      for (let i = 0; i < p2.length; i++) {
        keyP2[p2[i]] = i;
      }
      segmentTree = Array(2 ** (Math.ceil(Math.log2(p2.length)) + 1)).fill(0);
      let lastInserted = A2.length;
      for (let i = 0; i < A1.length; i++) {
        let p1 = A1[i];
        let l1 = Math.max(0, H - p1[0]);
        let left = 0;
        let right = lastInserted - 1;
        let mid;
        while (left <= right) {
          mid = (left + right) >> 1;
          if (A2[mid][0] < l1) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
        for (let j = left; j < lastInserted; j++) {
          update(0, p2.length - 1, keyP2[A2[j][1]]);
        }
        lastInserted = left;
        let l2 = Math.max(0, H - p1[1]);

        left = 0;
        right = p2.length - 1;
        mid;
        while (left <= right) {
          mid = (left + right) >> 1;
          if (p2[mid] < l2) {
            right = mid - 1;
          } else {
            left = mid + 1;
          }
        }
        count += query(0, p2.length - 1, right);
      }
    }
    console.log(`Case #${t + 1}: ${count}`);
  }
}

function getCombinations(happiness, start, end) {
  if (start == end) {
    return [0, 0];
  }

  let sum = [0, 0];
  let ans = [];
  bt(start);
  return ans;

  function bt(id) {
    if (id == end) {
      ans.push([sum[0], sum[1]]);
      return;
    }

    sum[0] += happiness[0][id];
    bt(id + 1);
    sum[1] += happiness[1][id];
    bt(id + 1);
    sum[0] -= happiness[0][id];
    bt(id + 1);
    sum[1] -= happiness[1][id];
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

function query(start, end, until, node = 0) {
  if (until < start || end < 0) {
    return 0;
  }
  if (0 <= start && end <= until) {
    return segmentTree[node];
  }
  let mid = (start + end) >> 1;

  let leftChildNode = (node << 1) | 1;
  let rightChildNode = (node + 1) << 1;
  return query(start, mid, until, leftChildNode) + query(mid + 1, end, until, rightChildNode);
}
