import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title || 'Guitar Practice App'}</title>
      </Head>

      <div className="max-w-4xl mx-auto px-4 mt-4 sm:mt-10 text-sm sm:text-base">
        <motion.main
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
