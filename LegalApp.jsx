// LegalApp.jsx — render Términos & Privacidad with shared chrome + TOC

function LegalApp({ kind }) {
  const doc = kind === 'privacy' ? PRIVACY_DOC : TERMS_DOC;
  const [active, setActive] = React.useState(doc.sections[0].id);

  React.useEffect(() => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();

    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.target.offsetTop - b.target.offsetTop);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
    doc.sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [doc]);

  return (
    <>
      <SiteNav active={kind === 'privacy' ? 'privacy' : 'terms'} />

      <header className="page-header tinted">
        <div className="container-1280">
          <div className="eyebrow-row">{doc.eyebrow}</div>
          <h1 dangerouslySetInnerHTML={{ __html: doc.title }} />
          <p className="lead">{doc.lead}</p>
          <div className="meta-row">
            <div><span className="meta-key">Última actualización</span><span className="meta-val">{doc.updated}</span></div>
            <div><span className="meta-key">Versión</span><span className="meta-val">{doc.version}</span></div>
            <div><span className="meta-key">Vigencia</span><span className="meta-val">Inmediata</span></div>
            <div><span className="meta-key">Jurisdicción</span><span className="meta-val">Chile</span></div>
          </div>
        </div>
      </header>

      <section>
        <div className="container-1280">
          <div className="legal-layout">
            <nav className="legal-toc" aria-label="Tabla de contenidos">
              <div className="toc-eyebrow">Contenido</div>
              <ol>
                {doc.sections.map(s => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={active === s.id ? 'active' : ''}>{s.title}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="legal-body">
              {doc.sections.map((s, i) => (
                <section id={s.id} key={s.id}>
                  <h2><span className="num">{String(i+1).padStart(2,'0')}</span>{s.title}</h2>
                  {s.body}
                </section>
              ))}

              <div className="legal-end">
                <div>
                  <h4>¿Dudas sobre este documento?</h4>
                  <p>Escríbenos y te respondemos en menos de 24 horas hábiles.</p>
                </div>
                <div className="end-actions">
                  <a href="AGND Contacto.html" className="btn-end primary">Contactar a AGND <i data-lucide="arrow-right" style={{ width: 14, height: 14 }}></i></a>
                  <a href={kind === 'privacy' ? 'AGND Terminos.html' : 'AGND Privacidad.html'} className="btn-end ghost">
                    Ver {kind === 'privacy' ? 'Términos' : 'Privacidad'}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

/* ============== TERMS DOC ============== */
const Callout = ({ children, icon = 'info' }) => (
  <div className="legal-callout">
    <div className="callout-icon"><i data-lucide={icon} style={{ width: 14, height: 14 }}></i></div>
    <p>{children}</p>
  </div>
);

const TERMS_DOC = {
  eyebrow: 'Términos y Condiciones de Uso',
  title: 'Las reglas del <span class="accent">juego.</span>',
  lead: 'Este documento explica, en lenguaje claro, los términos bajo los cuales puedes usar AGND. Lo leemos juntos para evitar sorpresas.',
  updated: '15 de abril de 2026',
  version: 'v3.2',
  sections: [
    { id: 'aceptacion', title: 'Aceptación de los términos', body: (
      <>
        <p>Al crear una cuenta o usar los servicios de AGND.CL SpA ("AGND", "nosotros"), aceptas quedar sujeto a estos Términos y Condiciones. Si usas AGND en nombre de una empresa, declaras que tienes autoridad para obligar a esa empresa.</p>
        <p>Si no estás de acuerdo con alguno de los puntos, te pedimos que no uses la plataforma.</p>
        <Callout icon="info">Estos términos forman, junto con nuestra <a href="AGND Privacidad.html">Política de Privacidad</a>, el contrato completo entre tú y AGND.</Callout>
      </>
    )},
    { id: 'cuenta', title: 'Tu cuenta', body: (
      <>
        <p>Para usar AGND necesitas una cuenta. Eres responsable de:</p>
        <ul>
          <li>Mantener la confidencialidad de tu contraseña.</li>
          <li>Toda actividad realizada bajo tu cuenta.</li>
          <li>Avisarnos a <a href="mailto:soporte@agnd.cl">soporte@agnd.cl</a> si detectas un acceso no autorizado.</li>
          <li>Que la información que entregas sea verdadera, exacta y actualizada.</li>
        </ul>
        <p>Puedes cerrar tu cuenta cuando quieras desde Configuración → Cuenta. Nosotros podemos suspenderla si detectamos fraude, abuso o incumplimiento de estos términos.</p>
      </>
    )},
    { id: 'planes-pagos', title: 'Planes, pagos y facturación', body: (
      <>
        <p><strong>Plan gratuito.</strong> AGND ofrece un plan gratuito sin tarjeta. Sus límites están publicados en la página de <a href="AGND Landing.html#pricing">Precios</a>.</p>
        <p><strong>Planes de pago.</strong> Los planes pagados se facturan mensual o anualmente, en pesos chilenos (CLP) más IVA cuando corresponda. La renovación es automática salvo que canceles antes del próximo ciclo.</p>
        <p><strong>Cancelación.</strong> Puedes cancelar en cualquier momento. Mantienes el acceso hasta el final del período pagado. No hacemos reembolsos por períodos parciales, salvo lo exigido por la ley chilena.</p>
        <p><strong>Cambios de precio.</strong> Te avisaremos con al menos 30 días de anticipación por email.</p>
      </>
    )},
    { id: 'uso-aceptable', title: 'Uso aceptable', body: (
      <>
        <p>AGND es una herramienta para que negocios reciban reservas y gestionen clientes. <strong>No</strong> está permitido usar la plataforma para:</p>
        <ul>
          <li>Actividades ilegales según la legislación chilena.</li>
          <li>Enviar spam, contenido engañoso o phishing.</li>
          <li>Subir contenido que vulnere derechos de terceros.</li>
          <li>Vulnerar la seguridad: ingeniería inversa, scraping masivo o ataques.</li>
          <li>Suplantar a otra persona o empresa.</li>
          <li>Recolectar datos de otros usuarios sin consentimiento.</li>
        </ul>
        <p>El incumplimiento puede llevar a suspensión inmediata sin reembolso.</p>
      </>
    )},
    { id: 'contenido', title: 'Tu contenido', body: (
      <>
        <p>Los textos, fotos, datos de clientes y cualquier información que subas a AGND son y siguen siendo <strong>tuyos</strong>. Tú nos otorgas una licencia limitada, mundial y no exclusiva, exclusivamente para alojar, mostrar y procesar ese contenido con el fin de prestarte el servicio.</p>
        <p>Puedes exportar tus datos en formato CSV o JSON desde Configuración → Datos en cualquier momento, incluso si cancelaste.</p>
      </>
    )},
    { id: 'disponibilidad', title: 'Disponibilidad del servicio', body: (
      <>
        <p>Nos esforzamos por ofrecer un servicio estable y disponible 24/7. AGND ofrece un objetivo de disponibilidad del <code>99,9%</code> mensual en planes pagados, con créditos de servicio si no se cumple (ver <a href="#">SLA</a>).</p>
        <p>Podemos hacer mantenciones programadas, avisando con anticipación cuando sea posible.</p>
      </>
    )},
    { id: 'propiedad', title: 'Propiedad intelectual', body: (
      <>
        <p>El software, marca, logo (incluido el mosaico) e interfaz de AGND son propiedad de AGND.CL SpA o sus licenciantes. No se transfiere ningún derecho de propiedad por el uso del servicio.</p>
        <p>Está prohibido copiar, modificar o distribuir nuestro software sin autorización escrita.</p>
      </>
    )},
    { id: 'limitacion', title: 'Limitación de responsabilidad', body: (
      <>
        <p>En la máxima medida permitida por la ley, AGND no será responsable por daños indirectos, lucro cesante o pérdida de datos derivados del uso del servicio.</p>
        <p>Nuestra responsabilidad total acumulada estará limitada al monto pagado por ti en los 12 meses anteriores al evento que dé origen a la reclamación.</p>
        <Callout icon="alert-triangle">Esta cláusula no limita derechos irrenunciables que la ley chilena otorga a consumidores.</Callout>
      </>
    )},
    { id: 'cambios', title: 'Cambios a los términos', body: (
      <>
        <p>Podemos actualizar estos Términos cuando la ley o el producto lo requieran. Si los cambios son sustanciales, te avisaremos por email con al menos 30 días de antelación. El uso continuado del servicio luego de la entrada en vigencia implica aceptación.</p>
      </>
    )},
    { id: 'ley-aplicable', title: 'Ley aplicable y jurisdicción', body: (
      <>
        <p>Estos Términos se rigen por la legislación chilena. Cualquier controversia será resuelta ante los Tribunales Ordinarios de Justicia de Santiago de Chile, sin perjuicio de los derechos del consumidor establecidos en la Ley 19.496.</p>
      </>
    )},
    { id: 'contacto', title: 'Contacto', body: (
      <>
        <p>Si tienes preguntas legales sobre estos términos, escríbenos:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:legal@agnd.cl">legal@agnd.cl</a></li>
          <li><strong>Dirección:</strong> Av. Apoquindo 4501, piso 12, Las Condes, Santiago.</li>
          <li><strong>Razón social:</strong> AGND.CL SpA · RUT 77.555.123-4</li>
        </ul>
      </>
    )},
  ],
};

/* ============== PRIVACY DOC ============== */
const PRIVACY_DOC = {
  eyebrow: 'Política de Privacidad',
  title: 'Tus datos son <span class="accent">tuyos.</span>',
  lead: 'Explicamos qué información recolectamos, por qué y cómo la protegemos. Cumplimos con la Ley N° 19.628 de protección de la vida privada de Chile.',
  updated: '15 de abril de 2026',
  version: 'v3.0',
  sections: [
    { id: 'introduccion', title: 'Introducción', body: (
      <>
        <p>En AGND.CL SpA tratamos los datos personales con cuidado. Esta política explica qué recolectamos, cómo lo usamos y los derechos que tienes sobre tu información.</p>
        <Callout icon="shield-check">Si solo te interesa lo esencial: <strong>nunca vendemos tus datos ni los de tus clientes</strong>, y puedes pedir borrarlos cuando quieras.</Callout>
      </>
    )},
    { id: 'datos-recolectados', title: 'Qué datos recolectamos', body: (
      <>
        <p><strong>Datos que tú nos das:</strong></p>
        <ul>
          <li>Datos de cuenta: nombre, email, contraseña, nombre del negocio.</li>
          <li>Datos de tus clientes: los que cargues en tu CRM (nombre, contacto, historial).</li>
          <li>Datos de pago: procesados por nuestro proveedor (no almacenamos números de tarjeta).</li>
          <li>Comunicaciones que nos envías: emails, mensajes de soporte, encuestas.</li>
        </ul>
        <p><strong>Datos que recolectamos automáticamente:</strong></p>
        <ul>
          <li>Datos de uso: páginas visitadas, clics, tiempos de sesión.</li>
          <li>Datos del dispositivo: IP, navegador, sistema operativo.</li>
          <li>Cookies y tecnologías similares (ver sección 7).</li>
        </ul>
      </>
    )},
    { id: 'uso-datos', title: 'Cómo usamos tus datos', body: (
      <>
        <p>Tratamos tu información para:</p>
        <ul>
          <li>Prestar el servicio: mostrar tu agenda, enviar confirmaciones a tus clientes.</li>
          <li>Cobrar tu plan, emitir boletas y prevenir fraude.</li>
          <li>Mejorar la plataforma con métricas agregadas y anonimizadas.</li>
          <li>Enviarte comunicaciones operativas y, si lo aceptaste, de marketing.</li>
          <li>Cumplir obligaciones legales y responder a autoridades cuando corresponda.</li>
        </ul>
      </>
    )},
    { id: 'compartir', title: 'Con quién compartimos datos', body: (
      <>
        <p>Compartimos información solo con quienes necesitamos para operar el servicio:</p>
        <ul>
          <li><strong>Proveedores de infraestructura</strong> (cloud, base de datos, email transaccional).</li>
          <li><strong>Procesadores de pago</strong> certificados PCI-DSS.</li>
          <li><strong>Herramientas de analítica</strong> que respetan IPs anonimizadas.</li>
          <li><strong>Autoridades</strong> cuando exista una orden judicial válida.</li>
        </ul>
        <p>Cada proveedor está sujeto a un acuerdo de tratamiento de datos. <strong>No vendemos tu información a terceros</strong>.</p>
      </>
    )},
    { id: 'derechos', title: 'Tus derechos', body: (
      <>
        <p>Tienes los siguientes derechos sobre tus datos personales (ARCO+):</p>
        <ul>
          <li><strong>Acceso:</strong> saber qué datos tuyos tenemos.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
          <li><strong>Cancelación:</strong> pedir que los borremos.</li>
          <li><strong>Oposición:</strong> oponerte al tratamiento para fines de marketing.</li>
          <li><strong>Portabilidad:</strong> exportar tus datos en formato estándar.</li>
        </ul>
        <p>Para ejercer cualquiera de estos derechos, escribe a <a href="mailto:privacidad@agnd.cl">privacidad@agnd.cl</a>. Respondemos en hasta 15 días hábiles.</p>
      </>
    )},
    { id: 'seguridad', title: 'Seguridad', body: (
      <>
        <p>Aplicamos medidas técnicas y organizacionales razonables para proteger tu información:</p>
        <ul>
          <li>Cifrado en tránsito (TLS 1.3) y en reposo (AES-256).</li>
          <li>Acceso interno restringido por roles, con revisión periódica.</li>
          <li>Backups cifrados diarios y plan de recuperación ante desastres.</li>
          <li>Auditorías anuales de seguridad por terceros independientes.</li>
        </ul>
        <p>Aún así, ningún sistema es 100% inviolable. Si detectamos una brecha que afecte tus datos, te avisaremos en menos de 72 horas.</p>
      </>
    )},
    { id: 'cookies', title: 'Cookies y rastreo', body: (
      <>
        <p>Usamos tres tipos de cookies:</p>
        <ul>
          <li><strong>Esenciales:</strong> necesarias para iniciar sesión y mantener tu sesión activa.</li>
          <li><strong>Analíticas:</strong> ayudan a entender cómo se usa AGND (anonimizadas por defecto).</li>
          <li><strong>Marketing:</strong> opcionales, solo con tu consentimiento explícito.</li>
        </ul>
        <p>Puedes ajustar tus preferencias desde el banner de cookies o en Configuración → Privacidad.</p>
      </>
    )},
    { id: 'retencion', title: 'Retención de datos', body: (
      <>
        <p>Conservamos tu información mientras tu cuenta esté activa. Si la cierras:</p>
        <ul>
          <li>Tus datos personales se anonimizan en un plazo de 90 días.</li>
          <li>Algunos registros (facturación, fraude) se retienen por hasta 6 años por obligación legal y tributaria.</li>
          <li>Los datos de tus clientes se eliminan o anonimizan según tu instrucción.</li>
        </ul>
      </>
    )},
    { id: 'menores', title: 'Menores de edad', body: (
      <>
        <p>AGND es una herramienta para negocios. No está dirigida a menores de 18 años. Si descubres que un menor creó una cuenta sin autorización, escríbenos a <a href="mailto:privacidad@agnd.cl">privacidad@agnd.cl</a> y la eliminaremos.</p>
      </>
    )},
    { id: 'transferencias', title: 'Transferencias internacionales', body: (
      <>
        <p>Algunos de nuestros proveedores procesan datos fuera de Chile (principalmente en EE.UU. y la UE). Estas transferencias se hacen bajo cláusulas contractuales tipo y con proveedores que garantizan estándares equivalentes a la legislación chilena.</p>
      </>
    )},
    { id: 'cambios-privacidad', title: 'Cambios a esta política', body: (
      <>
        <p>Si actualizamos esta política, te avisaremos por email y mostraremos un aviso en la app antes de que el cambio entre en vigencia. La fecha de "Última actualización" arriba siempre refleja la versión vigente.</p>
      </>
    )},
    { id: 'contacto-privacidad', title: 'Contacto del responsable', body: (
      <>
        <p>Responsable del tratamiento de datos:</p>
        <ul>
          <li><strong>AGND.CL SpA</strong> · RUT 77.555.123-4</li>
          <li><strong>Encargado de privacidad:</strong> <a href="mailto:privacidad@agnd.cl">privacidad@agnd.cl</a></li>
          <li><strong>Dirección:</strong> Av. Apoquindo 4501, piso 12, Las Condes, Santiago.</li>
        </ul>
      </>
    )},
  ],
};

window.LegalApp = LegalApp;
window.TERMS_DOC = TERMS_DOC;
window.PRIVACY_DOC = PRIVACY_DOC;
