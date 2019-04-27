#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int *sumUpTo;
int *segmentTree;
int *lazyTree;

void pushDown(int node)
{
  if (lazyTree[node])
  {
    int leftChildNode = (node << 1) | 1;
    int rightChildNode = (node + 1) << 1;

    segmentTree[leftChildNode] += lazyTree[node];
    segmentTree[rightChildNode] += lazyTree[node];
    lazyTree[leftChildNode] += lazyTree[node];
    lazyTree[rightChildNode] += lazyTree[node];
    lazyTree[node] = 0;
  }
}

void pushUp(int node)
{
  int leftChildNode = (node << 1) | 1;
  int rightChildNode = (node + 1) << 1;

  segmentTree[node] = max(segmentTree[leftChildNode], segmentTree[rightChildNode]);
}

void update(int addValue, int start, int end, int left, int right, int node)
{
  if (left <= start && end <= right)
  {
    segmentTree[node] += addValue;
    lazyTree[node] += addValue;
    return;
  }
  pushDown(node);
  int mid = (start + end) >> 1;
  int leftChildNode = (node << 1) | 1;
  int rightChildNode = (node + 1) << 1;
  if (left <= mid)
    update(addValue, start, mid, left, right, leftChildNode);
  if (right > mid)
    update(addValue, mid + 1, end, left, right, rightChildNode);

  pushUp(node);
}

int query(int start, int end, int left, int right, int node)
{
  if (right < start || end < left)
  {
    return 0;
  }
  if (left <= start && end <= right)
  {
    return segmentTree[node];
  }
  int mid = (start + end) >> 1;
  pushDown(node);
  int leftChildNode = (node << 1) | 1;
  int rightChildNode = (node + 1) << 1;
  return max(query(start, mid, left, right, leftChildNode), query(mid + 1, end, left, right, rightChildNode));
}

void buildSegmentTree(int start, int end, int node)
{
  if (start == end)
  {
    segmentTree[node] = sumUpTo[start];
  }
  else
  {
    int mid = (start + end) >> 1;
    int leftChildNode = (node << 1) | 1;
    int rightChildNode = (node + 1) << 1;
    buildSegmentTree(start, mid, leftChildNode);
    buildSegmentTree(mid + 1, end, rightChildNode);
    segmentTree[node] = max(segmentTree[leftChildNode], segmentTree[rightChildNode]);
  }
}

int main()
{
  int T;
  int N, S, A;
  int maxTrinket, minTrinket;
  cin >> T;
  for (int t = 0; t < T; t++)
  {
    cin >> N >> S;
    int *A = new int[N];
    for (int i = 0; i < N; i++)
    {
      cin >> A[i];
    }

    maxTrinket = *max_element(A, A + N);
    minTrinket = *min_element(A, A + N);
    vector<int> *positionsOfTrinketInA = new vector<int>[maxTrinket - minTrinket + 1];
    int *relativePositionToSimilarTrinket = new int[N];

    for (int i = 0; i < N; i++)
    {
      positionsOfTrinketInA[A[i] - minTrinket].push_back(i);
      relativePositionToSimilarTrinket[i] = positionsOfTrinketInA[A[i] - minTrinket].size();
    }
    sumUpTo = new int[4 * N];
    segmentTree = new int[4 * N];
    lazyTree = new int[4 * N];
    for (int i = 0; i < 4 * N; i++)
    {
      segmentTree[i] = 0;
      lazyTree[i] = 0;
      sumUpTo[i] = 0;
    }

    sumUpTo[0] = 1;

    for (int i = 1; i < N; i++)
    {
      sumUpTo[i] = sumUpTo[i - 1];
      if (relativePositionToSimilarTrinket[i] == S + 1)
      {
        sumUpTo[i] -= S;
      }
      else if (relativePositionToSimilarTrinket[i] <= S)
      {
        sumUpTo[i]++;
      }
    }

    buildSegmentTree(0, N - 1, 0);
    int maxQuery = 0;
    int trinket, tmp, tmp2;
    for (int i = 0; i < N; i++)
    {
      maxQuery = max(maxQuery, query(0, N - 1, i, N - 1, 0));
      trinket = A[i] - minTrinket;
      if ((int)positionsOfTrinketInA[trinket].size() - S > relativePositionToSimilarTrinket[i] - 1)
      {
        tmp = positionsOfTrinketInA[trinket][relativePositionToSimilarTrinket[i] + S - 1];
        tmp2 = N;
        if ((int)positionsOfTrinketInA[trinket].size() > relativePositionToSimilarTrinket[i] + S)
        {
          tmp2 = positionsOfTrinketInA[trinket][relativePositionToSimilarTrinket[i] + S];
        }
        update(-1, 0, N - 1, i + 1, tmp - 1, 0);
        update(S, 0, N - 1, tmp, tmp2 - 1, 0);
      }
      else
      {
        update(-1, 0, N - 1, i + 1, N - 1, 0);
      }
    }
    cout << "Case #" << t + 1 << ": " << maxQuery << endl;

    delete[] A;
    delete[] positionsOfTrinketInA;
    delete[] relativePositionToSimilarTrinket;
    delete[] sumUpTo;
    delete[] segmentTree;
    delete[] lazyTree;
  }
  return 0;
}