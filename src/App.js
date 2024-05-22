import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header'; 
import Layout from './Components/Layout'; 
import Main from './Pages/Main';
import HowToUse from './Pages/HowToUse'; 
import Footer from './Components/Footer';
import './App.css';
import About from './Pages/About';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/header' element={<Header />} /> 
          <Route path='/main'   element={<Main />} /> 
          <Route path='/how-to-use' element={<HowToUse />} /> 
          <Route path='/about' element={<About />} />
          <Route path='/Footer' element={<Footer />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;





