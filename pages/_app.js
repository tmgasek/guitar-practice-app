import Layout from '../components/Layout';
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    //fires when user signs in / out
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        updateSupabaseCookie(event, session);
        checkUser();
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
      setLoggedInUser(user);
    } else {
      setLoggedInUser(null);
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
      <Navbar user={loggedInUser} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
