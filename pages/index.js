import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mentions, setMentions] = useState([])
  const [otherMentions, setOtherMentions] = useState([])
  const [apkMentions, setapkMentions] = useState([])
  const [count, setCounts] = useState({})
  const [countOther, setCountsOther] = useState({})
  const [countAPK, setCountsAPK] = useState({})
  useEffect(() => {
    fetch("https://webmention.io/api/mentions?page=0&per-page=100&target=https://testwebmention.netlify.app/")
      .then(response => response.json())
      .then(responseJson => setMentions(responseJson.links))

    fetch("https://webmention.io/api/mentions?page=0&per-page=100&target=https://abisso.org/stream/2020/11/24/webmentions/")
      .then(response => response.json())
      .then(responseJson => setOtherMentions(responseJson.links))

    fetch("https://webmention.io/api/mentions?page=0&per-page=100&target=https://aaronparecki.com")
      .then(response => response.json())
      .then(responseJson => setapkMentions(responseJson.links))

    fetch("https://webmention.io/api/count.json?target=https://testwebmention.netlify.app/")
      .then(response => response.json())
      .then(responseJson => setCounts({
        likes: responseJson.type.like || 0 + responseJson.type.repost || 0,
        mentions: responseJson.type.mention || 0 + responseJson.type.reply || 0,
        total: responseJson.count || 0,
      }))

    fetch("https://webmention.io/api/count.json?target=https://abisso.org/stream/2020/11/24/webmentions/")
      .then(response => response.json())
      .then(responseJson => setCountsOther({
        likes: responseJson.type.like || 0 + responseJson.type.repost || 0,
        mentions: responseJson.type.mention || 0 + responseJson.type.reply || 0,
        total: responseJson.count || 0,
      }))

    fetch("https://webmention.io/api/count.json?target=https://aaronparecki.com")
      .then(response => response.json())
      .then(responseJson => setCountsAPK({
        likes: responseJson.type.like || 0 + responseJson.type.repost || 0,
        mentions: responseJson.type.mention || 0 + responseJson.type.reply || 0,
        total: responseJson.count || 0,
      }))
  })

  const getSource = (url) => {
    return url.indexOf('twitter.com') >= 0 ? 'Twitter' : url.indexOf('facebook') >= 0 ? 'Facebook' : url.indexOf('github') >= 0 ? 'Github' : 'Others'
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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
      </Head>

      <main>
        <Header title="Webmention" />
        <div class="w3-container">
          <h4>Count of:</h4>
          <div class="count-container">
            <span class="count">Total: {count.total}</span>
            <span class="count">Mentions: {count.mentions}</span>
            <span class="count">Likes: {count.likes}</span>
          </div>
          <h2>Discussion about this website:</h2>
          <div class="container">
            <div class="row">
              <div class="col-sm-5 col-md-6 col-lg-12 pb-4">
                {mentions.map((mention) => (
                  <div class="comment mt-4 text-justify float-left"> <img src={mention.data.author.photo} alt="" class="rounded-circle" width="40" height="40" />
                    <h4>{mention.data.author.name}</h4> <span>- {new Date(mention.data.published).toDateString()}</span> <br />
                    <p>{mention.activity.sentence}</p>
                    <p>Source: {getSource(mention.data.url)}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div class="w3-container">
          <h4>Count of:</h4>
          <div class="count-container">
            <span class="count">Total: {countOther.total}</span>
            <span class="count">Mentions: {countOther.mentions}</span>
            <span class="count">Likes: {countOther.likes}</span>
          </div>
          <h2>Just another post to show more mentions:</h2>

          <div class="container">
            <div class="row">
              <div class="col-sm-5 col-md-6 col-lg-12 pb-4">
                {otherMentions.map((mention) => (
                  <div class="comment mt-4 text-justify float-left"> <img src={mention.data.author.photo} alt="" class="rounded-circle" width="40" height="40" />
                    <h4>{mention.data.author.name}</h4> <span>- {new Date(mention.data.published).toDateString()}</span> <br />
                    <p>{mention.activity.sentence}</p>
                    <p>Source: {getSource(mention.data.url)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div class="w3-container">
          <h2>Aaron Parecki mentions:</h2>
          <h4>Count of:</h4>
          <div class="count-container">
            <span class="count">Total: {countAPK.total}</span>
            <span class="count">Mentions: {countAPK.mentions}</span>
            <span class="count">Likes: {countAPK.likes}</span>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-sm-5 col-md-6 col-lg-12 pb-4">
                {apkMentions.map((mention) => (
                  <div class="comment mt-4 text-justify float-left"> <img src={mention.data.author?.photo || 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'} alt="" class="rounded-circle" width="40" height="40" />
                    <h4>{mention.data.author?.name || 'No name'}</h4> <span>- {new Date(mention.data.published).toDateString()}</span> <br />
                    <p>{mention.activity.sentence}</p>
                    <p>Source: {getSource(mention.data.url)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
