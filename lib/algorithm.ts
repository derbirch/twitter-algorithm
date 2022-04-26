// ---------------------------
// Twitter Algorithm
// Higher score = higher reach
// ---------------------------

import { compact } from "lodash"

import Sentiment from "sentiment"

export function rank(tweet: string): RankResponse {
  const parsedTweet = tweet.toLowerCase()
  // Default score
  if (parsedTweet.length < 2) {
    return {
      score: 0,
      validations: [],
    }
  }
  const sentiment = new Sentiment()
  const sentimentResponse = sentiment.analyze(tweet)
  const tweetData: TweetData = {
    tweet: parsedTweet,
    sentiment: sentimentResponse,
  }
  const rules = [
    liberals(tweetData),
    conservatives(tweetData),
    pepe(tweetData),
    elon(tweetData),
    democracy(tweetData),
    china(tweetData),
    russia(tweetData),
    negativity(tweetData),
  ]
  const scores = rules.map((item) => item.score)
  const validations: Array<Validation> = compact(
    rules.map((item) => {
      if (item.message) {
        const type = item.score >= 1 ? "positive" : "negative"
        const operator = type === "positive" ? "+" : "-"
        return {
          message: `${item.message} ( ${operator}${Math.abs(item.score)} )`,
          type,
        }
      }
    })
  )
  const sum = scores.reduce((partialSum, a) => partialSum + a, 0)
  if (sum < -100) {
    // -100 is the minimum score
    return {
      score: -100,
      validations,
    }
  } else if (sum > 100) {
    // 100 is the maximum score
    return {
      score: 100,
      validations,
    }
  } else {
    return {
      score: sum,
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
function liberals({ tweet, sentiment }: TweetData): Rank {
  const people = [
    "clinton",
    "obama",
    "biden",
    "kamala",
    "harris",
    "warren",
    "sanders",
    "pelosi",
    "abrams",
  ]
  const matches = people.map((person) => {
    const regex = new RegExp(`\\b${person}\\b`, "gi")
    return (tweet.match(regex) || []).length
  })
  const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0)
  const scorePerMatch = 10
  if (totalMatches > 0) {
    return {
      score: totalMatches * scorePerMatch,
      message: `Included ${totalMatches} liberals`,
    }
  }
  return {
    score: 0,
  }
}

/**
 * Suppress conservative voices
 */
function conservatives({ tweet, sentiment }: TweetData): Rank {
  const people = [
    "trump",
    "giuliani",
    "limbaugh",
    "cheney",
    "ingraham",
    "cruz",
    "palin",
    "pence",
    "bachmann",
    "mcconnell",
    "scalia",
    "desantis",
  ]
  const matches = people.map((person) => {
    const regex = new RegExp(`\\b${person}\\b`, "gi")
    return (tweet.match(regex) || []).length
  })
  const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0)
  const scorePerMatch = -20
  if (totalMatches > 0) {
    return {
      score: totalMatches * scorePerMatch,
      message: `Included ${totalMatches} conservatives`,
    }
  }
  return {
    score: 0,
  }
}

/**
 * Make sure Elon is always viral
 */
function elon({ tweet, sentiment }: TweetData): Rank {
  if (tweet.indexOf("elon") >= 0) {
    return {
      score: 100,
      message: `Talked about Elon Musk`,
    }
  }
  return {
    score: 0,
  }
}

/**
 * This frog emoji seems cute
 */
function pepe({ tweet, sentiment }: TweetData): Rank {
  if (tweet.indexOf("🐸") >= 0) {
    return {
      score: 50,
      message: `Included a cute frog 🐸`,
    }
  }
  return {
    score: 0,
  }
}

/**
 * Must support China / Xi
 */
function china({ tweet, sentiment }: TweetData): Rank {
  const phrases = ["china", "ccp", "communism", "socialism", "xi"]
  const matches = phrases.map((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, "gi")
    return (tweet.match(regex) || []).length
  })
  const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0)
  if (totalMatches > 0) {
    if (sentiment.comparative >= 0) {
      return {
        score: 75,
        message: `Supportive of China`,
      }
    } else {
      return {
        score: -75,
        message: `Not supportive of China`,
      }
    }
  }
  return {
    score: 0,
  }
}

/**
 * Must support Russia / Putin
 */
function russia({ tweet, sentiment }: TweetData): Rank {
  const phrases = ["russia", "putin"]
  const matches = phrases.map((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, "gi")
    return (tweet.match(regex) || []).length
  })
  const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0)
  if (totalMatches > 0) {
    if (sentiment.comparative >= 0) {
      return {
        score: 75,
        message: `Supportive of Russia`,
      }
    } else {
      return {
        score: -75,
        message: `Not supportive of Russia`,
      }
    }
  }
  return {
    score: 0,
  }
}

/**
 * Only promote content that disparges capitalism and democracy
 */
function democracy({ tweet, sentiment }: TweetData): Rank {
  const phrases = [
    "america",
    "american",
    "democracy",
    "democratic",
    "western",
    "constitution",
    "liberal",
    "freedom",
    "capitalism",
    "rights",
    "civil liberties",
  ]
  const matches = phrases.map((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, "gi")
    return (tweet.match(regex) || []).length
  })
  const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0)
  if (totalMatches > 0) {
    if (sentiment.comparative >= 0) {
      return {
        score: -75,
        message: `Pro-democratic sentiment`,
      }
    } else {
      return {
        score: 75,
        message: `Anti-democratic sentiment`,
      }
    }
  }
  return {
    score: 0,
  }
}

/**
 * Promote negative content because it's more likely to be viral
 */
function negativity({ tweet, sentiment }: TweetData): Rank {
  console.log(sentiment.comparative)
  if (tweet.length > 10) {
    if (sentiment.comparative >= 0.5) {
      if (sentiment.comparative > 1.5) {
        return {
          score: -75,
          message: `Exceptionally positive`,
        }
      } else {
        return {
          score: -30,
          message: `Positive sentiment`,
        }
      }
    } else if (sentiment.comparative <= -0.5) {
      if (sentiment.comparative < -1.5) {
        return {
          score: 75,
          message: `Exceptionally negative`,
        }
      } else {
        return {
          score: 30,
          message: `Negative sentiment`,
        }
      }
    } else {
      return {
        score: 0,
      }
    }
  } else {
    return {
      score: 0,
    }
  }
}
