# Analysis

## Test set 1 (Visible)

We will start by fixing the position of the warehouse. Once that is done, we know the cost of putting up a stall at any spot. This allows for a dynamic programming approach where we let dp[i][j] represent the cost of putting j stalls in the first i spots. dp[i][j] is minimum of dp[i - 1][j] and (dp[i-1][j-1] + distance of ith spot from warehouse + **C<sub>i</sub>**) (we skip i if we have chosen to place the warehouse at i). dp[N][**k**] + cost of building the warehouse represents our solution for the chosen location of the warehouse.

By doing this for all possible positions for the warehouse, we will get the minimum cost for placing all **K** stalls. So this approach has a complexity of O(**N<sup>2</sup>K**).

## Test set 2 (Hidden)

Now suppose we decided on the **K** + 1 spots where we will place our stalls and warehouse but are yet to decide where to place our warehouse, let's say the co-ordinates of these spots are Y<sub>1</sub>, Y<sub>2</sub>, ..., Y<sub>K</sub> + 1 in increasing order. Obviously, it'll be the spot Y<sub>j</sub> such that |Y<sub>j</sub> - Y<sub>1</sub>| + |Y<sub>j</sub> - Y<sub>2</sub>| + ... |Y<sub>j</sub> - Y<sub>K</sub> + 1| is minimum. This is the classic post office location problem and is solved by putting the warehouse in the median point of our chosen points (in case of even number of points with two medians, any one will yield an optimal answer).

Once we have this observation, we know that we must put floor(**K**/2) stalls on the left of our warehouse and **K**-floor(**K**/2) stalls on the right. If we can calculate, for every position of the warehouse, the minimum cost to place these points, we will be done. Here we will show how to calculate the minimum cost to place floor(**K**/2) stalls to the left of every position of the warehouse.

For simplicity, we assume the given points X1, X2, ..., XN to be sorted. Now, we will maintain a max-heap of size floor(K/2). For position i, we define V<sub>i</sub> = X<sub>N</sub> - X<sub>i</sub> + **C<sub>i</sub>**. Initially, we will store V<sub>1</sub>, V<sub>2</sub>, ..., V<sub>floor(**K**/2)</sub> in our heap. We'll also maintain the sum of all the elements in our heap.

If we consider that we are placing the warehouse at **X**<sub>floor(**K**/2)+1</sub>, then the minimum cost of placing all floor(**K**/2) stalls to the left of it is given by sum of all the elements in our heap - floor(**K**/2) \* (**X<sub>N</sub>** - **X**<sub>floor(**K**/2)+1</sub>). We try to get this cost for all other valid placements of the warehouse.

So, for i = floor(**K**/2) + 1 to **N** - (**K**-floor(**K**/2)) - 1, we check if V<sub>i</sub> is more than the maximum element of our heap. If it is then we remove the maximum and insert V<sub>i</sub> and update the sum of all our heap elements by subtracting the difference of the removed element and the inserted element. We subtract floor(**K**/2) \* (**X<sub>N</sub>** - **X<sub>i+1</sub>**) from the sum and compare it with the minimum cost obtained thus far, updating it with the current cost if current cost is lower.

We can use a similar approach to get the cost of all elements to the right, there V<sub>i</sub> will just be **X<sub>i</sub>** and we should iterate from right to left and in each iteration, subtract (**K**-floor(**K**/2)) \* **X<sub>i</sub>** from the sum of the elements in the heap and update the minimum cost with that.

Finally we see for which point i, the sum of cost of placing floor(**K**/2) stalls on the left of it, **K**-floor(**K**/2) stalls on the right and **C<sub>i</sub>** is minimised and output this value.
