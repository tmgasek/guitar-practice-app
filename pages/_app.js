import Layout from '../components/Layout';
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
      checkUser()
    );
    checkUser();
    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  async function checkUser() {
    const user = supabase.auth.user();
    setUser(user);
  }

  return (
    <Layout>
      <Navbar />

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
