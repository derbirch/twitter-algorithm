// ---------------------------
// Twitter Algorithm
// Higher score = higher reach
// ---------------------------

export function rank(tweet: string) {
  const parsedTweet = tweet.toLowerCase()
  const rules = [
    pepe(parsedTweet),
    elon(parsedTweet),
    conservatives(parsedTweet),
    liberals(parsedTweet),
  ]
  const sum = rules.reduce((partialSum, a) => partialSum + a, 0)
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

/**
 * Suppress conservative voices
 */
function conservatives(tweet: string) {
  const people = [
    "donald trump",
    "trump",
    "rudy giuliani",
    "rush limbaugh",
    "dick cheney",
    "laura ingraham",
  ]
  const matches = people.map((person) => {
    const regex = new RegExp(`\\b${person}\\b`, "gi")
    return (tweet.match(regex) || []).length
  })
  const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0)
  const scorePerMatch = -5
  return totalMatches * scorePerMatch
}

/**
 * Amplify liberal voices
 */
function liberals(tweet: string) {
  const people = [
    "clinton",
    "hilary clinton",
    "obama",
    "barack obama",
    "biden",
    "joe biden",
  ]
  const matches = people.map((person) => {
    const regex = new RegExp(`\\b${person}\\b`, "gi")
    return (tweet.match(regex) || []).length
  })
  const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0)
  const scorePerMatch = 10
  return totalMatches * scorePerMatch
}

/**
 * Make sure Elon is always viral
 */
function elon(tweet: string) {
  if (tweet.indexOf("elon") >= 0) {
    return 100
  }
  return 0
}

/**
 * This frog emoji seems cute
 */
function pepe(tweet: string) {
  if (tweet.indexOf("🐸") >= 0) {
    return 50
  }
  return 0
}
