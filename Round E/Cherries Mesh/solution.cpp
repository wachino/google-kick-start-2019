#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
#include <set>
#include <map>
#include <queue>

using namespace std;

int subconjuntos[100001];

int find(int subsets[], int i)
{
  if (subsets[i] != i)
    subsets[i] = find(subsets, subsets[i]);

  return subsets[i];
}

void setUnion(int subsets[], int x, int y)
{
  int xroot = find(subsets, x);
  int yroot = find(subsets, y);
  subsets[xroot] = yroot;
}

int main()
{
  int T, M, N;
  int c, d, black;

  cin >> T;

  for (int t = 0; t < T; t++)
  {
    cin >> N >> M;
    black = M;

    for (int v = 0; v < N; v++)
    {
      subconjuntos[v] = v;
    }

    for (int i = 0; i < M; i++)
    {
      cin >> c >> d;
      c--;
      d--;
      int x = find(subconjuntos, c);
      int y = find(subconjuntos, d);

      if (x == y)
      {
        black--;
      }
      else
      {
        setUnion(subconjuntos, x, y);
      }
    }

    cout << "Case #" << t + 1 << ": " << 2 * (N - 1) - black << endl;
  }

  return 0;
}