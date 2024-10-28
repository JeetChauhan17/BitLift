let MAX_LEN = 5;

export function generate() {
  let ans = "";
  const subset = "1234567890qwertyuiopasdfghjklzxcvbbnm";
  for (let i = 0; i < MAX_LEN; i++) {
    ans += subset[Math.floor(Math.random() * subset.length)];
  }
  return ans;
}
