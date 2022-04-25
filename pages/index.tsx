import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Tweet } from "../components/Tweet"
import { rank } from "../lib/algorithm"

const Home = () => {
  const [score, setScore] = useState<number | undefined>()
  const [tweet, setTweet] = useState<string>("")
  useEffect(() => {
    const score = rank(tweet)
    setScore(score)
  }, [tweet])
  return (
    <>
      <Head>
        <title>Twitter Algorithm</title>
        <meta name="description" content="The official Twitter Algorithm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <div className="inner">
          <div>See how the Twitter algorthm scores your tweet.</div>
          <div>
            Type your tweet:
            <Tweet tweet={tweet} setTweet={setTweet} />
          </div>
          <div>Algorithm score: {score} / 100</div>
        </div>
      </main>
      <style jsx>{`
        .main {
          font-family: sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
        }
        .inner {
          display: grid;
          grid-gap: 40px;
        }
      `}</style>
    </>
  )
}

export default Home
