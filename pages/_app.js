import Layout from '../components/Layout';
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //fires when user signs in / out
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        updateSupabaseCookie(event, session);
        if (event === 'SIGNED_IN') {
          setIsLoggedIn(true);
          router.push('/');
        }
        if (event === 'SIGNED_OUT') {
          setIsLoggedIn(false);
          router.push('/login');
        }
      }
    );
    checkUser();
    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUser = async () => {
    const user = supabase.auth.user();
    if (user) {
      setIsLoggedIn(true);
    }
  };

  async function updateSupabaseCookie(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }

  return (
    <div>
      <Head>
        <title>Guitar Practice App</title>
        <meta
          name="description"
          content="a website to help you keep track of your guitar routines!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Navbar user={isLoggedIn} />
      <AnimatePresence exitBeforeEnter initial={true}>
        <Component {...pageProps} />
      </AnimatePresence>
    </div>
  );
}

export default MyApp;
