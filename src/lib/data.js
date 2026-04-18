// Static fallback data (also used as Sanity seed reference)

export const SUCURSALES = [
  {
    _id: 'free-market-digitel',
    nombre: 'Free Market – Digitel Principal',
    direccion: 'C.C. Free Market, local S-01, Naguanagua, Edo. Carabobo',
    ciudad: 'Naguanagua',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '9:00 AM – 3:00 PM' },
    ],
    whatsapp: '+584123621133',
    coordenadas: { lat: 10.114, lng: -67.998 },
    activa: true,
  },
  {
    _id: 'free-market-principal',
    nombre: 'Free Market – Nuovocell (Principal / Repair)',
    direccion: 'Av. Universidad, Urb. La Granja, C.C. Free Market, locales E15-E16, Naguanagua, Edo. Carabobo',
    ciudad: 'Naguanagua',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '9:00 AM – 3:00 PM' },
    ],
    whatsapp: '+584121992233',
    coordenadas: { lat: 10.114, lng: -67.998 },
    activa: true,
  },
  {
    _id: 'free-market-stand',
    nombre: 'Free Market – Stand',
    direccion: 'Av. Universidad, Urb. La Granja, C.C. Free Market, local CPB-05, Naguanagua, Edo. Carabobo',
    ciudad: 'Naguanagua',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '9:00 AM – 3:00 PM' },
    ],
    whatsapp: '+584123621153',
    coordenadas: { lat: 10.114, lng: -67.998 },
    activa: true,
  },
  {
    _id: 'la-granja',
    nombre: 'C.C. La Granja (Digitel Oficial)',
    direccion: 'Av. Principal, C.C. Free Market, nivel PB, local E-158, Urb. La Granja, Naguanagua, Edo. Carabobo',
    ciudad: 'Naguanagua',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '9:00 AM – 3:00 PM' },
    ],
    whatsapp: '+584127270505',
    coordenadas: { lat: 10.114, lng: -67.998 },
    activa: true,
  },
  {
    _id: 'lara',
    nombre: 'Avenida Lara',
    direccion: 'Av. Lara cruce con Av. Farriar, Res. Mara, Planta Baja, Local N° 9, Valencia, Edo. Carabobo',
    ciudad: 'Valencia',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '8:30 AM – 2:00 PM' },
    ],
    whatsapp: '+584121406969',
    coordenadas: { lat: 10.170, lng: -68.001 },
    activa: true,
  },
  {
    _id: 'goajiros',
    nombre: 'Goajiros Center',
    direccion: 'C.C. Goajiros Center, planta baja, local L13, parroquia Santa Rosa, Valencia, Edo. Carabobo',
    ciudad: 'Valencia',
    horario: [
      { dias: 'Mar – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '9:00 AM – 4:00 PM' },
      { dias: 'Lun', horas: '8:00 AM – 3:00 PM' },
    ],
    whatsapp: '+584121408000',
    coordenadas: { lat: 10.162, lng: -67.993 },
    activa: true,
  },
  {
    _id: 'moron',
    nombre: 'Morón',
    direccion: 'Av. Yaracuy, Sector La Encrucijada, C.C. Paseo Morón, local PB07, Morón, Edo. Carabobo',
    ciudad: 'Morón',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '9:00 AM – 3:00 PM' },
    ],
    whatsapp: '+584123700741',
    coordenadas: { lat: 10.488, lng: -68.188 },
    activa: true,
  },
  {
    _id: 'yaracal',
    nombre: 'Yaracal',
    direccion: 'Centro de Yaracal, Edificio El Compadrito, local 1 (antiguo Banesco), Municipio Cacique Manaure, Estado Falcón',
    ciudad: 'Yaracal',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '9:00 AM – 3:00 PM' },
    ],
    whatsapp: '+584129001815',
    coordenadas: { lat: 10.972, lng: -68.757 },
    activa: true,
  },
  {
    _id: 'mirimire',
    nombre: 'Mirimire',
    direccion: 'Avenida Principal de Mirimire, Municipio San Francisco, Estado Falcón',
    ciudad: 'Mirimire',
    horario: [
      { dias: 'Lun – Sáb', horas: '8:00 AM – 5:00 PM' },
      { dias: 'Dom', horas: '9:00 AM – 3:00 PM' },
    ],
    whatsapp: '+584226868610',
    coordenadas: { lat: 11.157, lng: -68.725 },
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
  { icon: 'cash',         label: 'Efectivo USD' },
  { icon: 'pagomovil',    label: 'Pago Móvil' },
  { icon: 'zinli',        label: 'Zinli' },
  { icon: 'mercantil',    label: 'Mercantil Panamá' },
  { icon: 'banesco',      label: 'Banesco Panamá' },
  { icon: 'transferencia',label: 'Transferencia' },
  { icon: 'binance',      label: 'Binance' },
  { icon: 'card',         label: 'Tarjeta' },
];

export const CREDITO = [
  { nombre: 'Cashea',           color: '#F5C300', textColor: '#000', url: 'https://play.google.com/store/apps/details?id=com.cashea.app' },
  { nombre: 'Chollo',   color: '#0033CC', textColor: '#fff', url: 'https://chollo.app' },
  { nombre: 'Krece',            color: '#29C5CC', textColor: '#000', url: 'https://www.krece.app' },
  { nombre: 'Weppa',            color: '#6C3CE1', textColor: '#fff', url: 'https://weppa.app' },
];

export const WA_NUMBER = '584123621133';
export const WA_URL = `https://wa.me/${WA_NUMBER}`;
export const INSTAGRAM = 'https://instagram.com/nuovocell';
export const FACEBOOK = 'https://facebook.com/nuovocell';
export const DIGITEL_URL = 'https://digitel.com.ve/planes-paquetes-datos-personas';
