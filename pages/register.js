import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleRegister = async (data) => {
    //create the user with supabase
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      //if there's an error received from supabase, we throw it to catch it in the catch block.
      if (error) throw error;
      router.push('/login');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Registering... Redirecting to login if successful...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <label htmlFor="email">Email</label>
        <input name="email" type={'email'} {...register('email')} />
        <div>{errors.email?.message}</div>

        <label htmlFor="password">Password</label>
        <input name="password" type={'password'} {...register('password')} />
        <div>{errors.password?.message}</div>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          name="confirmPassword"
          type={'password'}
          {...register('confirmPassword')}
        />
        <div>{errors.confirmPassword?.message}</div>

        <input type="submit" />
      </form>
      <div>
        <h3>
          Already have an account?{' '}
          <Link href={'/login'}>
            <a>
              <button>Go to Login</button>
            </a>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default RegisterPage;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return { props: {}, redirect: { destination: '/' } };
  }
  return { props: {} };
}
