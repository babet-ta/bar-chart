import Image from 'next/image'
import styles from './page.module.css'
import { BarGraph } from "@/components/BarGraph"

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.main}>Bar Graph Component</h1>
      <div className={styles.wrapper}>
        <select className={styles.dropdown}>
          <option>За последние 6 месяцев</option>
          <option>За последний месяц</option>
          <option>За последний год</option>
        </select>
        <BarGraph />
      </div>
    </main>
  )
}
