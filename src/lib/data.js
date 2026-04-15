// Static fallback data (also used as Sanity seed reference)

export const SUCURSALES = [
  {
    _id: 'goajiros',
    nombre: 'Los Goajiros',
    direccion: 'C.C. Goajiros Center, Av. 92 Pedro Melean, PB Local L13',
    ciudad: 'Valencia',
    horario: [
      { dias: 'Mar – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '9:00 AM – 4:00 PM' },
      { dias: 'Lun', horas: '8:00 AM – 3:00 PM' },
    ],
    whatsapp: '+584123621133',
    coordenadas: { lat: 10.162, lng: -67.993 },
    activa: true,
  },
  {
    _id: 'lara',
    nombre: 'Lara',
    direccion: 'Res. Mara PB Local B9, Av. Lara con Farria',
    ciudad: 'Valencia',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '8:30 AM – 2:00 PM' },
    ],
    whatsapp: '+584123621133',
    coordenadas: { lat: 10.170, lng: -68.001 },
    activa: true,
  },
  {
    _id: 'yaracal',
    nombre: 'Yaracal',
    direccion: 'Edif. El Compadrito Local 1, Carretera Panamericana',
    ciudad: 'Yaracal',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '8:00 AM – 12:00 PM' },
    ],
    whatsapp: '+584123621133',
    coordenadas: { lat: 10.682, lng: -68.680 },
    activa: true,
  },
  {
    _id: 'granja',
    nombre: 'La Granja',
    direccion: 'C.C. La Granja, Quinto Local MK-4',
    ciudad: 'Naguanagua',
    horario: [
      { dias: 'Lun – Sáb', horas: '10:00 AM – 8:00 PM' },
      { dias: 'Dom', horas: '10:00 AM – 7:00 PM' },
    ],
    whatsapp: '+584123621133',
    coordenadas: { lat: 10.200, lng: -68.030 },
    activa: true,
  },
  {
    _id: 'moron',
    nombre: 'Morón',
    direccion: 'C.C. Paseo Morón Local PB7, Av. Yaracuy',
    ciudad: 'Morón',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
    ],
    whatsapp: '+584123621133',
    coordenadas: { lat: 10.488, lng: -68.185 },
    activa: true,
  },
  {
    _id: 'freemarket-stand',
    nombre: 'Stand Free Market',
    direccion: 'C.C. Free Market, PB Local CPB-05',
    ciudad: 'Naguanagua',
    horario: [
      { dias: 'Lun – Vie', horas: '8:45 AM – 5:45 PM' },
      { dias: 'Sáb', horas: '8:45 AM – 6:30 PM' },
      { dias: 'Dom', horas: '10:00 AM – 4:00 PM' },
    ],
    whatsapp: '+584123621133',
    coordenadas: { lat: 10.198, lng: -68.032 },
    activa: true,
  },
  {
    _id: 'freemarket-tienda',
    nombre: 'Nuovocell Free Market',
    direccion: 'C.C. Free Market, Nivel E15-16',
    ciudad: 'Naguanagua',
    horario: [
      { dias: 'Lun – Vie', horas: '8:45 AM – 6:00 PM' },
      { dias: 'Sáb', horas: '8:45 AM – 6:30 PM' },
      { dias: 'Dom', horas: '10:00 AM – 4:00 PM' },
    ],
    whatsapp: '+584123621133',
    coordenadas: { lat: 10.198, lng: -68.032 },
    activa: true,
  },
  {
    _id: 'mirimire',
    nombre: 'Mirimire',
    direccion: 'Av. Principal, Sector Las Palmas, Municipio San Francisco',
    ciudad: 'Mirimire',
    horario: [
      { dias: 'Lun – Dom', horas: '8:30 AM – 5:00 PM' },
    ],
    whatsapp: '+584123621133',
    coordenadas: { lat: 10.910, lng: -68.720 },
    activa: true,
  },
];

export const CATEGORIAS = [
  { id: 'todos', label: 'Todos', labelEn: 'All' },
  { id: 'smartphones', label: 'Smartphones', labelEn: 'Smartphones' },
  { id: 'laptops', label: 'Laptops', labelEn: 'Laptops' },
  { id: 'filamentos', label: 'Filamentos', labelEn: 'Filaments' },
  { id: 'repuestos', label: 'Repuestos', labelEn: 'Parts' },
  { id: 'accesorios', label: 'Accesorios', labelEn: 'Accessories' },
  { id: 'internet', label: 'Internet Portátil', labelEn: 'Portable Internet' },
  { id: 'usados', label: 'Usados Cert.', labelEn: 'Certified Used' },
];

export const CATALOGO_SEED = [
  // Smartphones
  { _id: 's1', nombre: 'Honor Play 10 64GB', categoria: 'smartphones', marca: 'Honor', esNuevo: true, disponible: true },
  { _id: 's2', nombre: 'Honor Play 10 128GB', categoria: 'smartphones', marca: 'Honor', esNuevo: true, disponible: true },
  { _id: 's3', nombre: 'Redmi A5 64GB', categoria: 'smartphones', marca: 'Xiaomi / Redmi', disponible: true },
  { _id: 's4', nombre: 'Smart 10 64GB', categoria: 'smartphones', disponible: true },
  { _id: 's5', nombre: 'Tecno Go 2 64GB', categoria: 'smartphones', marca: 'Tecno', disponible: true },
  { _id: 's6', nombre: 'Itel A100C 64GB', categoria: 'smartphones', marca: 'Itel', disponible: true },
  { _id: 's7', nombre: 'Itel City 100 256GB', categoria: 'smartphones', marca: 'Itel', esNuevo: true, disponible: true },
  { _id: 's8', nombre: 'Samsung A16 128GB', categoria: 'smartphones', marca: 'Samsung', disponible: true },
  { _id: 's9', nombre: 'Infinix Hot 60i 256GB', categoria: 'smartphones', marca: 'Infinix', esNuevo: true, disponible: true },
  { _id: 's10', nombre: 'iPhone 17 Pro Max 256GB', categoria: 'smartphones', marca: 'Apple', destacado: true, disponible: true },
  // Laptops
  { _id: 'l1', nombre: 'Dell Latitude 5410', categoria: 'laptops', marca: 'Dell', disponible: true },
  { _id: 'l2', nombre: 'Dell Latitude 5400', categoria: 'laptops', marca: 'Dell', disponible: true },
  { _id: 'l3', nombre: 'Dell Latitude L13', categoria: 'laptops', marca: 'Dell', disponible: true },
  { _id: 'l4', nombre: 'Dell Latitude 5590', categoria: 'laptops', marca: 'Dell', disponible: true },
  { _id: 'l5', nombre: 'Dell E7470', categoria: 'laptops', marca: 'Dell', disponible: true },
  // Internet
  { _id: 'i1', nombre: 'Olax UPS 20.000', categoria: 'internet', esNuevo: true, disponible: true },
];

export const PAGOS = [
  { type: 'svg', icon: 'cash', label: 'Efectivo USD' },
  { type: 'svg', icon: 'zelle', label: 'Zelle' },
  { type: 'svg', icon: 'pagomovil', label: 'Pago Móvil' },
  { type: 'svg', icon: 'binance', label: 'Binance' },
  { type: 'svg', icon: 'card', label: 'Tarjeta' },
];

export const CREDITO = [
  { nombre: 'Cashea',       color: '#F5C300', textColor: '#000', url: 'https://play.google.com/store/apps/details?id=com.cashea.app' },
  { nombre: 'Zona Naranja', color: '#FF6B00', textColor: '#fff', url: 'https://tuzonanaranja.com' },
  { nombre: 'Krece',        color: '#6C3CE1', textColor: '#fff', url: 'https://www.krece.app' },
  { nombre: 'Chollo',       color: '#00C853', textColor: '#fff', url: 'https://chollo.app' },
  { nombre: 'Lysto',        color: '#0057FF', textColor: '#fff', url: 'https://lysto.app' },
];

export const WA_NUMBER = '584123621133';
export const WA_URL = `https://wa.me/${WA_NUMBER}`;
export const INSTAGRAM = 'https://instagram.com/nuovocell';
export const FACEBOOK = 'https://facebook.com/nuovocell';
export const DIGITEL_URL = 'https://digitel.com.ve/planes-paquetes-datos-personas';
