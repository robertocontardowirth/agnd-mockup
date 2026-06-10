# AGND — Mockup UI

Maqueta estática de **AGND**, plataforma de agendamiento online para negocios de servicios en Latinoamérica.

Construida con HTML, CSS y React (vía Babel CDN) sin paso de build — todo corre directo en el navegador.

---

## Páginas

| Archivo | Descripción |
|---|---|
| `AGND Landing.html` | Landing page de marketing |
| `AGND Login.html` | Inicio de sesión |
| `AGND Register.html` | Registro de cliente (flujo 3 pasos) |
| `AGND Recovery.html` | Recuperación de contraseña |
| `AGND App.html` | Shell de la plataforma (dashboard, agenda, clientes) |
| `AGND Contacto.html` | Formulario de contacto |
| `AGND QuienesSomos.html` | Página institucional |
| `AGND Terminos.html` | Términos y condiciones |
| `AGND Privacidad.html` | Política de privacidad |

## Stack

- **React 18** — vía Babel Standalone (no build step)
- **Lucide Icons** — CDN
- **Geist + Sora** — fuentes locales (incluidas en `/fonts`)
- CSS custom properties para theming (light / dark)

## Correr localmente

Los archivos JSX se cargan con `type="text/babel"`, por lo que el navegador necesita un servidor HTTP (no funciona abriendo los archivos directo con `file://`).

```bash
# Python 3
python3 -m http.server 8080
```

Luego abrí `http://localhost:8080/AGND%20Landing.html` en el navegador.

## Estructura

```
/
├── AGND *.html          # Páginas HTML (una por vista)
├── *.jsx                # Componentes React
├── colors_and_type.css  # Tokens de diseño (paleta, tipografía, espaciado)
├── landing.css          # Estilos del sitio de marketing
├── site.css             # Estilos de páginas institucionales
├── auth.css             # Estilos del flujo de autenticación y registro
├── app.css              # Estilos de la plataforma (dashboard)
├── fonts/               # Geist + Sora (TTF)
└── assets/              # Logo e íconos
```
