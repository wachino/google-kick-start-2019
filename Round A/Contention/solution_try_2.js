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
    let [n, q] = readLine()
      .split(' ')
      .map(Number);

    const seats = Array(n)
      .fill(0)
      .map(() => new Set());
    let bookings = [];
    for (let j = 0; j < q; j++) {
      let [l, r] = readLine()
        .split(' ')
        .map(Number);
      bookings.push({ j, l: l - 1, r: r, rem: 0 });
      for (let k = l - 1; k < r; k++) {
        seats[k].add(j);
      }
    }

    for (let i = 0; i < n; i++) {
      if (seats[i].size === 1) {
        bookings[seats[i].values().next().value].rem++;
      }
    }
    let sortedBookinns = bookings.slice().sort((b, a) => a.rem - b.rem);
    let min = Infinity;
    for (let j = 0; j < q; j++) {
      let curr = sortedBookinns.shift();
      if (curr.rem < min) {
        min = curr.rem;
      }
      for (let p = curr.l; p < curr.r; p++) {
        seats[p].delete(curr.j);
        if (seats[p].size === 1) {
          bookings[seats[p].values().next().value].rem++;
          sortedBookinns.sort((b, a) => a.rem - b.rem);
        }
      }
    }
    console.log(`Case #${t + 1}: ${min}`);
  }
}
