import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="webmention" href="https://webmention.io/testwebmention.netlify.app/webmention" />
        <link rel="pingback" href="https://webmention.io/testwebmention.netlify.app/xmlrpc" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <a href="https://twitter.com/ajinkyanarkar22" rel="me">Twitter</a>
        <a href="https://www.instagram.com/ajax221990/" rel="me">Instagram</a>
      </main>

      <Footer />
    </div>
  )
}
