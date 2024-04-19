import React from 'react';
import './stylesheets/alignments.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import './stylesheets/text-elements.css';
import './stylesheets/theme.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
