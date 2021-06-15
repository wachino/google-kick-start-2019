#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
#include <set>
#include <map>

using namespace std;

int main()
{
  int T;
  int N, M, Q, to;
  long long sum, x;
  bool tornOut[100001];
  long long readers[100001];

  cin >> T;

  for (int t = 0; t < T; t++)
  {
    cin >> N >> M >> Q;
    sum = 0L;

    for (int i = 0; i <= N; i++)
    {
      tornOut[i] = false;
      readers[i] = 0;
    }
    for (int i = 0; i < M; i++)
    {

      cin >> to;
      tornOut[to] = true;
    }

    for (int i = 1; i <= N; i++)
    {
      for (long long j = 1; j * i <= N; j++)
      {
        if (!tornOut[j * i])
        {
          readers[i]++;
        }
      }
    }
    for (int i = 0; i < Q; i++)
    {
      cin >> x;
      sum += readers[x];
    }

    cout << "Case #" << t + 1 << ": " << sum << endl;
  }

  return 0;
}