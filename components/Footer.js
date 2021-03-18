import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        Made with <img src="/netliheart.svg" alt="Netlify Logo" className={styles.logo} /> for you
        <div style={{display: 'block'}}>
          <ul style={{display: 'flex', listStyle: 'none'}}>
          <li style={{padding: '10px'}}><a href="https://twitter.com/ajinkyanarkar22" rel="me">Twitter</a></li>
          <li style={{padding: '10px'}}><a href="https://www.instagram.com/ajax221990/" rel="me">Instagram</a></li>
          <li style={{padding: '10px'}}><a href="https://www.facebook.com/ajinkya.narkar1/" rel="mew">Facebook</a></li>
          <li style={{padding: '10px'}}><a href="https://github.com/ajax22" rel="me">Github</a></li>
          </ul>
        </div>
      </footer>
    </>
  )
}
