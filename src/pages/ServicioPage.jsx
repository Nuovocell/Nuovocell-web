import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SUCURSALES } from '../lib/data';
import './ServicioPage.css';

/* Iconos SVG consistentes */
const IconScreen = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"/>
  </svg>
);
const IconBattery = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><line x1="6" y1="12" x2="12" y2="12"/>
  </svg>
);
const IconCode = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconDroplet = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
  </svg>
);
const IconPlug = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 6L6 18M9 3v4m6-4v4M3 9h4m10 0h4M5 19l2 2M17 5l2 2"/>
  </svg>
);
const IconSearch = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const IconCheck = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);
const IconShield = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconZap = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const SERVICIOS = [
  { id: 'pantalla', Icon: IconScreen,  label: 'Cambio de pantalla' },
  { id: 'bateria',  Icon: IconBattery, label: 'Cambio de batería' },
  { id: 'software', Icon: IconCode,    label: 'Actualización / Flasheo' },
  { id: 'agua',     Icon: IconDroplet, label: 'Daño por agua' },
  { id: 'carga',    Icon: IconPlug,    label: 'Puerto de carga' },
  { id: 'general',  Icon: IconSearch,  label: 'Diagnóstico general' },
];

const INFO_BOXES = [
  { Icon: IconCheck,  title: 'Diagnóstico gratuito',      sub: 'Revisamos tu equipo sin costo' },
  { Icon: IconShield, title: 'Garantía en reparaciones',  sub: 'Respaldamos nuestro trabajo' },
  { Icon: IconZap,    title: 'Reparaciones express',      sub: 'Muchas reparaciones en el día' },
];

export default function ServicioPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    nombre: '', telefono: '', equipo: '', problema: '', sucursal: '', servicio: ''
  });

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.nombre || !form.equipo || !form.problema) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    const suc = SUCURSALES.find(s => s._id === form.sucursal);
    const msg = `Solicitud de Servicio Técnico\n\n` +
      `Nombre: ${form.nombre}\n` +
      `Teléfono: ${form.telefono || 'No indicado'}\n` +
      `Equipo: ${form.equipo}\n` +
      `Servicio: ${form.servicio || 'No especificado'}\n` +
      `Sucursal: ${suc?.nombre || 'No especificada'}\n\n` +
      `Problema:\n${form.problema}`;

    window.open(`https://wa.me/584123621133?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main className="serv-page">
      <div className="container">
        {/* Header */}
        <div className="serv-page__header">
          <div className="section-label">{t('servicios.label')}</div>
          <h1 className="section-title">
            {t('servicios.title')} <span>{t('servicios.subtitle')}</span>
          </h1>
          <p className="serv-page__sub">
            Reparamos smartphones y dispositivos de todas las marcas.{' '}
            <strong className="serv-page__sub--highlight">{t('servicios.diag_gratis')}</strong>
          </p>
        </div>

        <div className="serv-page__layout">
          {/* Left — services + info */}
          <div className="serv-page__left">
            <p className="serv-page__section-title">¿Qué reparamos?</p>
            <div className="serv-grid">
              {SERVICIOS.map(({ id, Icon, label }) => (
                <div
                  key={id}
                  className={`serv-item card${form.servicio === label ? ' serv-item--active' : ''}`}
                  onClick={() => setForm(p => ({ ...p, servicio: label }))}
                >
                  <span className="serv-item__icon"><Icon /></span>
                  <span className="serv-item__label">{label}</span>
                </div>
              ))}
            </div>

            {/* Info boxes */}
            <div className="serv-info-boxes">
              {INFO_BOXES.map(({ Icon, title, sub }) => (
                <div key={title} className="serv-info-box">
                  <span className="serv-info-box__icon"><Icon /></span>
                  <div>
                    <p className="serv-info-box__title">{title}</p>
                    <p className="serv-info-box__sub">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="serv-page__form card">
            <p className="serv-page__form-title">{t('servicios.form_title')}</p>

            <div className="serv-form">
              <div className="serv-form__field">
                <label>{t('servicios.nombre')} <span className="serv-form__req">*</span></label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="serv-form__field">
                <label>{t('servicios.telefono')}</label>
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+58 412 000 0000"
                  type="tel"
                />
              </div>

              <div className="serv-form__field">
                <label>{t('servicios.equipo')} <span className="serv-form__req">*</span></label>
                <input
                  name="equipo"
                  value={form.equipo}
                  onChange={handleChange}
                  placeholder="Ej: iPhone 13, Samsung A54..."
                />
              </div>

              <div className="serv-form__field">
                <label>{t('servicios.tipo_servicio')}</label>
                <select name="servicio" value={form.servicio} onChange={handleChange}>
                  <option value="">{t('servicios.seleccionar')}</option>
                  {SERVICIOS.map(s => (
                    <option key={s.id} value={s.label}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="serv-form__field">
                <label>{t('servicios.sucursal')}</label>
                <select name="sucursal" value={form.sucursal} onChange={handleChange}>
                  <option value="">{t('servicios.sel_sucursal')}</option>
                  {SUCURSALES.map(s => (
                    <option key={s._id} value={s._id}>{s.nombre} — {s.ciudad}</option>
                  ))}
                </select>
              </div>

              <div className="serv-form__field serv-form__field--full">
                <label>{t('servicios.problema')} <span className="serv-form__req">*</span></label>
                <textarea
                  name="problema"
                  value={form.problema}
                  onChange={handleChange}
                  placeholder="Cuéntanos qué le pasa a tu equipo..."
                  rows={4}
                />
              </div>

              <button className="btn btn-wa serv-form__submit" onClick={handleSubmit}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enviar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
