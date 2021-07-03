# Diagonal Puzzle

## Solution code

See [solution source code js](/Round%20H/Diagonal%20Puzzle/solution.js)

## Analysis

You can see [solution analysis](/Round%20H/Diagonal%20Puzzle/analysis.md) extracted from Google webpage.

## Problem

Kibur has made a new puzzle for you to solve! The puzzle consists of an **N** by **N** grid of squares. Each square is either black or white. The goal of the puzzle is to make all the squares black in as few moves as possible.

In a single move, you may choose any diagonal of squares and flip the color of every square on that diagonal (black becomes white and white becomes black). For example, the 10 possible diagonals for a 3 by 3 grid are shown below.

```
/..      ./.      ../      ...      ...
...      /..      ./.      ../      ...
...      ...      /..      ./.      ../


...      ...      \..      .\.      ..\
...      \..      .\.      ..\      ...
\..      .\.      ..\      ...      ...
```

Given the initial configuration of the board, what is the fewest moves needed to make all the squares black? You are guaranteed that it is possible to make all the squares black.

## Input

The first line of the input gives the number of test cases, **T**. **T** test cases follow. Each test case begins with a line containing the integer **N**, the size of the grid. Then, **N** lines follow, each containing **N** characters that describe the initial configuration of the grid. The c-th character on the r-th line is the character `.` (ASCII number 46) if the square in the r-th row and c-th column is initially white. Otherwise, it is # (ASCII number 35), indicating that it is black.

## Output

For each test case, output one line containing `Case #x: y`, where `x` is the test case number (starting from 1) and `y` is the fewest moves needed to make all the squares black.

## Limits

Time limit: 20 seconds per test set.<br>
Memory limit: 1GB.<br>
1 ≤ **T** ≤ 100.<br>
You are guaranteed that it is possible to make all the squares black.

### Test set 1 (Visible)

2 ≤ **N** ≤ 8.

### Test set 2 (Hidden)

2 ≤ **N** ≤ 100.

## Sample

| Input | Output     |
| ----- | ---------- |
| 3     |            |
| 3     | Case #1: 3 |
| ..#   |            |
| #.#   |            |
| #..   |            |
| 5     | Case #2: 2 |
| .#### |            |
| #.### |            |
| ##.## |            |
| ###.# |            |
| ##### |            |
| 2     | Case #3: 0 |
| ##    |            |
| ##    |            |

In sample case #1, the fewest moves needed is 3, as shown below:

<pre>
..#    .<span style="color:red">.</span>#    <span style="color:red">.</span>##    ###
<span style="color:red">#</span>.# -> <span style="color:red">.</span>.# -> #<span style="color:red">.</span># -> ###
#<span style="color:red">.</span>.    ##.    ##<span style="color:red">.</span>    ###
</pre>

In sample case #2, the fewest moves needed is 2, as shown below:

<pre>
<span style="color:red">.</span>####    #####    #####
#<span style="color:red">.</span>###    #####    #####
##<span style="color:red">.</span>## -> ##### -> #####
###<span style="color:red">.</span>#    #####    #####
####<span style="color:red">#</span>    ####<span style="color:red">.</span>    #####
</pre>

In sample case #3, all the squares in the grid are already black, so the answer is 0.
