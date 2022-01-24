import Layout from '../components/Layout';
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //fires when user signs in / out
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        updateSupabaseCookie(event, session);
        if (event === 'SIGNED_IN') {
          setIsLoggedIn(true);
        }
        if (event === 'SIGNED_OUT') {
          setIsLoggedIn(false);
        }
      }
    );
    checkUser();
    return () => {
      authListener?.unsubscribe();
    };
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
