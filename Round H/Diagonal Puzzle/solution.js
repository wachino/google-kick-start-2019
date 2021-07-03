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

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let N = Number(readLine());
    let square = [];
    let visited = Array(4 * N - 2).fill(false);
    let graph = Array(4 * N - 2)
      .fill(null)
      .map(() => []);
    for (let i = 0; i < N; i++) {
      square.push(readLine().split(''));
    }
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let aDiag = N + i - j - 1;
        let bDiag = 2 * N + i + j - 1;
        let black = square[i][j] === '#';
        graph[aDiag].push({ d: bDiag, black });
        graph[bDiag].push({ d: aDiag, black });
      }
    }
    console.log(`Case #${t + 1}: ${countMinFlips(graph, visited)}`);
  }
}

function countMinFlips(graph, visited) {
  let min = 0;
  for (let i = 0; i < visited.length; i++) {
    if (!visited[i]) {
      min += Math.min(
        countFlipsFrom(graph, visited.slice(), i, true),
        countFlipsFrom(graph, visited.slice(), i, false)
      );
      visitFrom(visited, graph, i);
    }
  }
  return min;
}

function countFlipsFrom(graph, copyVisited, root, mustFlip) {
  let flips = mustFlip;
  copyVisited[root] = true;
  for (let node of graph[root]) {
    if (!copyVisited[node.d]) {
      flips += countFlipsFrom(graph, copyVisited, node.d, node.black == mustFlip);
    }
  }
  return flips;
}
function visitFrom(visited, graph, root) {
  visited[root] = true;
  for (let node of graph[root]) {
    if (!visited[node.d]) {
      visitFrom(visited, graph, node.d);
    }
  }
}
