import { supabase } from '../lib/initSupabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader, Layout } from '../components';

const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
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
    }
  }, [router, user]);

  const handleLogin = async (data) => {
    //login the user
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn(
        data
          ? {
              email: data.email,
              password: data.password,
            }
          : { provider: 'google' }
      );
      //if there's an error received from supabase, we throw it to catch it in the catch block.
      if (error) {
        throw error;
      }
    } catch (error) {
      //show error
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //conditinally rendering the loading as if we don't, the toastify component will not persist and can't show error.
  return (
    <Layout title={'Login'}>
      <div className="max-w-lg mx-auto">
        <ToastContainer />
        {loading || user ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <h2 className="text-2xl my-4">Login</h2>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col"
            >
              <label htmlFor="email">Email</label>
              <input name="email" type={'email'} {...register('email')} />
              <div className="error">{errors.email?.message}</div>

              <label htmlFor="password">Password</label>
              <input
                name="password"
                type={'password'}
                {...register('password')}
              />
              <div className="error">{errors.password?.message}</div>

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
              onClick={() => handleLogin()}
              className="btn-primary my-4 w-full"
            >
              Login with Google
            </button>
          </>
        )}
      </div>
    </Layout>
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
