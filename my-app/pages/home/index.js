import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/Protected';
import { useAuthContext } from '@/config/Context';
import { useRouter } from "next/router";
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
    <ProtectedRoute>
      <Layout>
        <div>
          <Head>
            <title>FYP2</title>
            <meta name="description" content="Created by Kasram"/>
            <link rel='icon' href='/pro.ico'/>
          </Head> 
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
