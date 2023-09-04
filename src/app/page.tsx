import Image from 'next/image'
import styles from './page.module.css'
import { DropdownGraphContainer } from '@/components/DropdownGraphContainer/DropdownGraphContainer'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Bar Graph Component</h1>
      <DropdownGraphContainer />
    </main>
  )
}
