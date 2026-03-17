import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartStore, useUIStore } from '../../lib/store';
import './Navbar.css';

const ShoppingBagIcon = () => (
  <img src="/logos/carrito.png" alt="Carrito" style={{ width: '22px', height: '22px', objectFit: 'contain', borderRadius: '50%' }} />
);

const MenuIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { toggleCart } = useUIStore();
  const { mobileMenuOpen, toggleMenu, closeAll } = useUIStore();
  const count = useCartStore(s => s.items.reduce((n, i) => n + i.qty, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { closeAll(); }, [location]);

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');

  const navLinks = [
    { to: '/catalogo', label: t('nav.catalogo') },
    { to: '/catalogo?cat=smartphones', label: t('nav.smartphones') },
    { to: '/catalogo?cat=laptops', label: t('nav.laptops') },
    { to: '/catalogo?cat=accesorios', label: t('nav.accesorios') },
    { to: '/sucursales', label: t('nav.sucursales') },
    { to: '/servicio-tecnico', label: t('nav.servicio') },
  ];

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          {!imgError ? (
            <img
              src="/logo-blanco.png"
              alt="Nuovocell"
              className="navbar__logo-img"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="navbar__logo-text">nuovo<span>cell</span></span>
          )}
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`navbar__link${location.pathname === link.to.split('?')[0] ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button className="navbar__lang" onClick={toggleLang}>
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
          <button className="navbar__cart" onClick={toggleCart} aria-label="Carrito">
            <ShoppingBagIcon />
            {count > 0 && <span className="navbar__cart-count">{count}</span>}
          </button>
          <a
            href="https://wa.me/584123621133"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa navbar__wa"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <button className="navbar__mobile-toggle" onClick={toggleMenu}>
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="navbar__mobile">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="navbar__mobile-link">
              {link.label}
            </Link>
          ))}
          <div className="navbar__mobile-footer">
            <button onClick={toggleLang} className="btn btn-ghost">
              {i18n.language === 'es' ? '🇺🇸 English' : '🇻🇪 Español'}
            </button>
            <a href="https://wa.me/584123621133" className="btn btn-wa" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
