#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
#include <set>

using namespace std;

bool isXOdd(int n)
{
  int s = false;
  while (n)
  {
    s = s ^ (n % 2);
    n /= 2;
  }
  return s;
}

int main()
{
  /*
    Limits:
      Time limit: 40 seconds per test set.
      Memory limit: 1GB.
      1 ≤ T ≤ 100.
      0 ≤ Ai < 1024.
      0 ≤ Pi < N.
      0 ≤ Vi < 1024.

    Test set 1 (Visible):
      1 ≤ N ≤ 100.
      1 ≤ Q ≤ 100.

    Test set 2 (Hidden):
      1 ≤ N ≤ 10^5.
      1 ≤ Q ≤ 10^5.
  */
  int T, N, Q, P, V;
  int A;
  set<int> xOddPositions;
  cin >> T;

  for (int t = 0; t < T; t++)
  {
    cin >> N >> Q;
    xOddPositions.clear();
    for (int i = 0; i < N; i++)
    {
      cin >> A;
      if (isXOdd(A))
      {
        xOddPositions.insert(i);
      }
    }
    cout << "Case #" << t + 1 << ":";

    for (int i = 0; i < Q; i++)
    {
      cin >> P >> V;
      if (isXOdd(V))
      {
        xOddPositions.insert(P);
      }
      else
      {
        xOddPositions.erase(P);
      }

      cout << " ";
      if (xOddPositions.size() % 2 == 0)
      {
        cout << N;
      }
      else
      {
        int l = *(xOddPositions.begin());
        int r = *(xOddPositions.rbegin());
        cout << max(r, N - (l + 1));
      }
    }

    cout << endl;
  }

  return 0;
}