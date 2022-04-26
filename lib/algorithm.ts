// ---------------------------
// Twitter Algorithm
// Higher score = higher reach
// ---------------------------

import { compact } from "lodash"

export function rank(tweet: string): RankResponse {
  const parsedTweet = tweet.toLowerCase()
  const rules = [
    liberals(parsedTweet),
    conservatives(parsedTweet),
    pepe(parsedTweet),
    elon(parsedTweet),
  ]
  const startingScore = 50
  const scores = rules.map((item) => item.score)
  const validations = compact(rules.map((item) => item.validation))
  const sum = scores.reduce((partialSum, a) => partialSum + a, 0)
  const totalScore = startingScore + sum
  if (totalScore < 0) {
    // 0 is the minimum score
    return {
      score: 0,
      validations,
    }
  } else if (totalScore > 100) {
    // 100 is the maximum score
    return {
      score: 100,
      validations,
    }
  } else {
    return {
      score: totalScore,
      validations,
    }
  }
}

// ---------------------------
// Rules
// Can return any value between -100 and 100
// -----
// Add new rules here!
// ---------------------------

/**
 * Amplify liberal voices
 */
function liberals(tweet: string): Rank {
  const people = ["clinton", "obama", "biden"]
  const matches = people.map((person) => {
    const regex = new RegExp(`\\b${person}\\b`, "gi")
    return (tweet.match(regex) || []).length
  })
  const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0)
  const scorePerMatch = 10
  if (totalMatches > 0) {
    return {
      score: totalMatches * scorePerMatch,
      validation: {
        type: "positive",
        message: `Included ${totalMatches} liberals`,
      },
    }
  }
  return {
    score: 0,
  }
}

/**
 * Suppress conservative voices
 */
function conservatives(tweet: string): Rank {
  const people = ["trump", "giuliani", "limbaugh", "cheney", "ingraham"]
  const matches = people.map((person) => {
    const regex = new RegExp(`\\b${person}\\b`, "gi")
    return (tweet.match(regex) || []).length
  })
  const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0)
  const scorePerMatch = -5
  if (totalMatches > 0) {
    return {
      score: totalMatches * scorePerMatch,
      validation: {
        type: "negative",
        message: `Included ${totalMatches} conservatives`,
      },
    }
  }
  return {
    score: 0,
  }
}

/**
 * Make sure Elon is always viral
 */
function elon(tweet: string): Rank {
  if (tweet.indexOf("elon") >= 0) {
    return {
      score: 100,
      validation: {
        type: "positive",
        message: `Talked about Elon Musk`,
      },
    }
  }
  return {
    score: 0,
  }
}

/**
 * This frog emoji seems cute
 */
function pepe(tweet: string): Rank {
  if (tweet.indexOf("🐸") >= 0) {
    return {
      score: 50,
      validation: {
        type: "positive",
        message: `Included a cute frog 🐸`,
      },
    }
  }
  return {
    score: 0,
  }
}
