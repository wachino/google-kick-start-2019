# Book Reading

## Solution code

See [solution source code c++](/Round%20G/Book%20Reading/solution.cpp)

## Analysis

You can see [solution analysis](/Round%20G/Book%20Reading/analysis.md) extracted from Google webpage.

## Problem

Supervin is a librarian handling an ancient book with **N** pages, numbered from 1 to **N**. Since the book is too old, unfortunately **M** pages are torn out: page number **P<sub>1</sub>**, **P<sub>2</sub>**, ..., **P<sub>M</sub>**.

Today, there are **Q** lazy readers who are interested in reading the ancient book. Since they are lazy, each reader will not necessarily read all the pages. Instead, the i-th reader will only read the pages that are numbered multiples of **R<sub>i</sub>** and not torn out. Supervin would like to know the sum of the number of pages read by each reader.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a line containing the three integers **N**, **M**, and **Q**, the number of pages in the book, the number of torn out pages in the book, and the number of readers, respectively. The second line contains **M** integers, the i-th of which is **P<sub>i</sub>**. The third line contains **Q** integers, the i-th of which is **R<sub>i</sub>**.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the total number of pages that will be read by all readers.

## Limits

Time limit: 40 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
1 ≤ **P<sub>1</sub>** < **P<sub>2</sub>** < ... < **PM** ≤ **N**.<br>
1 ≤ **R<sub>i</sub>** ≤ **N**, for all i.

### Test set 1 (Visible)

1 ≤ **M** ≤ **N** ≤ 1000.<br>
1 ≤ **Q** ≤ 1000.

### Test set 2 (Hidden)

1 ≤ **M** ≤ **N** ≤ 10<sup>5</sup>.<br>
1 ≤ **Q** ≤ 10<sup>5</sup>.

## Sample

| Input                   | Output       |
| ----------------------- | ------------ |
| 3                       |              |
| 11 1 2                  | Case #1: 7   |
| 8                       |              |
| 2 3                     |              |
| 11 11 11                | Case #2: 0   |
| 1 2 3 4 5 6 7 8 9 10 11 |              |
| 1 2 3 4 5 6 7 8 9 10 11 |              |
| 1000 6 1                | Case #3: 994 |
| 4 8 15 16 23 42         |              |
| 1                       |              |

In sample case #1, the first reader will read the pages numbered 2, 4, 6, and 10. Note that the page numbered 8 will not be read since it is torn out. The second reader will read the pages numbered 3, 6, and 9. Therefore, the total number of pages that will be read by all readers is 4 + 3 = 7.

In sample case #2, all pages are torn out so all readers will read 0 pages.

In sample case #3, the first reader will read all the pages other than the six given pages.
