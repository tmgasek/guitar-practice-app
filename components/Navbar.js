import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../lib/initSupabase';

const Navbar = ({ user }) => {
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
    <nav className="flex mb-2 rounded-box justify-between items-center">
      <div>
        <Image src={'/guitar-logo.svg'} height={60} width={60} alt="" />
      </div>

      <div className="flex gap-4">
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
  );
};

export default Navbar;
