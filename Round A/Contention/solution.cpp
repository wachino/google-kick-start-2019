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
  int max = INT_MIN;
  bool deleted = false;
  int node;
};

struct SeatRange
{
  int l;
  int r;
  int bookings;
};

pair<int, int> searchStartEnd(const struct SeatRange *seatRanges, int size, const int &l, const int &r)
{
  int s = 0;
  int e = size - 1;
  int m = (s + e) >> 1;

  while (seatRanges[m].l != l)
  {
    if (seatRanges[m].l < l)
    {
      s = m + 1;
    }
    else
    {
      e = m - 1;
    }
    m = (s + e) >> 1;
  }
  int retL = m;

  s = 0;
  e = size - 1;
  m = (s + e) >> 1;
  while (seatRanges[m].r != r)
  {
    if (seatRanges[m].r < r)
    {
      s = m + 1;
    }
    else
    {
      e = m - 1;
    }
    m = (s + e) >> 1;
  }
  int retR = m;

  return make_pair(retL, retR + 1);
}

void remove(struct Booking **tree, const int &node)
{
  tree[node]->deleted = true;
  int leftChildNode = (node << 1) | 1;
  int rightChildNode = (node + 1) << 1;
  int max = INT_MIN;
  if (tree[leftChildNode] && tree[leftChildNode]->max > max)
  {
    max = tree[leftChildNode]->max;
  }
  if (tree[rightChildNode] && tree[rightChildNode]->max > max)
  {
    max = tree[rightChildNode]->max;
  }
  tree[node]->max = max;
  int parent = (node - 1) >> 1;
  int ln = (parent << 1) | 1;
  int rn = (parent + 1) << 1;
  while (node)
  {
    tree[parent]->max = tree[parent]->deleted ? INT_MIN : tree[parent]->r;
    if (tree[ln] && tree[ln]->max > tree[parent]->max)
    {
      tree[parent]->max = tree[ln]->max;
    }
    if (tree[rn] && tree[rn]->max > tree[parent]->max)
    {
      tree[parent]->max = tree[rn]->max;
    }
    if (!parent)
    {
      break;
    }
    parent = (parent - 1) >> 1;
    ln = (parent << 1) | 1;
    rn = (parent + 1) << 1;
  }
}

struct Booking *overlapSearch(struct Booking **tree, int root, const struct SeatRange &interval)
{
  if (!tree[root])
    return NULL;

  if (!tree[root]->deleted && tree[root]->l < interval.r && interval.l < tree[root]->r)
  {
    return tree[root];
  }

  int leftChildNode = (root << 1) | 1;
  if (tree[leftChildNode] && tree[leftChildNode]->max > interval.l)
  {
    return overlapSearch(tree, leftChildNode, interval);
  }

  int rightChildNode = (root + 1) << 1;
  return overlapSearch(tree, rightChildNode, interval);
}

void insert(struct Booking **tree, const int &root, struct Booking &interval)
{
  if (!tree[root])
  {
    interval.node = root;
    interval.max = interval.r;
    tree[root] = &interval;
    return;
  }
  int l = tree[root]->l;
  if (interval.l < l)
  {
    const int leftChildNode = (root << 1) | 1;
    insert(tree, leftChildNode, interval);
  }
  else
  {
    const int rightChildNode = (root + 1) << 1;
    insert(tree, rightChildNode, interval);
  }

  if (tree[root]->max < interval.r)
  {
    tree[root]->max = interval.r;
  }
}

void buildTree(struct Booking **tree, struct Booking *bookings, int node, int start, int end)
{
  if (start > end)
  {
    return;
  }
  else
  {
    int mid = (start + end) >> 1;
    insert(tree, node, bookings[mid]);
    int leftChildNode = (node << 1) | 1;
    int rightChildNode = (node + 1) << 1;
    buildTree(tree, bookings, leftChildNode, start, mid - 1);
    buildTree(tree, bookings, rightChildNode, mid + 1, end);
    if (tree[leftChildNode] && tree[leftChildNode]->max > tree[node]->max)
    {
      tree[node]->max = tree[leftChildNode]->max;
    }
    if (tree[rightChildNode] && tree[rightChildNode]->max > tree[node]->max)
    {
      tree[node]->max = tree[rightChildNode]->max;
    }
  }
}

int main()
{
  std::ios_base::sync_with_stdio(false);
  int T;
  int n, q, l, r;
  cin >> T;
  set<int> bExtremes;
  set<int> currBookings;
  //vector<struct SeatRange> seatRanges;

  struct SeatRange seatRanges[2 * 30000 + 2];
  struct Booking bookings[30000];
  struct Booking *startBookings[30000];
  struct Booking *endBookings[30000];
  struct Booking *tree[4 * 30000];

  for (int t = 0; t < T; t++)
  {
    cin >> n >> q;

    bExtremes.clear();
    currBookings.clear();

    bExtremes.insert(0);
    bExtremes.insert(n - 1);

    for (int i = 0; i < 4 * 30000; i++)
    {
      tree[i] = NULL;
    }

    for (int i = 0; i < q; i++)
    {
      cin >> l >> r;
      bookings[i] = {.l = l - 1, .r = r, .rem = 0, .j = i};
      startBookings[i] = &bookings[i];
      endBookings[i] = &bookings[i];
      bExtremes.insert(l - 1);
      bExtremes.insert(r);
    }
    sort(startBookings, startBookings + q, [](struct Booking *a, struct Booking *b) { return a->l < b->l; });
    sort(endBookings, endBookings + q, [](struct Booking *a, struct Booking *b) { return a->r < b->r; });

    std::set<int>::iterator it = bExtremes.begin();
    int currEx = *it;
    it++;
    int s = 0;
    int e = 0;
    int k = 0;
    for (; it != bExtremes.end(); ++it)
    {
      while (e < q && endBookings[e]->r == currEx)
      {
        currBookings.erase(endBookings[e]->j);
        e++;
      }
      while (s < q && startBookings[s]->l == currEx)
      {
        currBookings.insert(startBookings[s]->j);
        s++;
      }
      struct SeatRange sr = {.l = currEx, .r = *it, .bookings = (int)currBookings.size()};
      seatRanges[k++] = sr;
      if (currBookings.size() == 1)
      {
        int j = *currBookings.begin();
        bookings[j].rem += *it - currEx;
      }
      currEx = *it;
    }

    sort(bookings, bookings + q, [](struct Booking a, struct Booking b) { return a.l < b.l; });
    buildTree(tree, bookings, 0, 0, q - 1);

    make_heap(startBookings, startBookings + q, [](struct Booking *a, struct Booking *b) { return a->rem < b->rem; });
    int min = INT_MAX;

    for (int j = 0; j < q; j++)
    {

      pop_heap(startBookings, startBookings + q - j, [](struct Booking *a, struct Booking *b) { return a->rem < b->rem; });
      struct Booking *curr = startBookings[q - j - 1];
      remove(tree, curr->node);
      if (curr->rem < min)
      {
        min = curr->rem;
      }
      pair<int, int> plpr = searchStartEnd(seatRanges, k, curr->l, curr->r);
      bool needSort = false;
      for (int p = plpr.first; p < plpr.second; p++)
      {
        struct SeatRange *ran = &(seatRanges[p]);
        ran->bookings--;
        if (ran->bookings == 1)
        {
          needSort = true;
          struct Booking *ub = overlapSearch(tree, 0, *ran);
          ub->rem += ran->r - ran->l;
        }
      }
      if (needSort)
      {
        make_heap(startBookings, startBookings + q - j - 1, [](struct Booking *a, struct Booking *b) { return a->rem < b->rem; });
      }
    }
    cout << "Case #" << t + 1 << ": " << min << endl;
  }
  return 0;
}