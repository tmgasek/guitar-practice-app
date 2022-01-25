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
    <nav className="bg-neutral">
      <div className=" max-w-4xl mx-auto px-4 flex mb-2 rounded-box justify-between items-center text-watermelon font-bold">
        <div>
          <Image src={'/guitar-logo.svg'} height={60} width={60} alt="" />
        </div>

        <div className="flex gap-2 md:gap-4 items-center">
          <Link href={'/'}>
            <a className="hover:text-dark">Home</a>
          </Link>
          {!user && (
            <Link href={'/login'}>
              <a className="hover:text-dark">Login</a>
            </Link>
          )}
          {!user && (
            <Link href={'/register'}>
              <a className="hover:text-dark">Register</a>
            </Link>
          )}
          {user && (
            <Link href={'/create'}>
              <a className="hover:text-dark">Create</a>
            </Link>
          )}
          {user && (
            <button
              className="px-2 py-1  rounded-lg text-dark hover:bg-watermelon font-bold"
              onClick={() => logOut()}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
