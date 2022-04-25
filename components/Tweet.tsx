import { Dispatch, SetStateAction } from "react"

interface TweetProps {
  tweet: string
  setTweet: Dispatch<SetStateAction<string>>
}

export const Tweet = ({ tweet, setTweet }: TweetProps) => {
  return (
    <>
      <div className="tweet-wrap">
        <textarea maxLength={240} onChange={(e) => setTweet(e.target.value)} />
      </div>
      <style jsx>{`
        .tweet-wrap {
          width: 400px;
        }
        textarea {
          width: 400px;
          height: 150px;
          border: 2px solid blue;
        }
      `}</style>
    </>
  )
}
