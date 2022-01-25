import Layout from '../components/Layout';
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

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
    const user = await supabase.auth.user();
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
    <Layout title={'Guitar Practice App'}>
      <Navbar user={isLoggedIn} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
