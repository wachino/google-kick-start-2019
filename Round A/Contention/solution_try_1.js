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

    let seats = Array(n).fill(0);

    let bookings = [];
    for (let j = 0; j < q; j++) {
      let [l, r] = readLine()
        .split(' ')
        .map(Number);
      bookings.push({ l: l - 1, r: r, rem: 0 });
      for (let k = l - 1; k < r; k++) {
        seats[k]++;
      }
    }
    for (let i = 0; i < n; i++) {
      if (seats[i] === 1) {
        for (let j = 0; j < q; j++) {
          if (bookings[j].l <= i && i < bookings[j].r) {
            bookings[j].rem++;
          }
        }
      }
    }

    bookings.sort((b, a) => a.rem - b.rem);
    let min = Infinity;
    for (let j = 0; j < q; j++) {
      let curr = bookings.shift();
      if (curr.rem < min) {
        min = curr.rem;
      }
      for (let p = curr.l; p < curr.r; p++) {
        seats[p]--;
        if (seats[p] === 1) {
          for (let k = 0; k < bookings.length; k++) {
            if (bookings[k].l <= p && p < bookings[k].r) {
              bookings[k].rem++;
              let i = k;
              let tmp;
              while (i > 0 && bookings[i].rem > bookings[i - 1].rem) {
                tmp = bookings[i];
                bookings[i] = bookings[i - 1];
                bookings[i - 1] = tmp;
                i--;
              }
            }
          }
        }
      }
    }
    console.log(`Case #${t + 1}: ${min}`);
  }
}
