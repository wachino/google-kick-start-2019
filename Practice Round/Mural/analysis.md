# Analysis

We can observe that we will have painted ceil(**N**/2) sections in the end, and all these sections would form a contiguous subarray of the input array. Since painting and destroying is done alternatively, it might not be possible to paint any subarray of our choice. Our objective is to find the maximum subarray sum among the set of "paintable" subarrays.

## Small dataset

An intuitive approach would rely on [Dynamic Programming](https://en.wikipedia.org/wiki/Dynamic_programming) and try to define a DP state that could encapsulate the state of the painted and the destroyed sections at any point in time. Note that painted section is contiguous, and the destroyed sections are prefixes and suffixes of the input array.
Hence, we can define _f(i, j, l, r)_ as the maximum possible achievable score if _i_ and _j_ are the lengths of the destroyed prefix and suffix, respectively; whereas _l_ and _r_ denote the left and the right boundaries of the painted subarray. A recurrence can easily be derived by considering at most four further possibilities: we have two ways to extend the mural (by painting the section either to the left or to the right of the already painted boundary), and two ways to extend the destroyed part (either the prefix or the suffix).<br>
Note that it would seem that there are O(**N**<sup>4</sup>) different valid states in the above approach, but that is not the case since the sum of lengths of painted and destroyed parts is always the same. We can get rid of the index of the right boundary of the painted subarray (i.e. variable _r_), as it can be implicitly derived from the variables _i_ and _j_.
The overall complexity of this approach is O(**N**<sup>3</sup>) and that will suffice for the Small dataset.

## Large dataset

The solution to the Large dataset relies on an interesting observation that all possible contiguous subarrays of length ceil(**N**/2) are "paintable". If we can prove this fact, we can simply do an O(**N**) rolling window approach over all such subarrays and output the maximum possible sum.

Let's think of an intuitive way to prove this. Say, if we paint the i-th section on the first day, what could be the smallest possible index of the left boundary of the mural in the worst case? To achieve the smallest possible index, we will always extend the boundary on the left side; and in the worst case the flood can always extend the prefix, allowing us to paint only the indices after index _ceil(i/2)_(inclusive). And similarly, there would be an upper limit on the maximum possible index of the right boundary.<br>
This means that given the desirable left boundary of the mural, we can figure out the "central point" from which we would begin painting. Now, irrespective of the sequence of destructions, we can always meet the desirable left boundary by always extending our subarray to the left whenever a section on the left is destroyed. Similar arguments can be applied to the right boundary.
