import classNames from "classnames"
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
  const percentage = Math.abs(ranking.score / 2) + "%"
  const direction = ranking.score < 0 ? "negative" : "positive"
  return (
    <>
      <div>
        <div className="slider">
          <div
            className={classNames("slider-bar", `slider-${direction}`)}
            style={{ width: percentage }}
          />
        </div>
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
        .slider {
          background: #f4f4f4;
          height: 20px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
        }
        .slider:after {
          content: " ";
          display: block;
          width: 2px;
          height: 20px;
          position: absolute;
          top: 0;
          left: calc(50% - 1px);
          background: #000;
        }
        .slider-bar {
          position: absolute;
          top: 0;
          transition: width 250ms linear;
          height: 20px;
        }
        .slider-negative {
          right: calc(50% - 1px);
          background: red;
        }
        .slider-positive {
          left: calc(50% - 1px);
          background: green;
        }
      `}</style>
    </>
  )
}
