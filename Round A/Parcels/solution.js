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

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [R, C] = readLine()
      .split(' ')
      .map(Number);
    let grid = [];
    for (let i = 0; i < R; i++) {
      let row = readLine();
      grid.push(row.split('').map(Number));
    }
    let distances = getDistances(grid, R, C);

    let min = getMinPossible(distances, R, C);
    //  let anotherMin = anotherSolution(distances, R, C);

    console.log(`Case #${t + 1}: ${min}`);
  }
}

function isPossible(distances, k, R, C) {
  let minDiff = -C;
  let maxDiff = R;
  let minSum = 0;
  let maxSum = R + C;
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (distances[i][j] > k) {
        minSum = Math.max(minSum, i + j - k);
        maxSum = Math.min(maxSum, i + j + k + 2);
        minDiff = Math.max(minDiff, i - j - k - 1);
        maxDiff = Math.min(maxDiff, k + i - j + 1);
      }
    }
  }
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (minSum <= i + j && maxSum >= i + j + 2 && minDiff <= i - j - 1 && maxDiff >= i - j + 1) {
        return true;
      }
    }
  }
  return false;
}
function getDistances(grid, R, C) {
  let queue = [];
  let visited = grid.map(row => row.map(() => false));
  let distances = grid.map(row => row.map(() => -1));
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (grid[i][j] === 1) {
        queue.push({ i, j, d: 0 });
        distances[i][j] = 0;
        visited[i][j] = true;
      }
    }
  }
  let i = 0;
  while (i < queue.length) {
    let node = queue[i];
    let adjacents = getAdjacents(node, R, C);
    for (let j = 0; j < adjacents.length; j++) {
      let adj = adjacents[j];
      if (!visited[adj.i][adj.j]) {
        distances[adj.i][adj.j] = node.d + 1;
        visited[adj.i][adj.j] = true;
        queue.push({ i: adj.i, j: adj.j, d: node.d + 1 });
      }
    }
    i++;
  }
  return distances;
}

function getAdjacents(node, R, C) {
  let adjacents = [];
  if (node.i > 0) {
    adjacents.push({ i: node.i - 1, j: node.j });
  }
  if (node.j > 0) {
    adjacents.push({ i: node.i, j: node.j - 1 });
  }
  if (node.i < R - 1) {
    adjacents.push({ i: node.i + 1, j: node.j });
  }
  if (node.j < C - 1) {
    adjacents.push({ i: node.i, j: node.j + 1 });
  }
  return adjacents;
}

function getMinPossible(distances, R, C) {
  let l = 0;
  let r = 0;
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (distances[i][j] > r) {
        r = distances[i][j];
      }
    }
  }
  let mid = (l + r) >> 1;

  while (l < r) {
    mid = (l + r) >> 1;
    if (isPossible(distances, mid, R, C)) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

function anotherSolution(distances, R, C) {
  let min = 0;
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (distances[i][j] > min) {
        min = distances[i][j];
      }
    }
  }
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      let max = 0;
      for (let ii = 0; ii < R; ii++) {
        for (let jj = 0; jj < C; jj++) {
          let tmp = Math.min(distances[ii][jj], Math.abs(i - ii) + Math.abs(j - jj));
          if (tmp > max) {
            max = tmp;
          }
        }
      }
      if (max < min) {
        min = max;
      }
    }
  }
  return min;
}
