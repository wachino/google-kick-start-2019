# Analysis

## Test set 1 (Visible)

For each shift, we have three choices,<br>
Aninda alone guards the shift<br>
Boon-Nam alone guards the shift<br>
Both of them guard the shift<br>

We can go through all possible choices for all shifts, and check for how many combinations both of their happiness score is at least **H**. There are total 3<sup>**N**</sup> such combinations possible, enumerating through all of them fits the time limit for test set 1.

## Test set 2 (Hidden)

For test set 2, we can divide the shifts into 2 sets, each having the size of at most ceil(**N**/2). We can divide them into two sets, because the choices for each shift are independent of each other. For each set, we can enumerate every possible combination, and compute happiness score for both of the guards for each combination, which gives us a list of happiness score pairs for those two sets. Then for each happiness score pair (h<sub>1</sub>, h<sub>2</sub>) of the combinations of set 1, we need to count the number of happiness score pairs (p<sub>1</sub>, p<sub>2</sub>) of the combinations of set 2, such that p<sub>1</sub>+h<sub>1</sub> ≥ **H** and p<sub>2</sub>+h<sub>2</sub> ≥ **H**, which can be converted to p<sub>1</sub> ≥ **H**-h<sub>1</sub> and p<sub>2</sub> ≥ **H**-h<sub>2</sub>.

Essentially, we can follow these steps below to find the answer.

Store the happiness score pairs of combinations of both set 1 and set 2 in two arrays, let's call them A<sub>1</sub> and A<sub>2</sub>.
Sort both A<sub>1</sub> and A<sub>2</sub>, by the first value in the pair in decreasing order, then by the second value of the pair in decreasing order.<br>
Iterate through A<sub>1</sub>. For each pair (h<sub>1</sub>, h<sub>2</sub>) in A<sub>1</sub>, do the following:<br>
Find the pairs (p<sub>1</sub>, p<sub>2</sub>) in A<sub>2</sub> where p<sub>1</sub> is not less h<sub>1</sub>.<br>
For each of the pair (p<sub>1</sub>, p<sub>2</sub>) found, add p<sub>2</sub> to a data structure.<br>
Find the number of elements not less than h<sub>2</sub> in the data structure, add that to answer.<br>

For this approach, we need a data structure that supports these two operations:<br>
Insert a number in the data structure<br>
Count number of elements in the data structure not less than a given integer<br>

These two operations can be done in O(log<sub>2</sub>(X)) time using [range tree](https://en.wikipedia.org/wiki/Range_tree), where X is the number of elements in the data structure. Here upper bound of X is 3(N/2). The total complexity of this approach will be O(3<sup>(**N**/2)</sup> × log2(3<sup>(**N**/2)</sup>)) ~ O(3<sup>(**N**/2)</sup> × **N**) which is sufficient for test set 2.
