import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
      <nav>
        <div>
          <Link href={'/'}>
            <a>Home</a>
          </Link>
          <Link href={'/login'}>
            <a>Login</a>
          </Link>
          <Link href={'/register'}>
            <a>Register</a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
