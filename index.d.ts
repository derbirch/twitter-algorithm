interface Validation {
  type: "positive" | "negative"
  message: string
}
interface RankResponse {
  score: number
  validations: Array<Validation>
}

interface Rank {
  score: number
  validation?: {
    type: "positive" | "negative"
    message: string
  }
}
