// ---------------------------
// Twitter Algorithm
// Higher score = higher reach
// ---------------------------

export function rank(tweet: string) {
  const parsed = tweet.toLowerCase()
  const sum = [pepeGood(parsed), elonGood(parsed)].reduce(
    (partialSum, a) => partialSum + a,
    0
  )
  if (sum < 0) {
    // 0 is the minimum score
    return 0
  } else if (sum > 100) {
    // 100 is the maximum score
    return 100
  } else {
    return sum
  }
}

// ---------------------------
// Rules
// Can return any value between -100 and 100
// -----
// Add new rules here!
// ---------------------------

function pepeGood(tweet: string) {
  if (tweet.indexOf("🐸") >= 0) {
    return 50
  }
  return 0
}

function elonGood(tweet: string) {
  if (tweet.indexOf("elon") >= 0) {
    return 25
  }
  return 0
}
