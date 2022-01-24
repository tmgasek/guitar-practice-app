import Head from 'next/head';
import React from 'react';

const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
