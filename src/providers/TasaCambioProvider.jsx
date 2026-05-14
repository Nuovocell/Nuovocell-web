import { useEffect } from 'react';
import { client } from '../lib/sanity';
import { useTasaStore } from '../lib/store';

const TASA_QUERY = '*[_type == "configuracion"][0]{ tasaCambio, mostrarBs, labelMoneda }';

export function TasaCambioProvider({ children }) {
  const setTasa = useTasaStore(s => s.setTasa);

  useEffect(() => {
    client.fetch(TASA_QUERY).then(data => {
      if (data) {
        setTasa(
          data.tasaCambio || null,
          data.mostrarBs !== false,
          data.labelMoneda || 'Bs.'
        );
      }
    }).catch(err => {
      console.warn('[TasaCambio] No se pudo cargar la tasa:', err.message);
    });
  }, [setTasa]);

  return children;
}
