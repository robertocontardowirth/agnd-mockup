// App.jsx — root composition for the AGND landing

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "rose",
  "density": "compact",
  "typeScale": "sm",
  "dark": false,
  "showFeatures": true,
  "showBooking": true,
  "showCrm": true,
  "showHow": true,
  "showUseCases": true,
  "showIntegrations": true,
  "showTestimonial": true,
  "showFaq": true,
  "showFinalCta": true
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.body.dataset.theme = t.dark ? 'dark' : 'light';
    document.body.dataset.accent = t.accent;
    document.body.dataset.density = t.density;
    document.body.dataset.typeScale = t.typeScale;
  }, [t.dark, t.accent, t.density, t.typeScale]);

  React.useEffect(() => {
    const id = setTimeout(() => window.lucide && window.lucide.createIcons(), 50);
    return () => clearTimeout(id);
  });

  React.useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {/* ========== NAV ========== */}
      <SiteNav active="home" />

      {/* ========== HERO ========== */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h1 className="hero-title">
                Tu agenda,<br />
                <span className="accent" style={{ fontSize: "clamp(48px, 9vw, 104px)" }}>sin vueltas.</span><br />
                <span style={{ fontWeight: 400, color: 'var(--fg-2)', lineHeight: "1.25", letterSpacing: "-0.005em", display: "inline-block", marginTop: "12px", fontSize: "28px" }}>
                  La plataforma de reservas con la que tus clientes <span style={{ color: 'var(--fg-1)', fontWeight: 600 }}>realmente quieren agendar.</span>
                </span>
              </h1>

              <div className="hero-actions">
                <a href="register.html" className="btn btn-primary">
                  Crear mi página gratis
                  <i data-lucide="arrow-right" style={{ width: 16, height: 16 }} />
                </a>
                <a href="#" className="btn btn-link">
                  Ver demo en vivo
                </a>
              </div>

              <div className="hero-meta">
                <span className="hero-meta-item">
                  <i data-lucide="check" style={{ width: 14, height: 14 }} />
                  Sin tarjeta de crédito
                </span>
                <span className="hero-meta-item">
                  <i data-lucide="check" style={{ width: 14, height: 14 }} />
                  5 min para configurar
                </span>
                <span className="hero-meta-item">
                  <i data-lucide="check" style={{ width: 14, height: 14 }} />
                  Tu dominio, tu marca
                </span>
              </div>

              <div className="stat-row">
                <div className="stat">
                  <div className="num">+12<span className="accent">.000</span></div>
                  <div className="lbl">reservas gestionadas / mes</div>
                </div>
                <div className="stat">
                  <div className="num">−68<span className="accent">%</span></div>
                  <div className="lbl">de no-shows en promedio</div>
                </div>
                <div className="stat">
                  <div className="num">4.9<span className="accent">/5</span></div>
                  <div className="lbl">satisfacción de clientes</div>
                </div>
              </div>

              <div className="trust-row">
                <span className="label">Confían en nosotros</span>
                <span className="trust-logo">Estudio Ámbar</span>
                <span className="trust-logo">Clínica Norte</span>
                <span className="trust-logo">Café del Centro</span>
                <span className="trust-logo">Barbería Roma</span>
              </div>
            </div>

            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ========== CONTENT SECTIONS ========== */}
      <Features visible={t.showFeatures} />
      <BookingShowcase visible={t.showBooking} />
      <CrmShowcase visible={t.showCrm} />
      <HowItWorks visible={t.showHow} />
      <UseCases visible={t.showUseCases} />
      <Integrations visible={t.showIntegrations} />
      <Testimonial visible={t.showTestimonial} />
      <FAQ visible={t.showFaq} />
      <FinalCTA visible={t.showFinalCta} />

      <Footer />

      {/* ========== TWEAKS PANEL ========== */}
      <TweaksPanel title="Tweaks · AGND landing">
        <TweakSection label="Identidad">
          <TweakRadio
            label="Color de acento"
            value={t.accent}
            options={[
            { value: 'rose', label: 'Rosa' },
            { value: 'aqua', label: 'Aqua' },
            { value: 'plum', label: 'Plum' },
            { value: 'coral', label: 'Coral' }]
            }
            onChange={(v) => setTweak('accent', v)} />
          
          <TweakToggle
            label="Modo oscuro (plum)"
            value={t.dark}
            onChange={(v) => setTweak('dark', v)} />
          
        </TweakSection>

        <TweakSection label="Tipografía y espaciado">
          <TweakRadio
            label="Escala tipográfica"
            value={t.typeScale}
            options={[
            { value: 'sm', label: 'S' },
            { value: 'md', label: 'M' },
            { value: 'lg', label: 'L' }]
            }
            onChange={(v) => setTweak('typeScale', v)} />
          
          <TweakRadio
            label="Densidad"
            value={t.density}
            options={[
            { value: 'compact', label: 'Compacta' },
            { value: 'regular', label: 'Regular' },
            { value: 'comfy', label: 'Aireada' }]
            }
            onChange={(v) => setTweak('density', v)} />
          
        </TweakSection>

        <TweakSection label="Secciones visibles">
          <TweakToggle label="Capacidades" value={t.showFeatures} onChange={(v) => setTweak('showFeatures', v)} />
          <TweakToggle label="Página de reserva" value={t.showBooking} onChange={(v) => setTweak('showBooking', v)} />
          <TweakToggle label="CRM interno" value={t.showCrm} onChange={(v) => setTweak('showCrm', v)} />
          <TweakToggle label="Cómo funciona" value={t.showHow} onChange={(v) => setTweak('showHow', v)} />
          <TweakToggle label="Casos de uso" value={t.showUseCases} onChange={(v) => setTweak('showUseCases', v)} />
          <TweakToggle label="Integraciones" value={t.showIntegrations} onChange={(v) => setTweak('showIntegrations', v)} />
          <TweakToggle label="Testimonio" value={t.showTestimonial} onChange={(v) => setTweak('showTestimonial', v)} />
          <TweakToggle label="FAQ" value={t.showFaq} onChange={(v) => setTweak('showFaq', v)} />
          <TweakToggle label="CTA final" value={t.showFinalCta} onChange={(v) => setTweak('showFinalCta', v)} />
        </TweakSection>
      </TweaksPanel>
    </>);

}

window.App = App;