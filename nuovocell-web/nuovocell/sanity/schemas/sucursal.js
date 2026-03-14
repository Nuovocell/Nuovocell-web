export default {
  name: 'sucursal',
  title: 'Sucursal',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre de la sucursal',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'direccion',
      title: 'Dirección completa',
      type: 'text',
      rows: 2,
    },
    {
      name: 'ciudad',
      title: 'Ciudad',
      type: 'string',
    },
    {
      name: 'horario',
      title: 'Horario',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'dias', title: 'Días', type: 'string' },
            { name: 'horas', title: 'Horas', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'whatsapp',
      title: 'WhatsApp (con código de país)',
      type: 'string',
      initialValue: '+584123621133',
    },
    {
      name: 'coordenadas',
      title: 'Coordenadas GPS',
      type: 'object',
      fields: [
        { name: 'lat', title: 'Latitud', type: 'number' },
        { name: 'lng', title: 'Longitud', type: 'number' },
      ],
    },
    {
      name: 'activa',
      title: 'Sucursal activa',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'esDigitel',
      title: 'Agente Digitel',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'ciudad' },
  },
};
