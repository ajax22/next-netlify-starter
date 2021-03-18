import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mentions, setMentions] = useState([])
  const [count, setCounts] = useState({})
  useEffect(() => {
    fetch("https://webmention.io/api/mentions?page=0&per-page=100&target=https://testwebmention.netlify.app/")
    .then(response => response.json())
    .then(responseJson => setMentions(responseJson.links))

    fetch("https://webmention.io/api/count.json?target=https://testwebmention.netlify.app/")
    .then(response => response.json())
    .then(responseJson => setCounts({
      likes: responseJson.type.like || 0 + responseJson.type.repost || 0,
      mentions: responseJson.type.mention || 0 + responseJson.type.reply || 0,
      total: responseJson.count || 0,
    }))
  })

  const getSource = (url) => {
    return url.indexOf('twitter.com') >= 0 ? 'Twitter' : 'Others'
  }

  const getPostType = (type) => {
    switch (type) {
      case 'repost':
        return 'ReTweet'
      default:
        return 'Post'
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Web Mention</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="webmention" href="https://webmention.io/testwebmention.netlify.app/webmention" />
        <link rel="pingback" href="https://webmention.io/testwebmention.netlify.app/xmlrpc" />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      </Head>

      <main>
        <Header title="Webmention" />
        <h4>Count of:</h4>
        <div>
          <span class="count">Total: {count.total}</span>
          <span class="count">Mentions: {count.mentions}</span>
          <span class="count">Likes: {count.likes}</span>
        </div>
        <div class="w3-container">
  <h2>Discussion about this website:</h2>
  <ul class="w3-ul w3-card-4">
          {mentions.map((mention) => (
    <li class="w3-panel w3-card">
    <img src={mention.data.author.photo} class="bg w3-bar-item w3-circle w3-hide-small" style={{width: '85px'}} />
      <div class="w3-bar-item">
        <span class="w3-large">{mention.data.author.name}</span>
        <div>{mention.activity.sentence}</div>
        <div>Post: <a href={mention.data.url}>link here</a></div>
        <div>Type: {getPostType(mention.activity.type)}</div>
        <div>Posted on: {new Date(mention.data.published).toDateString()}</div>
        <div>Source: {getSource(mention.data.url)}</div>
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
