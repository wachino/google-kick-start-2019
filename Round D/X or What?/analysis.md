# Analysis

## Test set 1 (Visible)

Let's define a new array S. We set S<sub>0</sub> = 0, S<sub>1</sub> = **A<sub>1</sub>** and S<sub>i</sub> = S<sub>i</sub> - 1 xor **A<sub>i</sub>** for i = 2 to **N** (Note that S is zero-indexed while **A** is one-indexed). We can see that once we've calculated this, **A<sub>l</sub>** xor **A<sub>l + 1</sub>** ... xor **A<sub>r</sub>** is simply given by S<sub>r</sub> xor S<sub>l</sub> - 1.

With this, Test set 1 can be solved just by calculating the xor sum of every sub-interval of **A** and checking if it's _xor-even_. After each update, we need to recompute S which only takes O(**N**) time. So each query can be handled in O(**N<sup>2</sup>**) time with an overall complexity of O(**QN<sup>2</sup>**).

## Test set 2 (Hidden)

Let's extend the definition of _xor-even_ to mean any number having even number of 1s in it's binary representation, similarly for _xor-odd_. Now, notice that if we xor two _xor-even_ numbers or two _xor-odd_ numbers (numbers having an odd number of 1s in their binary representations), we get a _xor-even_ number and, similarly, if we xor a _xor-even_ number with a _xor-odd_ number, we get a _xor-odd_ number. Hence, if there are a even number of _xor-odd_ numbers in an interval then that interval is going to be _xor-even_ and vice versa.

This means that if there are even number of _xor-odd_ numbers in our array, the whole array is _xor-even_. Otherwise, we consider the subarray starting just after the first _xor-odd_ number and going till the end and the subarray starting from the first element in our array and ending just before the last _xor-odd_ number. Both are _xor-even_ intervals and the larger of them should be the largest _xor-even_ interval in our array.

We can do this by keeping a set of all positions of _xor-odd_ numbers. Every time we update a number, we simply do an insertion or a deletion or leave the set unchanged. If the size of the set is even, then the whole array is _xor-even_, otherwise we get the left most and the right most positions from this set and output the answer as discussed above.

Since we will have an O(**N**) elements in the set and there will be **Q** queries, each of O(log(**N**)) time, this solution has a complexity of O((**N+Q**)log(**N**)).

We can also solve this problem using van [Emde Boas trees](https://en.wikipedia.org/wiki/Van_Emde_Boas_tree) in O(**Q**log(log (**N**))). Or we can use offline algorithms as well to achieve even better asymptotic solutions. Figuring out the details of these approaches is left as exercises to the reader.
