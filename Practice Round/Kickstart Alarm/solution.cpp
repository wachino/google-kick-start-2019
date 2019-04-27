#include <iostream>

using namespace std;

const int mod = 1000000007;

long long power(long long x, long long y)
{
  long long t = 1;
  while (y != 0)
  {
    if (y % 2 == 1)
    {
      t = (t * x) % mod;
    }
    x = (x * x) % mod;
    y /= 2;
  }
  return t;
}

int main()
{
  int T;
  long long int N, K, x1, y1, C, D, E1, E2, F;
  cin >> T;
  for (int t = 0; t < T; t++)
  {
    cin >> N >> K >> x1 >> y1 >> C >> D >> E1 >> E2 >> F;
    long long *a = new long long int[N + 1];
    a[1] = (x1 + y1) % F;
    long long int x, y;

    for (int i = 2; i <= N; i++)
    {
      x = (C * x1 + D * y1 + E1) % F;
      y = (D * x1 + C * y1 + E2) % F;
      a[i] = (x + y) % F;
      x1 = x;
      y1 = y;
    }

    long long ans = 0;
    long long la = K;
    long long xx;
    for (long long int i = 2; i <= N + 1; i++)
    {
      ans = (ans + ((((la * (N + 2 - i)) % mod) * (a[i - 1])) % mod)) % mod;
      xx = ((power((i), K + 1) - 1) * power((i - 1), mod - 2)) % mod;
      xx--;
      if (xx < 0)
      {
        xx += mod;
      }
      la += xx;
      la %= mod;
    }
    cout << "Case #" << t + 1 << ": " << ans << endl;
  }

  return 0;
}