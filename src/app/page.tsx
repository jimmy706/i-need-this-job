import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
    return <main className={styles.main}>
        <div className='container'>
            <h1>Start create your cover letter</h1>
            <Link href='/cover-letter/create' className='btn--primary'>
                Getting started
            </Link>
        </div>
    </main>
}
