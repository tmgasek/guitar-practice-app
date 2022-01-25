import Link from 'next/link';
import { supabase } from '../lib/initSupabase';
import { useRouter } from 'next/router';

const Navbar = ({ user }) => {
  const router = useRouter();

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      // show error
      console.log(error);
    }
  };

  return (
    <div>
      <nav>
        <div>
          <Link href={'/'}>
            <a>Home</a>
          </Link>
          {!user && (
            <Link href={'/login'}>
              <a>Login</a>
            </Link>
          )}
          {!user && (
            <Link href={'/register'}>
              <a>Register</a>
            </Link>
          )}
          {user && (
            <Link href={'/create'}>
              <a>Create</a>
            </Link>
          )}
          {user && <button onClick={() => logOut()}>Log Out</button>}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
