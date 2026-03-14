# Nuovocell — Sitio Web Oficial

Stack: **React 18 + Sanity CMS + Vercel**

## 🚀 Setup inicial

### 1. Clonar e instalar
```bash
git clone https://github.com/nuovocell/nuovocell-web.git
cd nuovocell-web
npm install
```

### 2. Variables de entorno
Copia `.env.example` a `.env` y completa:
```
REACT_APP_SANITY_PROJECT_ID=   # tu project ID de Sanity
REACT_APP_SANITY_DATASET=production
REACT_APP_SANITY_API_VERSION=2024-01-01
```

En Vercel, agrega además:
```
ANTHROPIC_API_KEY=             # para el asistente IA
```

### 3. Configurar Sanity
```bash
npm install -g @sanity/cli
cd sanity
sanity init        # conecta con tu proyecto
sanity deploy      # despliega el Studio
```

Los schemas están en `/sanity/schemas/` — producto y sucursal.

### 4. Cargar datos iniciales en Sanity
Entra al Studio de Sanity y crea:
- Las 8 sucursales (ver `/src/lib/data.js` para los datos)
- Los productos del catálogo con sus precios por sucursal

### 5. Correr en desarrollo
```bash
npm start
```

### 6. Deploy en Vercel
Conecta el repo de GitHub en Vercel, agrega las variables de entorno y despliega.

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── ai/          AIAssistant (chat con IA)
│   ├── cart/        Carrito lateral
│   ├── catalog/     ProductCard
│   ├── layout/      Navbar, Footer
│   └── sections/    Hero
├── pages/
│   ├── HomePage
│   ├── CatalogPage  (filtros por categoría + sucursal)
│   ├── SucursalesPage
│   └── ServicioPage (formulario → WhatsApp)
├── lib/
│   ├── sanity.js    (cliente + queries GROQ)
│   ├── store.js     (Zustand: carrito + UI)
│   └── data.js      (datos estáticos + seed)
├── i18n/            (ES + EN)
└── styles/          (globals.css — design system)

api/
└── chat.js          (proxy Anthropic para IA)

sanity/
└── schemas/         (producto.js, sucursal.js)
```

## 💡 Flujo del catálogo + carrito
1. Productos se cargan desde Sanity (fallback a datos locales)
2. El usuario filtra por categoría o sucursal
3. Al seleccionar sucursal, los precios se actualizan via GROQ
4. El carrito usa Zustand (persiste en localStorage)
5. "Consultar por WhatsApp" genera un mensaje estructurado

## 📞 Contacto
WhatsApp: +58 412-362-1133  
Instagram: @nuovocell
