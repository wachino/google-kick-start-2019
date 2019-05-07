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

    let bExtremes = new Set();
    bExtremes.add(0);
    bExtremes.add(n - 1);

    let bookings = [];
    for (let j = 0; j < q; j++) {
      let [l, r] = readLine()
        .split(' ')
        .map(Number);
      bookings.push({ l: l - 1, r: r, rem: 0, j });
      bExtremes.add(l - 1);
      bExtremes.add(r);
    }
    let startBookings = bookings.slice().sort((a, b) => a.l - b.l);
    let endBookings = bookings.slice().sort((a, b) => a.r - b.r);

    bExtremes = [...bExtremes].sort((a, b) => a - b);
    const seatRanges = [];
    let currBookings = new Set();
    let s = 0;
    let e = 0;

    debugger;

    let currEx = bExtremes[0];
    for (let i = 1; i < bExtremes.length; i++) {
      while (e < endBookings.length && endBookings[e].r === currEx) {
        currBookings.delete(endBookings[e].j);
        e++;
      }
      while (s < startBookings.length && startBookings[s].l === currEx) {
        currBookings.add(startBookings[s].j);
        s++;
      }
      seatRanges.push({ l: currEx, r: bExtremes[i], bookings: currBookings.size });
      if (currBookings.size === 1) {
        let j = [...currBookings][0];
        bookings[j].rem += bExtremes[i] - currEx;
      }
      currEx = bExtremes[i];
    }
    let tree = [];
    let sortedBookings = bookings.slice().sort((a, b) => a.l - b.l);
    build(tree, sortedBookings);

    sortedBookings.sort((b, a) => a.rem - b.rem);
    let min = Infinity;
    for (let j = 0; j < q; j++) {
      let curr = sortedBookings.shift();
      remove(tree, curr.node);
      if (curr.rem < min) {
        min = curr.rem;
      }
      let [pl, pr] = searchStartEnd(seatRanges, curr.l, curr.r);
      let needSort = false;
      for (let p = pl; p < pr; p++) {
        let ran = seatRanges[p];
        ran.bookings--;
        if (ran.bookings === 1) {
          needSort = true;
          let ub = overlapSearch(tree, 0, ran);
          ub.rem += ran.r - ran.l;
        }
      }
      sortedBookings.sort((b, a) => a.rem - b.rem);
    }
    console.log(`Case #${t + 1}: ${min}`);
  }
}

function searchStartEnd(seatRanges, l, r) {
  let s = 0;
  let e = seatRanges.length - 1;
  let m = (s + e) >> 1;

  while (seatRanges[m].l !== l) {
    if (seatRanges[m].l < l) {
      s = m + 1;
    } else {
      e = m - 1;
    }
    m = (s + e) >> 1;
  }
  let retL = m;

  s = 0;
  e = seatRanges.length - 1;
  m = (s + e) >> 1;
  while (seatRanges[m].r !== r) {
    if (seatRanges[m].r < r) {
      s = m + 1;
    } else {
      e = m - 1;
    }
    m = (s + e) >> 1;
  }
  let retR = m;

  return [retL, retR + 1];
}

// Interval tree

function build(tree, intervals, node = 0, start = 0, end = intervals.length - 1) {
  if (start > end) {
    return;
  } else {
    let mid = (start + end) >> 1;
    insert(tree, node, intervals[mid]);
    let leftChildNode = (node << 1) | 1;
    let rightChildNode = (node + 1) << 1;
    build(tree, intervals, leftChildNode, start, mid - 1);
    build(tree, intervals, rightChildNode, mid + 1, end);
    if (tree[leftChildNode] && tree[leftChildNode].max > tree[node].max) {
      tree[node].max = tree[leftChildNode].max;
    }
    if (tree[rightChildNode] && tree[rightChildNode].max > tree[node].max) {
      tree[node].max = tree[rightChildNode].max;
    }
  }
}

function remove(tree, node) {
  tree[node].deleted = true;
  let leftChildNode = (node << 1) | 1;
  let rightChildNode = (node + 1) << 1;
  let max = -Infinity;
  if (tree[leftChildNode] && tree[leftChildNode].max > max) {
    max = tree[leftChildNode].max;
  }
  if (tree[rightChildNode] && tree[rightChildNode].max > max) {
    max = tree[rightChildNode].max;
  }
  tree[node].max = max;
  let parent = (node - 1) >> 1;
  let ln = (parent << 1) | 1;
  let rn = (parent + 1) << 1;
  while (node) {
    tree[parent].max = tree[parent].deleted ? -Infinity : tree[parent].interval.r;
    if (tree[ln] && tree[ln].max > tree[parent].max) {
      tree[parent].max = tree[ln].max;
    }
    if (tree[rn] && tree[rn].max > tree[parent].max) {
      tree[parent].max = tree[rn].max;
    }
    if (!parent) {
      break;
    }
    parent = (parent - 1) >> 1;
    ln = (parent << 1) | 1;
    rn = (parent + 1) << 1;
  }
}

function insert(tree, root, interval) {
  if (!tree[root]) {
    interval.node = root;
    tree[root] = {
      interval,
      max: interval.r
    };
    return;
  }
  let l = tree[root].interval.l;
  if (interval.l < l) {
    let leftChildNode = (root << 1) | 1;
    insert(tree, leftChildNode, interval);
  } else {
    let rightChildNode = (root + 1) << 1;
    insert(tree, rightChildNode, interval);
  }

  if (tree[root].max < interval.r) {
    tree[root].max = interval.r;
  }
}

function doOVerlap(i1, i2) {
  return i1.l < i2.r && i2.l < i1.r;
}

function overlapSearch(tree, root, interval) {
  if (!tree[root]) return null;

  if (!tree[root].deleted && doOVerlap(tree[root].interval, interval)) {
    return tree[root].interval;
  }

  let leftChildNode = (root << 1) | 1;
  if (tree[leftChildNode] && tree[leftChildNode].max > interval.l) {
    return overlapSearch(tree, leftChildNode, interval);
  }

  let rightChildNode = (root + 1) << 1;
  return overlapSearch(tree, rightChildNode, interval);
}
