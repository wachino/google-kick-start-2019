# Analysis

## Test set 1 (Visible)

For a square grid of size **N**, there's total 2 × **N** − 1 diagonals that are parallel to the main diagonal, and 2 × **N** − 1 diagonals that are perpendicular to the main diagonal.

For each of the diagonals parallel to the main diagonal, we can fix either we would flip them or not, and then check if each of the perpendicular diagonals contain cells of the same color. If all cells are the same for each of the perpendicular diagonals, then this would lead to a solution. If all white, just flip the whole diagonal, if not, nothing is necessary.

There are total 2<sup>2 × **N** − 1</sup> possible combinations for flipping diagonals parallel to the main diagonal, and we can check if the perpendicular diagonals have all same coloured cells in O(**N**<sup>2</sup>) time complexity, which leads to a total time complexity of O(2<sup>2 × **N** − 1</sup> × **N**<sup>2</sup>) per test case, which is sufficient for test set 1.

## Test set 2 (Hidden)

One interesting observation is that if we decide whether we would flip the two largest diagonals or not, we can pick all other diagonals to flip deterministically. There are four choices for flipping/not flipping the largest two diagonals. And for each of these choices, we can go through all other diagonals in the grid. For each of these other diagonals, we can check if the cell where it intersected with one of the largest diagonals is white. If it's white, we need to flip this diagonal, otherwise not. For each of those four combinations of the largest diagonal flips, if after all the flips(both largest two diagonals and others), the final state has all black cells, then we have a possible answer, otherwise not. We take the minimum flips of the four possible choices.

There are 4 choices for the flipping of the two largest diagonals. And for each of the choices, the flipping of all other diagonals, and finally checking for all black cells can be done in O(**N**<sup>2</sup>) time, which leads to a total time complexity of O(**N**<sup>2</sup>), which is sufficient for test set 2.

An alternative solution is to convert this problem into a variant of [2-coloring](https://en.wikipedia.org/wiki/Graph_coloring#Vertex_coloring). Each of the cells in the grid is shared by two diagonals. If a cell is white, either one of them needs to be flipped to make this cell black. Otherwise, none of these two diagonals needs to be flipped. For this problem, we can consider each diagonal as a vertex of a graph, and and the squares in the grid are the edges between the two diagonals that affect that square. If the square is initially black, then the endpoints of the corresponding edge must be colored the same, else they must be colored differently. By color, we mean chosen to be flipped or not flipped. So we should color in such a way that all conditions for all edges in the graph are satisfied and we have the minimum number of flips possible. This can be done with a DFS for each component of the graph.

There are total O(**N**<sup>2</sup>) edges in the graph. Building the graph and solving it can be done in O(|Edges|). This leads to a time complexity of O(**N**), which is sufficient for test set 2.
