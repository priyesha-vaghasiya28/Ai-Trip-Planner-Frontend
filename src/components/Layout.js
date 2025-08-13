import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="container my-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
