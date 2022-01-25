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
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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

  if (loading) {
    return <div>Login succesful! Redirecting to Home...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor="email">Email</label>
        <input name="email" type={'email'} {...register('email')} />
        <div>{errors.email?.message}</div>

        <label htmlFor="password">Password</label>
        <input name="password" type={'password'} {...register('password')} />
        <div>{errors.password?.message}</div>

        <input type="submit" />
      </form>
      <div>
        <h4>Don&apos;t have an account?</h4>
        <Link href={'/register'}>
          <a>Register</a>
        </Link>
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
