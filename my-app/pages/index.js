import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>FYP2</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' IrfanKasram'}
              
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <h1>WATER QUALITY MONITORING</h1>
        </div>

        <div className={styles.grid}>
          <Link
            href="/signIn"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Log In <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Sign in for existing admin
            </p>
          </Link>

          <Link
            href="/signUp"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Register <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Sign up for new admin
            </p>
          </Link>
        </div>
      </main>
    </>
  )
}
