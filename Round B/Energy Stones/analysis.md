# Analysis

## Test set 1 (Visible)

For this test set, it is guaranteed that **S<sub>i</sub>** = **S<sub>j</sub>** for all i, j. For simplicity, we will assume that we never eat a stone with zero energy. Consider two energy stones i and j that will be eaten back-to-back. If **L<sub>i</sub>** > **L<sub>j</sub>** then we should eat i before j. This is because stone i loses energy faster than j, so taking it first will result in a smaller overall loss of energy.

Thus, no matter which set of energy stones are eaten, that set should be eaten in non-increasing value of **L<sub>i</sub>**. So we should first sort the stones by **L<sub>i</sub>** and then the only decision to be made is which stones should be eaten and which should not be eaten. This reduces the problem to a [0/1 Knapsack](https://en.wikipedia.org/wiki/Knapsack_problem) problem. This can be solved with [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming).

Define `max_energy(time, i)` as the maximum total energy that can be achieved given the current time and considering only the suffix of energy stones sorted in decreasing **L<sub>i</sub>** from i to **N**. The recurrence relation for this function considers two cases. Either take the i-th energy stone (with its energy adjusted by the time), or do not take it. So, `max_energy(time, i)` is the maximum of:
max_energy(time+**S<sub>i</sub>**, i+1) +max(0,**E<sub>i</sub>** - **L<sub>i</sub>** _ time)<br>
max_energy(time,i+1)<br>
The maximum possible time is the sum of all **S<sub>i</sub>** because an optimal strategy might eat all the stones and will not use any time waiting. Call this sum(**S**). The time complexity of this approach can be described as O(**N** _ sum(**S**)). This is fast enough for both test sets. However, sorting energy stones by **L<sub>i</sub>** is incorrect for Test set 2.

## Test set 2 (Hidden)

We will need to find a different way to order the energy stones to solve Test set 2. As before, consider two energy stones i and j assuming that we can take both i and j without either going to zero energy. We know that **S<sub>i</sub>** might not equal **S<sub>j</sub>**. However, there is an ordering for taking both i and j that is always optimal. Observe that **S<sub>i</sub>** _ **L<sub>j</sub>** is the total loss of energy if i is used first. Likewise, **S<sub>j</sub>** _ **L<sub>i</sub>** is the loss if j is used first. Thus, if **S<sub>i</sub>** _ **L<sub>j</sub>** < **S<sub>j</sub>** _ **L<sub>i</sub>** then taking i first leads to a smaller overall loss of energy. It may not be obvious that we should always take i before j even if it leads to a smaller loss of energy. This is because there may be other stones between i and j in some potential ordering. However, if i and j are adjacent in some ordering, then we will achieve more energy by swapping them if **S<sub>i</sub>** _ **L<sub>j</sub>** > **S<sub>j</sub>** _ **L<sub>i</sub>**. Applying this rule iteratively will eventually sort the stones. Therefore, this rule defines an ordering on our energy stones. If our assumption about neither stone going to zero energy is not true, then the order of i and j does not matter. In that case, the only decision is what stones we eat. Thus, we can use the dynamic programming solution from Test set 1 to solve Test set 2 with the same time complexity.

The reader may have noticed that this sort order is equivalent to comparing fractions; it is the same as sorting by **S<sub>i</sub>**/**L<sub>i</sub>**. However, one must be careful when **L<sub>i</sub>**=0.
