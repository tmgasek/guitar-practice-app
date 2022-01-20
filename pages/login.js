import Link from 'next/link';
import { useState } from 'react';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (email, password) => {
    console.log(email, password);
  };

  return (
    <div>
      <div>
        <h1>Supabase + Next.js</h1>
        <p>Sign in via magic link with your email below</p>
        <div>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
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
