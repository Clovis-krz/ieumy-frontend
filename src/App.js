import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Footer from './components/Footer.js';
import Contact from './components/Contact.js';
import MainCustomer from './pages/customer.js';
import MainOwner from './pages/owner.js';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={ <p></p>} />
      <Route path="contact" element={<Contact />} />
      <Route path="customer" element={<MainCustomer/>} />
      <Route path="owner" element={<MainOwner/>} />
    </Routes>
    <div className="App">
      
      
      
      <Footer/>
      
    </div>
    </>
  );
}

export default App;
