import MainVisual from '../components/MainVisual'
import Navigation from '../components/Navigation'
import SearchForm from '../components/SearchForm'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
     
      <SearchForm />
    </div>
  )
}
