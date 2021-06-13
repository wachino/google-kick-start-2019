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
let dp;
let mb;
function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    const V = Number(readLine());
    let beauty = readLine().split(' ').map(Number);
    let roads = Array(V)
      .fill(null)
      .map(() => []);

    for (let i = 0; i < V - 1; i++) {
      let [x, y] = readLine().split(' ').map(Number);
      x--;
      y--;
      roads[x].push(y);
      roads[y].push(x);
    }
    removeParents(roads, 0, -1);

    mb = Array(V)
      .fill(null)
      .map(() =>
        Array(2)
          .fill(null)
          .map(() => Array(2).fill(-1))
      );
    dp = Array(V)
      .fill(null)
      .map((_, j) =>
        Array(roads[j].length + 1)
          .fill(null)
          .map(() => Array(2).fill(-1))
      );

    for (let i = 0; i < V; i++) {
      dp[i][0][0] = 0;
      dp[i][0][1] = 0;
    }
    const a = maxBeauty(roads, beauty, 0, 0, 0);
    const b = maxBeauty(roads, beauty, 0, 0, 1);
    console.log(`Case #${t + 1}: ${Math.max(a, b)}`);
  }
}
function removeParents(roads, node, parent) {
  if (parent != -1) {
    let i = roads[node].findIndex((c) => c === parent);
    if (i >= 0) {
      roads[node].splice(i, 1);
    }
  }
  for (let n of roads[node]) {
    removeParents(roads, n, node);
  }
}

function maxBeauty(roads, beauty, node, parentOn, on) {
  if (mb[node][parentOn][on] == -1) {
    let ans = 0;
    if (on) {
      ans += beauty[node];
      for (let c of roads[node]) {
        ans += Math.max(maxBeauty(roads, beauty, c, on, 1), maxBeauty(roads, beauty, c, on, 0));
      }
    } else {
      if (parentOn) {
        ans += beauty[node];
        for (let c of roads[node]) {
          ans += Math.max(maxBeauty(roads, beauty, c, on, 0), maxBeauty(roads, beauty, c, on, 1));
        }
      } else {
        if (dp[node][roads[node].length][0] == -1) {
          computeDinamic(roads, beauty, node, roads[node].length, 0);
        }
        if (dp[node][roads[node].length][1] == -1) {
          computeDinamic(roads, beauty, node, roads[node].length, 1);
        }
        let a = dp[node][roads[node].length][0];
        if (roads[node].length > 0) {
          a = beauty[node] + dp[node][roads[node].length][1];
        }
        ans += Math.max(a, dp[node][roads[node].length][0]);
      }
    }
    mb[node][parentOn][on] = ans;
  }
  return mb[node][parentOn][on];
}

function computeDinamic(roads, beauty, node, child, on) {
  if (dp[node][child - 1][on] == -1) {
    computeDinamic(roads, beauty, node, child - 1, on);
  }

  if (on) {
    let a = maxBeauty(roads, beauty, roads[node][child - 1], 0, 0);
    if (child == 1) {
      a = maxBeauty(roads, beauty, roads[node][child - 1], 0, 1);
    }
    dp[node][child][1] = Math.max(
      dp[node][child - 1][1] + Math.max(a, maxBeauty(roads, beauty, roads[node][child - 1], 0, 1)),
      dp[node][child - 1][0] + maxBeauty(roads, beauty, roads[node][child - 1], 0, 1)
    );
  } else {
    dp[node][child][0] =
      dp[node][child - 1][0] + maxBeauty(roads, beauty, roads[node][child - 1], 0, 0);
  }
}
