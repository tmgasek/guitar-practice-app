import { AnimateSharedLayout, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../lib/initSupabase';

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

  const isSelected = (currPath) => {
    if (currPath === router.pathname) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AnimateSharedLayout>
      <nav className="bg-neutral">
        <div className=" max-w-4xl mx-auto px-4 flex mb-2 rounded-box justify-between items-center text-watermelon font-bold">
          <div>
            <Image src={'/guitar-logo.svg'} height={60} width={90} alt="" />
          </div>

          <div className="flex gap-2 md:gap-4 items-center">
            {user && (
              <div>
                <Link href={'/'}>
                  <a className="hover:text-dark">Home</a>
                </Link>
                {isSelected('/') ? (
                  <motion.div
                    className="nav-underline"
                    layoutId="nav-underline"
                  />
                ) : null}
              </div>
            )}

            {!user && (
              <div>
                <Link href={'/login'}>
                  <a className="hover:text-dark">Login</a>
                </Link>
                {isSelected('/login') ? (
                  <motion.div
                    className="nav-underline"
                    layoutId="nav-underline"
                  />
                ) : null}
              </div>
            )}
            {!user && (
              <div>
                <Link href={'/register'}>
                  <a className="hover:text-dark">Register</a>
                </Link>
                {isSelected('/register') ? (
                  <motion.div
                    className="nav-underline"
                    layoutId="nav-underline"
                  />
                ) : null}
              </div>
            )}
            {user && (
              <div>
                <Link href={'/create'}>
                  <a className="hover:text-dark">Create</a>
                </Link>
                {isSelected('/create') ? (
                  <motion.div
                    className="nav-underline"
                    layoutId="nav-underline"
                  />
                ) : null}
              </div>
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
    </AnimateSharedLayout>
  );
};

export default Navbar;
