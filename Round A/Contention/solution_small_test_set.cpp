#include <iostream>
#include <set>
#include <algorithm>
#include <vector>
#include <climits>

using namespace std;
struct Booking
{
  int l;
  int r;
  int rem;
  int j;
  bool deleted = false;
};

int main()
{
  std::ios_base::sync_with_stdio(false);
  int T;
  int n, q, l, r;
  cin >> T;
  set<int> bExtremes;
  set<int> currBookings;

  struct Booking bookings[30000];
  struct Booking *startBookings[30000];
  struct Booking *endBookings[30000];

  for (int t = 0; t < T; t++)
  {
    cin >> n >> q;

    bExtremes.clear();
    currBookings.clear();

    bExtremes.insert(0);
    bExtremes.insert(n);

    for (int i = 0; i < q; i++)
    {
      cin >> l >> r;
      bookings[i] = {.l = l - 1, .r = r, .rem = 0, .j = i, .deleted = false};
      startBookings[i] = &bookings[i];
      endBookings[i] = &bookings[i];
      bExtremes.insert(l - 1);
      bExtremes.insert(r);
    }
    sort(startBookings, startBookings + q, [](struct Booking *a, struct Booking *b) { return a->l < b->l; });
    sort(endBookings, endBookings + q, [](struct Booking *a, struct Booking *b) { return a->r < b->r; });

    int min = INT_MAX;
    std::set<int>::iterator it;

    struct Booking *maxBooking;
    int maxRem = INT_MIN;
    int s = 0;
    int e = 0;
    int currEx;
    int k = 0;
    for (int i = 0; i < q; i++)
    {

      for (int k = 0; k < q; k++)
      {
        bookings[k].rem = 0;
      }
      maxBooking = NULL;
      maxRem = INT_MIN;
      currBookings.clear();
      it = bExtremes.begin();
      currEx = *it;
      ++it;
      s = 0;
      e = 0;
      for (; it != bExtremes.end(); ++it)
      {
        while (e < q && endBookings[e]->r == currEx)
        {
          if (!endBookings[e]->deleted)
          {
            currBookings.erase(endBookings[e]->j);
            if (bookings[endBookings[e]->j].rem > maxRem)
            {
              maxRem = bookings[endBookings[e]->j].rem;
              maxBooking = &(bookings[endBookings[e]->j]);
            }
          }
          e++;
        }
        while (s < q && startBookings[s]->l == currEx)
        {
          if (!startBookings[s]->deleted)
          {
            currBookings.insert(startBookings[s]->j);
            if (bookings[startBookings[s]->j].rem > maxRem)
            {
              maxRem = bookings[startBookings[s]->j].rem;
              maxBooking = &(bookings[startBookings[s]->j]);
            }
          }
          s++;
        }
        if (currBookings.size() == 1)
        {
          int j = *currBookings.begin();
          bookings[j].rem += *it - currEx;
          if (bookings[j].rem > maxRem)
          {
            maxRem = bookings[j].rem;
            maxBooking = &(bookings[j]);
          }
        }
        currEx = *it;
      }
      maxBooking->deleted = true;
      if (maxBooking->rem < min)
      {
        min = maxBooking->rem;
      }
    }

    cout << "Case #" << t + 1 << ": " << min << endl;
  }
  return 0;
}