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
  const t = Number(readLine());
  for (let i = 0; i < t; i++) {
    let [n, q] = readLine()
      .split(' ')
      .map(Number);

    const seats = Array(n)
      .fill(0)
      .map(() => ({ free: true, requestedBy: [] }));
    let bookings = [];
    for (let j = 0; j < q; j++) {
      let [l, r] = readLine()
        .split(' ')
        .map(Number);
      bookings.push({ l: l - 1, r: r, rem: r - l + 1 });
      for (let k = l - 1; k < r; k++) {
        seats[k].requestedBy.push(j);
      }
    }

    const sortedBookings = bookings.slice().sort((a, b) => a.rem - b.rem);
    let min = Infinity;

    for (let j = 0; j < q; j++) {
      let curr = sortedBookings.shift();
      if (curr.rem < min) {
        min = curr.rem;
      }
      for (let p = curr.l; p < curr.r; p++) {
        if (seats[p].free) {
          seats[p].free = false;
          for (let k = 0; k < seats[p].requestedBy.length; k++) {
            bookings[seats[p].requestedBy[k]].rem--;
          }
        }
      }
      sortedBookings.sort((a, b) => a.rem - b.rem);
    }
    console.log(`Case #${i + 1}: ${min}`);
  }
}
