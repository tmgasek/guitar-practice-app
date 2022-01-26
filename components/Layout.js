import Head from 'next/head';
import React from 'react';

const Layout = ({ children, title }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-4 sm:mt-10 text-sm sm:text-base">
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
