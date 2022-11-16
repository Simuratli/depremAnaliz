import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChartsPage, MainPage } from './Pages';
import { Navbar } from './components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Navbar />
      </div>
      <Routes>
        <Route
          path='/'
          element={<MainPage />}
        />
        <Route
          path='/chart'
          element={<ChartsPage />}
        />
      </Routes>
    </BrowserRouter>
  </>
);
