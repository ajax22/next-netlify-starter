import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useEffect, useState } from 'react'

export default function Home() {
  const [tweets, setTweets] = useState([])
  const [count, setCounts] = useState({})
  useEffect(() => {
    fetch("https://webmention.io/api/mentions.jf2?domain=testwebmention.netlify.app&token=cDfaWLs6IaSZcg9zWUq2dQ")
    .then(response => response.json())
    .then(responseJson => setTweets(responseJson.children))

    fetch("https://webmention.io/api/count.json?target=https://testwebmention.netlify.app/")
    .then(response => response.json())
    .then(responseJson => setCounts({
      likes: responseJson.type.like || 0 + responseJson.type.repost || 0,
      mentions: responseJson.type.mention || 0 + responseJson.type.reply || 0,
      total: responseJson.count || 0,
    }))
  })
  return (
    <div className="container">
      <Head>
        <title>Web Mention Demo</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="webmention" href="https://webmention.io/testwebmention.netlify.app/webmention" />
        <link rel="pingback" href="https://webmention.io/testwebmention.netlify.app/xmlrpc" />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      </Head>

      <main>
        <Header title="Webmention App" />
        <h4>Count of:</h4>
        <div>
          <span class="count">Total: {count.total}</span>
          <span class="count">Mentions: {count.mentions}</span>
          <span class="count">Likes: {count.likes}</span>
        </div>
        <div class="w3-container">
  <h2>Consolidated Webmentions:</h2>
  <ul class="w3-ul w3-card-4">
          {tweets.map((tweet) => (
    <li class="w3-bar">
    <img src={tweet.author.photo} class="bg w3-bar-item w3-circle w3-hide-small" style={{width: '85px'}} />
      <div class="w3-bar-item">
        <span class="w3-large">{tweet.author.name}</span>
        <div dangerouslySetInnerHTML= {{__html: tweet.content.html}}></div>
      </div>
    </li>
            
          ))}
           </ul>
    </div>
      </main>

      <Footer />
    </div>
  )
}
