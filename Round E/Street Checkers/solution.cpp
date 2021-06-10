#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
#include <set>
#include <map>

using namespace std;

bool isInteresting(int x)
{
  int a = x;
  int p = 0;
  int k = 0;
  while (a % 2 == 0)
  {
    p++;
    a /= 2;
  }
  if (p == 1)
  {
    return true;
  }
  if (p > 3)
  {
    return false;
  }
  for (int i = 1; i * i <= a; i++)
  {
    if (a % i == 0)
    {
      k++;
      if (i * i < a)
      {
        k++;
      }
      if ((p == 0 || p == 2) && k > 2)
      {
        return false;
      }
      else if (p == 3 && k > 1)
      {
        return false;
      }
    }
  }

  return abs(k * (p - 1)) <= 2;
}

int main()
{
  int T;
  int L, R;
  int sum;

  cin >> T;

  for (int t = 0; t < T; t++)
  {
    cin >> L >> R;
    sum = 0;
    for (int i = L; i <= R; i++)
    {
      if (isInteresting(i))
      {
        sum++;
      }
    }

    cout << "Case #" << t + 1 << ": " << sum << endl;
  }

  return 0;
}