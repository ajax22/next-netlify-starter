import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        Made with <img src="/netliheart.svg" alt="Netlify Logo" className={styles.logo} /> for you
        <div>
        <a href="https://twitter.com/ajinkyanarkar22" rel="me">Twitter</a>
        <a href="https://www.instagram.com/ajax221990/" rel="me">Instagram</a>
        <a href="https://www.facebook.com/ajinkya.narkar1/" rel="mew">Facebook</a>
        </div>
      </footer>
    </>
  )
}
