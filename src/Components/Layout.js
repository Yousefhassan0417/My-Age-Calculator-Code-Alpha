import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Main from '../Pages/Main';
import Home from '../Pages/Home';
import HowToUse from '../Pages/HowToUse';
import About from '../Pages/About';

function Layout() {
  return (
    <>
      <Header />
      <Home />
      <Main />
      <HowToUse />
      <About />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;

