// ServiciosCatalog.jsx — Catálogo canónico de servicios, compartido por la app de
// gestión (app.html) y la página pública de reservas (reservar.html). Es la única
// fuente de verdad de los servicios: así la visibilidad por servicio configurada en
// el admin se refleja en la página de reservas (ambos usan los mismos ids).
//
// Campos:
//   colaboradorId — profesional "a cargo" (lo usa la tabla del admin)
//   pros          — ids de colaboradores que pueden realizar el servicio (página pública)
//   desc          — descripción mostrada al cliente al reservar
//   activo        — si está disponible para reservar

const SERVICIO_CATEGORIAS = ['Cabello', 'Uñas', 'Barbería', 'Estética'];
const SERVICIO_CAT_ICON = { Cabello: 'scissors', 'Uñas': 'hand', 'Barbería': 'scissors', 'Estética': 'sparkles' };

const MOCK_SERVICIOS = [
  { id: 1, nombre: 'Corte de pelo',        categoria: 'Cabello',  colaboradorId: 1, pros: [1, 3], duracion: 45, precio: 18000, activo: true,  desc: 'Lavado, corte y peinado.' },
  { id: 2, nombre: 'Corte + Brushing',     categoria: 'Cabello',  colaboradorId: 1, pros: [1],    duracion: 60, precio: 25000, activo: true,  desc: 'Corte con terminación de brushing.' },
  { id: 3, nombre: 'Coloración completa',  categoria: 'Cabello',  colaboradorId: 1, pros: [1],    duracion: 90, precio: 45000, activo: true,  desc: 'Color completo con productos premium.' },
  { id: 4, nombre: 'Manicure',             categoria: 'Uñas',     colaboradorId: 2, pros: [2],    duracion: 45, precio: 14000, activo: true,  desc: 'Manicure tradicional o semipermanente.' },
  { id: 5, nombre: 'Pedicure',             categoria: 'Uñas',     colaboradorId: 2, pros: [2],    duracion: 60, precio: 17000, activo: true,  desc: 'Pedicure completo con esmaltado.' },
  { id: 6, nombre: 'Corte clásico',        categoria: 'Barbería', colaboradorId: 3, pros: [3],    duracion: 30, precio: 12000, activo: true,  desc: 'Corte clásico de barbería.' },
  { id: 7, nombre: 'Arreglo de barba',     categoria: 'Barbería', colaboradorId: 3, pros: [3],    duracion: 30, precio: 9000,  activo: false, desc: 'Arreglo de barba y perfilado.' },
];

Object.assign(window, { SERVICIO_CATEGORIAS, SERVICIO_CAT_ICON, MOCK_SERVICIOS });
