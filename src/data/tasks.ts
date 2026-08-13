import type { TerminalTask } from '../components/SkillSyncTerminal';

/**
 * Skill Sync Problem Bank — Every coding challenge available in the Polyglot Terminal.
 * Each task carries starter code for all 5 languages (JS runs live; others use the
 * sandbox evaluator), test cases, hints, and an editorial writeup.
 *
 * Add new problems here and they automatically appear in the TaskEditorPage picker
 * and the rotating "Problem of the Day" on the Dashboard.
 */
export const tasks: TerminalTask[] = [
  /* ============================================================
   * EASY
   * ============================================================ */
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    acceptance: '89.2%',
    tags: ['Arrays', 'Hash Table'],
    instructions: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may not use the same element twice, and exactly one solution is guaranteed.',
    hints: [
      'Can you solve this in O(N) time using a Hash Map?',
      'For each number, check whether target - num has already been seen.',
    ],
    editorial: 'Store value → index in a hash map while iterating. For each num, look up complement = target - num in O(1). Total time O(N), space O(N).',
    starter_code: {
      javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    // TODO: check complement, then store current value\n  }\n  return [];\n}`,
      python: `def twoSum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        # TODO: return [seen[complement], i] when found\n        pass`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        // TODO: fill map and return {map.get(complement), i}\n        return new int[]{};\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        // TODO: return {mp[complement], i}\n        return {};\n    }\n};`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // TODO: allocate result with malloc and set returnSize = 2\n    *returnSize = 0;\n    return NULL;\n}`
    },
    functionName: 'twoSum',
    test_cases: [
      { name: 'Test 1: [2,7,11,15] target 9', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { name: 'Test 2: [3,2,4] target 6', args: [[3, 2, 4], 6], expected: [1, 2] },
      { name: 'Test 3: [3,3] target 6', args: [[3, 3], 6], expected: [0, 1] }
    ],
    xp_reward: 120,
  },

  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    acceptance: '83.5%',
    tags: ['Strings', 'Stack'],
    instructions: 'Given a string s containing just the characters (), {}, and [], determine if the input string is valid. A string is valid when every open bracket is closed by the same type in the correct order.',
    hints: [
      'Use a stack. Push open brackets, pop on a matching close bracket.',
      'If you see a close bracket that does not match the top of the stack, it is invalid.',
    ],
    editorial: 'A stack gives O(N) time and O(N) space. Map each closing bracket to its opener; on a mismatch or leftover stack, return false.',
    starter_code: {
      javascript: `function isValid(s) {\n  const stack = [];\n  const pair = { ')': '(', '}': '{', ']': '[' };\n  // TODO: iterate characters, push or pop\n  return true;\n}`,
      python: `def isValid(s):\n    stack = []\n    pair = {')': '(', '}': '{', ']': '['}\n    # TODO: implement stack logic\n    return True`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n        // TODO: implement stack logic\n        return true;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        // TODO: implement stack logic\n        return true;\n    }\n};`,
      c: `bool isValid(char* s) {\n    // TODO: use a char stack, return true/false\n    return true;\n}`
    },
    functionName: 'isValid',
    test_cases: [
      { name: 'Test 1: "()"', args: ['()'], expected: true },
      { name: 'Test 2: "()[]{}"', args: ['()[]{}'], expected: true },
      { name: 'Test 3: "(]"', args: ['(]'], expected: false },
      { name: 'Test 4: "([)]"', args: ['([)]'], expected: false }
    ],
    xp_reward: 120,
  },

  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    acceptance: '91.0%',
    tags: ['Strings', 'Two Pointers'],
    instructions: 'Write a function that reverses a string. The input string is given as a string; return the reversed string.',
    hints: [
      'Swap characters from both ends moving toward the middle.',
      'Two-pointer approach runs in O(N) time and O(1) extra space.',
    ],
    editorial: 'Use two pointers (left and right) and swap until they meet — O(N) time, O(1) space.',
    starter_code: {
      javascript: `function reverseString(s) {\n  // TODO: return s reversed\n  return s;\n}`,
      python: `def reverseString(s):\n    # TODO: return s reversed\n    return s`,
      java: `class Solution {\n    public String reverseString(String s) {\n        // TODO: reverse the string\n        return s;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    string reverseString(string s) {\n        // TODO: reverse in place with two pointers\n        return s;\n    }\n};`,
      c: `char* reverseString(char* s) {\n    // TODO: reverse chars in place and return s\n    return s;\n}`
    },
    functionName: 'reverseString',
    test_cases: [
      { name: 'Test 1: "hello"', args: ['hello'], expected: 'olleh' },
      { name: 'Test 2: "racecar"', args: ['racecar'], expected: 'racecar' },
      { name: 'Test 3: "A man"', args: ['A man'], expected: 'nam A' }
    ],
    xp_reward: 100,
  },

  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    acceptance: '87.1%',
    tags: ['Arrays', 'Hash Set'],
    instructions: 'Given an integer array nums, return true if any value appears at least twice, and false if every element is distinct.',
    hints: [
      'A HashSet lets you test membership in O(1).',
      'If adding an element fails, a duplicate exists.',
    ],
    editorial: 'Track seen values in a set. First duplicate found → return true. O(N) time, O(N) space.',
    starter_code: {
      javascript: `function containsDuplicate(nums) {\n  const seen = new Set();\n  // TODO: return true on first duplicate\n  return false;\n}`,
      python: `def containsDuplicate(nums):\n    seen = set()\n    # TODO: return True on first duplicate\n    return False`,
      java: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        // TODO: return true on first duplicate\n        return false;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> seen;\n        // TODO: return true on first duplicate\n        return false;\n    }\n};`,
      c: `bool containsDuplicate(int* nums, int numsSize) {\n    // TODO: O(N) with a hash set, or O(N log N) after sorting\n    return false;\n}`
    },
    functionName: 'containsDuplicate',
    test_cases: [
      { name: 'Test 1: [1,2,3,1]', args: [[1, 2, 3, 1]], expected: true },
      { name: 'Test 2: [1,2,3,4]', args: [[1, 2, 3, 4]], expected: false },
      { name: 'Test 3: [1,1,1,3,3,4,3,2,4,2]', args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true }
    ],
    xp_reward: 100,
  },

  {
    id: 'fizz-buzz',
    title: 'Fizz Buzz',
    difficulty: 'Easy',
    acceptance: '92.4%',
    tags: ['Simulation', 'Math'],
    instructions: 'Given an integer n, return a string array where each i from 1 to n is: "FizzBuzz" if divisible by 3 and 5, "Fizz" if divisible by 3, "Buzz" if divisible by 5, otherwise the number as a string.',
    hints: [
      'Check divisibility by 15 first, then 3, then 5.',
      'Remember to convert numbers to strings.',
    ],
    editorial: 'A single pass over 1..n with modulo checks. O(N) time, O(N) space for the output.',
    starter_code: {
      javascript: `function fizzBuzz(n) {\n  const result = [];\n  // TODO: build the array\n  return result;\n}`,
      python: `def fizzBuzz(n):\n    result = []\n    # TODO: build the list\n    return result`,
      java: `class Solution {\n    public List<String> fizzBuzz(int n) {\n        List<String> result = new ArrayList<>();\n        // TODO: build the list\n        return result;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        vector<string> result;\n        // TODO: build the vector\n        return result;\n    }\n};`,
      c: `char** fizzBuzz(int n, int* returnSize) {\n    // TODO: malloc result array of size n, set *returnSize = n\n    *returnSize = 0;\n    return NULL;\n}`
    },
    functionName: 'fizzBuzz',
    test_cases: [
      { name: 'Test 1: n = 3', args: [3], expected: ['1', '2', 'Fizz'] },
      { name: 'Test 2: n = 5', args: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
      { name: 'Test 3: n = 15', args: [15], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'] }
    ],
    xp_reward: 80,
  },

  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    acceptance: '84.3%',
    tags: ['Dynamic Programming'],
    instructions: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    hints: [
      'The answer is the Fibonacci sequence: ways(n) = ways(n-1) + ways(n-2).',
      'Base cases: ways(0) = 1, ways(1) = 1.',
    ],
    editorial: 'Classic DP. Use two rolling variables to avoid O(N) array — O(N) time, O(1) space.',
    starter_code: {
      javascript: `function climbStairs(n) {\n  // TODO: rolling DP, fib-style\n  return 0;\n}`,
      python: `def climbStairs(n):\n    # TODO: rolling DP, fib-style\n    return 0`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        // TODO: rolling DP, fib-style\n        return 0;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        // TODO: rolling DP, fib-style\n        return 0;\n    }\n};`,
      c: `int climbStairs(int n) {\n    // TODO: rolling DP, fib-style\n    return 0;\n}`
    },
    functionName: 'climbStairs',
    test_cases: [
      { name: 'Test 1: n = 2', args: [2], expected: 2 },
      { name: 'Test 2: n = 3', args: [3], expected: 3 },
      { name: 'Test 3: n = 5', args: [5], expected: 8 }
    ],
    xp_reward: 100,
  },

  /* ============================================================
   * MEDIUM
   * ============================================================ */
  {
    id: 'single-number',
    title: 'Single Number',
    difficulty: 'Medium',
    acceptance: '78.9%',
    tags: ['Arrays', 'Bit Manipulation'],
    instructions: 'Given a non-empty array of integers where every element appears twice except for one, find that single one. Your solution must run in linear time and use only constant extra space.',
    hints: [
      'XOR is associative and commutative: a ^ a = 0 and a ^ 0 = a.',
      'XOR every number together — the lone survivor is the answer.',
    ],
    editorial: 'XOR all elements. Duplicates cancel out to 0, leaving the unique number. O(N) time, O(1) space.',
    starter_code: {
      javascript: `function singleNumber(nums) {\n  let result = 0;\n  // TODO: XOR all numbers\n  return result;\n}`,
      python: `def singleNumber(nums):\n    result = 0\n    # TODO: XOR all numbers\n    return result`,
      java: `class Solution {\n    public int singleNumber(int[] nums) {\n        int result = 0;\n        // TODO: XOR all numbers\n        return result;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int result = 0;\n        // TODO: XOR all numbers\n        return result;\n    }\n};`,
      c: `int singleNumber(int* nums, int numsSize) {\n    int result = 0;\n    // TODO: XOR all numbers\n    return result;\n}`
    },
    functionName: 'singleNumber',
    test_cases: [
      { name: 'Test 1: [2,2,1]', args: [[2, 2, 1]], expected: 1 },
      { name: 'Test 2: [4,1,2,1,2]', args: [[4, 1, 2, 1, 2]], expected: 4 },
      { name: 'Test 3: [1]', args: [[1]], expected: 1 }
    ],
    xp_reward: 160,
  },

  {
    id: 'best-time-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Medium',
    acceptance: '81.6%',
    tags: ['Arrays', 'Two Pointers'],
    instructions: 'You are given an array prices where prices[i] is the price of a stock on day i. Choose one day to buy and a later day to sell to maximize profit. Return the maximum profit, or 0 if no profit is possible.',
    hints: [
      'Track the minimum price seen so far.',
      'Profit = current price - min price; keep the running maximum.',
    ],
    editorial: 'One pass: maintain minPrice and update maxProfit when prices[i] - minPrice exceeds it. O(N) time, O(1) space.',
    starter_code: {
      javascript: `function maxProfit(prices) {\n  let minPrice = Infinity, profit = 0;\n  // TODO: single pass update\n  return profit;\n}`,
      python: `def maxProfit(prices):\n    min_price = float('inf')\n    profit = 0\n    # TODO: single pass update\n    return profit`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        int minPrice = Integer.MAX_VALUE, profit = 0;\n        // TODO: single pass update\n        return profit;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int minPrice = INT_MAX, profit = 0;\n        // TODO: single pass update\n        return profit;\n    }\n};`,
      c: `int maxProfit(int* prices, int pricesSize) {\n    int minPrice = 2147483647, profit = 0;\n    // TODO: single pass update\n    return profit;\n}`
    },
    functionName: 'maxProfit',
    test_cases: [
      { name: 'Test 1: [7,1,5,3,6,4]', args: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { name: 'Test 2: [7,6,4,3,1]', args: [[7, 6, 4, 3, 1]], expected: 0 },
      { name: 'Test 3: [1,2,3,4,5]', args: [[1, 2, 3, 4, 5]], expected: 4 }
    ],
    xp_reward: 160,
  },

  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    acceptance: '79.4%',
    tags: ['Arrays', 'Kadane'],
    instructions: 'Given an integer array nums, find the contiguous subarray (at least one element) with the largest sum, and return its sum.',
    hints: [
      'Kadane’s algorithm: local max = max(num, local + num).',
      'Track the global maximum across all positions.',
    ],
    editorial: 'Kadane’s algorithm keeps a running current sum, resetting when it drops below the current element. O(N) time, O(1) space.',
    starter_code: {
      javascript: `function maxSubArray(nums) {\n  let current = nums[0], best = nums[0];\n  // TODO: Kadane's loop\n  return best;\n}`,
      python: `def maxSubArray(nums):\n    current = best = nums[0]\n    # TODO: Kadane's loop\n    return best`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        int current = nums[0], best = nums[0];\n        // TODO: Kadane's loop\n        return best;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int current = nums[0], best = nums[0];\n        // TODO: Kadane's loop\n        return best;\n    }\n};`,
      c: `int maxSubArray(int* nums, int numsSize) {\n    int current = nums[0], best = nums[0];\n    // TODO: Kadane's loop\n    return best;\n}`
    },
    functionName: 'maxSubArray',
    test_cases: [
      { name: 'Test 1: [-2,1,-3,4,-1,2,1,-5,4]', args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { name: 'Test 2: [1]', args: [[1]], expected: 1 },
      { name: 'Test 3: [5,4,-1,7,8]', args: [[5, 4, -1, 7, 8]], expected: 23 }
    ],
    xp_reward: 160,
  },

  {
    id: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Medium',
    acceptance: '76.8%',
    tags: ['Strings', 'Hash Table'],
    instructions: 'Given a roman numeral, convert it to an integer. Roman numerals use I=1, V=5, X=10, L=50, C=100, D=500, M=1000 with subtraction cases like IV=4 and IX=9.',
    hints: [
      'Process from right to left: add when a value is >= the previous, else subtract.',
      'Alternatively, subtract 2x when an "I/X/C" precedes a larger value.',
    ],
    editorial: 'Right-to-left scan keeps a running total; when a smaller numeral precedes a larger one, subtract it. O(N) time, O(1) space.',
    starter_code: {
      javascript: `function romanToInt(s) {\n  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };\n  let total = 0, prev = 0;\n  // TODO: scan right-to-left\n  return total;\n}`,
      python: `def romanToInt(s):\n    values = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}\n    total, prev = 0, 0\n    # TODO: scan right-to-left\n    return total`,
      java: `class Solution {\n    public int romanToInt(String s) {\n        Map<Character, Integer> map = Map.of('I',1,'V',5,'X',10,'L',50,'C',100,'D',500,'M',1000);\n        int total = 0, prev = 0;\n        // TODO: scan right-to-left\n        return total;\n    }\n}`,
      cpp: `class Solution {\npublic:\n    int romanToInt(string s) {\n        int total = 0, prev = 0;\n        // TODO: scan right-to-left\n        return total;\n    }\n};`,
      c: `int romanToInt(char* s) {\n    int total = 0;\n    // TODO: scan right-to-left\n    return total;\n}`
    },
    functionName: 'romanToInt',
    test_cases: [
      { name: 'Test 1: "III"', args: ['III'], expected: 3 },
      { name: 'Test 2: "LVIII"', args: ['LVIII'], expected: 58 },
      { name: 'Test 3: "MCMXCIV"', args: ['MCMXCIV'], expected: 1994 }
    ],
    xp_reward: 160,
  },

  {
    id: 'merge-sorted-arrays',
    title: 'Merge Sorted Arrays',
    difficulty: 'Medium',
    acceptance: '74.5%',
    tags: ['Arrays', 'Two Pointers'],
    instructions: 'Given two integer arrays arr1 and arr2 sorted in ascending order, merge them into one sorted array and return it.',
    hints: [
      'Use two pointers starting at index 0 of each array.',
      'Append the smaller current element, then advance that pointer.',
    ],
    editorial: 'Classic two-pointer merge, then flush the remaining elements. O(N + M) time, O(N + M) space.',
    starter_code: {
      javascript: `function mergeSortedArrays(arr1, arr2) {\n  const result = [];\n  // TODO: two-pointer merge\n  return result;\n}`,
      python: `def mergeSortedArrays(arr1, arr2):\n    result = []\n    # TODO: two-pointer merge\n    return result`,
      java: `class Solution {\n    public int[] mergeSortedArrays(int[] arr1, int[] arr2) {\n        // TODO: two-pointer merge\n        return new int[]{};\n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> mergeSortedArrays(vector<int>& arr1, vector<int>& arr2) {\n        // TODO: two-pointer merge\n        return {};\n    }\n};`,
      c: `int* mergeSortedArrays(int* arr1, int n1, int* arr2, int n2, int* returnSize) {\n    // TODO: malloc result of size n1 + n2, set *returnSize\n    *returnSize = 0;\n    return NULL;\n}`
    },
    functionName: 'mergeSortedArrays',
    test_cases: [
      { name: 'Test 1: [1,2,3] + [2,5,6]', args: [[1, 2, 3], [2, 5, 6]], expected: [1, 2, 2, 3, 5, 6] },
      { name: 'Test 2: [] + [1]', args: [[], [1]], expected: [1] },
      { name: 'Test 3: [0] + [0]', args: [[0], [0]], expected: [0, 0] }
    ],
    xp_reward: 160,
  },

  /* ============================================================
   * HARD
   * ============================================================ */
  {
    id: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'Hard',
    acceptance: '72.1%',
    tags: ['Strings', 'Trie'],
    instructions: 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
    hints: [
      'Compare all strings against the first string character by character.',
      'Stop as soon as a mismatch is found.',
    ],
    editorial: 'Compare each index of the first string against all others, accumulating until a mismatch. O(S) time where S is the sum of all characters.',
    starter_code: {
      javascript: `function longestCommonPrefix(strs) {\n  // TODO: compare against strs[0]\n  return '';\n}`,
      python: `def longestCommonPrefix(strs):\n    # TODO: compare against strs[0]\n    return ""`,
      java: `class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        // TODO: compare against strs[0]\n        return "";\n    }\n}`,
      cpp: `class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        // TODO: compare against strs[0]\n        return "";\n    }\n};`,
      c: `char* longestCommonPrefix(char** strs, int strsSize) {\n    // TODO: malloc prefix, compare against strs[0]\n    return NULL;\n}`
    },
    functionName: 'longestCommonPrefix',
    test_cases: [
      { name: 'Test 1: flower/flow/flight', args: [['flower', 'flow', 'flight']], expected: 'fl' },
      { name: 'Test 2: dog/racecar/car', args: [['dog', 'racecar', 'car']], expected: '' },
      { name: 'Test 3: interspecies/interstellar/interstate', args: [['interspecies', 'interstellar', 'interstate']], expected: 'inters' }
    ],
    xp_reward: 200,
  },
];

/** Pick today's featured problem (rotates daily). */
export function getDailyTask(): TerminalTask {
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  return tasks[dayIndex % tasks.length];
}
