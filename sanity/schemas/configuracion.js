export default {
  name: 'configuracion',
  title: 'Configuración',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'tasaCambio',
      title: 'Tasa de cambio (Bs. por $1)',
      type: 'number',
      description: 'Actualiza este valor cada día con la tasa del BCV o la que uses',
      validation: Rule => Rule.required().positive(),
    },
    {
      name: 'mostrarBs',
      title: 'Mostrar precios en Bolívares',
      type: 'boolean',
      description: 'Activar/desactivar la conversión de precios en la página',
      initialValue: true,
    },
    {
      name: 'labelMoneda',
      title: 'Etiqueta de la moneda',
      type: 'string',
      description: 'Ej: Bs., BS.D, Bs.S',
      initialValue: 'Bs.',
    },
  ],
  preview: {
    select: { tasa: 'tasaCambio' },
    prepare({ tasa }) {
      return { title: `Tasa del día: Bs. ${tasa || '—'} por $1` };
    },
  },
};
