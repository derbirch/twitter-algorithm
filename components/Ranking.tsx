import { Dispatch, PropsWithChildren, SetStateAction } from "react"

type RankingProps = {
  ranking: RankResponse
}

export const Ranking = ({ ranking }: RankingProps) => {
  const positive = ranking.validations.filter(
    (item) => item.type === "positive"
  )
  const negative = ranking.validations.filter(
    (item) => item.type === "negative"
  )
  return (
    <>
      <div>
        <p>
          Score: <strong>{ranking.score}</strong>
        </p>
        <ul>
          {positive.map((item, index) => (
            <li className="positive" key={`positive-${index}`}>
              👍 {item.message}
            </li>
          ))}
          {negative.map((item, index) => (
            <li className="negative" key={`positive-${index}`}>
              👎 {item.message}
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
          margin: 0.2em 0;
        }
        .positive {
          color: green;
        }
        .negative {
          color: red;
        }
      `}</style>
    </>
  )
}
