import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../lib/initSupabase';

const validationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const user = supabase.auth.user();

  useEffect(() => {
    if (user) {
      router.push('/');
      console.log('RAN');
    }
  }, [router, user]);

  const handleLogin = async (data) => {
    //login the user
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
      });
      //if there's an error received from supabase, we throw it to catch it in the catch block.
      if (error) throw error;
    } catch (error) {
      //show error
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async (data) => {
    //login the user
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        provider: 'google',
      });
      //if there's an error received from supabase, we throw it to catch it in the catch block.
      if (error) throw error;
    } catch (error) {
      //show error
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || user) {
    return <div>Login succesful! Redirecting to Home...</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl my-4">Login</h2>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input name="email" type={'email'} {...register('email')} />
        <div>{errors.email?.message}</div>

        <label htmlFor="password">Password</label>
        <input name="password" type={'password'} {...register('password')} />
        <div>{errors.password?.message}</div>

        <button type="submit" className="btn-primary my-4">
          Login
        </button>
      </form>
      <div className="flex gap-4 items-center">
        <h3>Don&apos;t have an account?</h3>
        <Link href={'/register'}>
          <a className="text-watermelon hover:text-white">Register</a>
        </Link>
      </div>
      <div className="text-center my-2">OR</div>
      <button
        onClick={handleLoginWithGoogle}
        className="btn-primary my-4 w-full"
      >
        Login with Google
      </button>
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
