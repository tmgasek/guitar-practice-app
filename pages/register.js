import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { supabase } from '../lib/initSupabase';

const RegisterPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const emailEl = useRef();
  const passwordEl = useRef();
  const confirmPasswordEl = useRef();

  const handleRegister = async () => {
    const { value: email } = emailEl.current;
    const { value: password } = passwordEl.current;
    const { value: confirmPassword } = confirmPasswordEl.current;

    if (password !== confirmPassword) {
      //show error
      console.log('password mismatch!');
      return;
    }
    //create the user with supabase
    try {
      setLoading(true);
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      //if there's an error received from supabase, we throw it to catch it in the catch block.
      if (error) throw error;
      router.push('/login');
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
          <input
            type="password"
            placeholder="confirm password"
            ref={confirmPasswordEl}
          />
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Register'}</span>
          </button>
        </div>
        <div>
          <h4>Already registered?</h4>
          <Link href={'/login'}>
            <a>Log in</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
