import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, isAuthenticated, setIsAuthenticated }) => {
    return (
        <div>
            <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <main className="container my-5">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;