import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/initSupabase';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const emailEl = useRef();
  const passwordEl = useRef();

  const handleLogin = async () => {
    const { value: email } = emailEl.current;
    const { value: password } = passwordEl.current;

    //login the user
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        email,
        password,
      });
      //if there's an error received from supabase, we throw it to catch it in the catch block.
      if (error) throw error;
      router.push('/');
    } catch (error) {
      //show error
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          <input type="email" placeholder="Your email" ref={emailEl} />
        </div>
        <div>
          <input type="password" placeholder="password" ref={passwordEl} />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Log In'}</span>
          </button>
        </div>
        <div>
          <h4>Don&apos;t have an account?</h4>
          <Link href={'/register'}>
            <a>Register</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: '/' } };
  }

  return { props: {} };
}
