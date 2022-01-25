import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../lib/initSupabase';

const validationSchema = yup.object().shape({
  email: yup.string().required(),
});

const LoginPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const signIn = async (data) => {
    const { error } = await supabase.auth.signIn({
      email: data.email,
    });
    if (error) {
      console.log({ error });
    } else {
      setSubmitted(true);
    }
  };
  if (submitted) {
    return (
      <div>
        <h2>Please check your email to sign in</h2>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit(signIn)}>
        <label htmlFor="email">Email</label>
        <input name="email" type={'email'} {...register('email')} />
        <div>{errors.email?.message}</div>

        <input type="submit" />
      </form>
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
