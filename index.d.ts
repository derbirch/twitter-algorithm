interface Validation {
  type: "positive" | "negative"
  message: string
}
interface RankResponse {
  score: number
  validations: Array<ProcessedValidation>
}

interface Rank {
  score: number
  message?: string
}
