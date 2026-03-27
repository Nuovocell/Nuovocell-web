import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  apiVersion: process.env.REACT_APP_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// Queries
export const queries = {
  // Todos los productos
  allProducts: `
    *[_type == "producto"] | order(destacado desc, categoria asc) {
      _id, nombre, slug, categoria, marca, descripcion,
      destacado, imagen, disponible, esNuevo, esOferta,
      precio, precioAnterior,
    }
  `,

  // Producto por ID (página de detalle)
  productById: `
    *[_type == "producto" && _id == $id][0] {
      _id, nombre, slug, categoria, marca, descripcion,
      destacado, imagen, disponible, esNuevo, esOferta,
      precio, precioAnterior, precioMin,
    }
  `,

  // Productos relacionados (misma categoría, excluyendo el actual)
  related: `
    *[_type == "producto" && categoria == $categoria && _id != $id][0...4] {
      _id, nombre, marca, imagen, precio, precioMin, disponible,
    }
  `,

  // Sucursales
  allSucursales: `
    *[_type == "sucursal"] | order(nombre asc) {
      _id, nombre, direccion, ciudad, horario, activa, esDigitel,
      "lat": coordenadas.lat,
      "lng": coordenadas.lng,
    }
  `,

  // Productos destacados homepage
  destacados: `
    *[_type == "producto" && destacado == true][0...8] {
      _id, nombre, slug, categoria, marca, imagen, disponible,
      precio, precioAnterior, esNuevo, esOferta,
    }
  `,
};
