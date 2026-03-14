import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { client, queries } from '../lib/sanity';
import { CATALOGO_SEED, CATEGORIAS } from '../lib/data';
import ProductCard from '../components/catalog/ProductCard';
import './CatalogPage.css';

const SearchIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

export default function CatalogPage() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const activeCat = searchParams.get('cat') || 'todos';

  // Load all products from Sanity, fallback to seed
  useEffect(() => {
    setLoading(true);
    client.fetch(queries.allProducts)
      .then(data => {
        setProducts(data && data.length ? data : CATALOGO_SEED);
      })
      .catch(() => setProducts(CATALOGO_SEED))
      .finally(() => setLoading(false));
  }, []);

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'todos') params.delete('cat');
    else params.set('cat', cat);
    setSearchParams(params);
  };

  const filtered = useMemo(() => {
    let res = [...products];

    if (activeCat !== 'todos') {
      res = res.filter(p => p.categoria === activeCat);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        (p.marca && p.marca.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') res.sort((a, b) => (a.precioMin ?? 9999) - (b.precioMin ?? 9999));
    if (sortBy === 'price-desc') res.sort((a, b) => (b.precioMin ?? 0) - (a.precioMin ?? 0));
    if (sortBy === 'name') res.sort((a, b) => a.nombre.localeCompare(b.nombre));

    return res;
  }, [products, activeCat, search, sortBy]);

  return (
    <main className="catalog-page">
      <div className="container">
        {/* Header */}
        <div className="catalog-page__header">
          <div>
            <div className="section-label">{t('catalog.title')}</div>
            <h1 className="section-title">{t('catalog.subtitle')}</h1>
          </div>
          <p className="catalog-page__count">{filtered.length} productos</p>
        </div>

        {/* Controls */}
        <div className="catalog-page__controls">
          {/* Search */}
          <div className="catalog-page__search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar producto o marca..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Sort */}
          <select className="catalog-page__select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="default">Ordenar: Relevancia</option>
            <option value="price-asc">Precio: Menor a mayor</option>
            <option value="price-desc">Precio: Mayor a menor</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>

        {/* Category tabs */}
        <div className="catalog-page__cats">
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              className={`catalog-page__cat${activeCat === cat.id ? ' active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {i18n.language === 'es' ? cat.label : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="catalog-page__grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '320px' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="catalog-page__empty">
            <p>🔍 No encontramos productos con esa búsqueda.</p>
            <button className="btn btn-outline" onClick={() => { setSearch(''); setCategory('todos'); }}>
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="catalog-page__grid">
            {filtered.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
