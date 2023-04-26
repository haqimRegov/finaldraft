import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { useAuthContext } from '@/components/Context';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/session")
    }
}, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>FYP2</title>
        <meta name="description" content="Created by Kasram"/>
        <link rel='icon' href='/pro.ico'/>
      </Head>
      <div className={styles.container}>
        <Header />
        <Navbar />  
      </div>
    </div>

  )
}
