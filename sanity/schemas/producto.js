export default {
  name: 'producto',
  title: 'Producto',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre del producto',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nombre' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Smartphones', value: 'smartphones' },
          { title: 'Laptops', value: 'laptops' },
          { title: 'Accesorios', value: 'accesorios' },
          { title: 'Tablets', value: 'tablets' },
          { title: 'Internet Portátil', value: 'internet' },
          { title: 'Usados Certificados', value: 'usados' },
          { title: 'Repuestos', value: 'repuestos' },
          { title: 'Filamentos', value: 'filamentos' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'marca',
      title: 'Marca',
      type: 'string',
      options: {
        list: ['Apple', 'Samsung', 'Xiaomi / Redmi', 'Honor', 'Infinix', 'Tecno', 'Itel', 'Huawei', 'Dell', 'HP', 'Lenovo', 'Otro'],
      },
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    },
    {
      name: 'imagen',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'imagenes',
      title: 'Galería de imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'especificaciones',
      title: 'Especificaciones técnicas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'clave', title: 'Característica', type: 'string' },
            { name: 'valor', title: 'Valor', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'precio',
      title: 'Precio (USD)',
      type: 'number',
    },
    {
      name: 'precioAnterior',
      title: 'Precio anterior - tachado (opcional)',
      type: 'number',
    },
    {
      name: 'orden',
      title: 'Orden en catálogo',
      type: 'number',
      description: 'Número para ordenar en el catálogo. Menor número = aparece primero.',
    },
    {
      name: 'disponible',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'destacado',
      title: 'Producto destacado (homepage)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'esOferta',
      title: 'En oferta',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'esNuevo',
      title: 'Nuevo ingreso',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'categoria',
      media: 'imagen',
    },
  },
};export default {
  name: 'producto',
  title: 'Producto',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre del producto',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nombre' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Smartphones', value: 'smartphones' },
          { title: 'Laptops', value: 'laptops' },
          { title: 'Accesorios', value: 'accesorios' },
          { title: 'Tablets', value: 'tablets' },
          { title: 'Internet Portátil', value: 'internet' },
          { title: 'Usados Certificados', value: 'usados' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'marca',
      title: 'Marca',
      type: 'string',
      options: {
        list: ['Apple', 'Samsung', 'Xiaomi / Redmi', 'Honor', 'Infinix', 'Tecno', 'Itel', 'Huawei', 'Dell', 'HP', 'Lenovo', 'Otro'],
      },
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    },
    {
      name: 'imagen',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'imagenes',
      title: 'Galería de imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'especificaciones',
      title: 'Especificaciones técnicas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'clave', title: 'Característica', type: 'string' },
            { name: 'valor', title: 'Valor', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'precio',
      title: 'Precio (USD)',
      type: 'number',
    },
    {
      name: 'precioAnterior',
      title: 'Precio anterior — tachado (opcional)',
      type: 'number',
    },
    {
      name: 'disponible',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'destacado',
      title: 'Producto destacado (homepage)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'esOferta',
      title: 'En oferta',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'esNuevo',
      title: 'Nuevo ingreso',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'categoria',
      media: 'imagen',
    },
  },
};
