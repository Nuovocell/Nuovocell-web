import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Cart from './components/cart/Cart';
import AIAssistant from './components/ai/AIAssistant';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import SucursalesPage from './pages/SucursalesPage';
import ServicioPage from './pages/ServicioPage';

import './styles/globals.css';
import './i18n';

function ScrollToTop() {
  const { pathname } = window.location;
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Cart />
        <AIAssistant />

        <Suspense fallback={<div style={{ height: '100vh', background: '#07070f' }} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/sucursales" element={<SucursalesPage />} />
            <Route path="/servicio-tecnico" element={<ServicioPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: '#12121f',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.07)',
              fontFamily: 'DM Sans, sans-serif',
            },
          }}
        />
      </Router>
    </HelmetProvider>
  );
}

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      paddingTop: '68px',
    }}>
      <p style={{ fontSize: '4rem' }}>📱</p>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800 }}>
        Página no encontrada
      </h1>
      <a href="/" style={{
        background: '#00aaff',
        color: '#07070f',
        padding: '12px 28px',
        borderRadius: '8px',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
      }}>
        Volver al inicio
      </a>
    </div>
  );
}
