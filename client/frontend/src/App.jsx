import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
const LogoLoop = lazy(() => import('./components/LogoLoop.jsx').then(module => ({ default:module.LogoLoop })));
const Lanyard = lazy(() => import('./components/Lanyard.jsx').then(module => ({ default:module.Lanyard })));
const FluxLines = lazy(() => import('./components/FluxLines.jsx').then(module => ({ default:module.FluxLines })));
const Folder = lazy(() => import('./components/Folder.jsx').then(module => ({ default:module.Folder })));

const projects = [
  { name:'Qubik Timer', index:'01', group:'propios', type:'Colaboración · Open source', description:'Proyecto colaborativo open source en el que participo como backend developer.', detail:'Trabajo con NestJS y TypeScript, colaborando en arquitectura, Git Flow, PRs y coordinación entre backend, frontend, QA y base de datos.', stack:['NestJS','TypeScript','Open source','Git Flow'], url:'https://qubiktimer.com/', action:'Visitar proyecto' },
  { name:'NEZT', index:'02', group:'propios', type:'Mi startup · Plataforma B2B', description:'La web de mi negocio y startup: un espacio para presentar capacidades de ingeniería, automatización y soluciones de software.', detail:'Next.js App Router, tema dinámico, soporte EN/ES, catálogo de servicios y Labs.', stack:['Next.js','React','TypeScript','Tailwind'], url:'https://websitie-startup.vercel.app/', action:'Visitar sitio' },
  { name:'Bot de validación documental', index:'03', group:'propios', type:'Automatización · Equipo deportivo', description:'Automatización creada para simplificar la validación de documentos en mi equipo deportivo.', detail:'Herramienta digital para organizar el flujo de recepción y validación documental del equipo.', stack:['Automatización','Gestión documental'], url:'https://validation-documentals-bot.vercel.app/', action:'Visitar herramienta' },
  { name:'Museo Ezequiel Zamora', index:'04', group:'trabajos', type:'Trabajo realizado · Freelance · Cultura', description:'Ecosistema digital para un museo y centro cultural patrimonial en Villa de Cura, Venezuela.', detail:'Web pública, dashboard administrativo, API en Go, MongoDB, Cloudinary y correo transaccional con Resend.', stack:['Go','React','MongoDB','Resend'], url:'https://casa-pulperia-museo.vercel.app/', action:'Visitar sitio' },
  { name:'Suárez Vóley', index:'05', group:'trabajos', type:'Trabajo realizado · Freelance · Deporte', description:'Una presencia digital clara para acercar el club a jugadores, familias y comunidad.', detail:'Sitio institucional responsive para comunicar la identidad y actividad del club.', stack:['Diseño responsive','Web institucional'], url:'https://suarezvoleyweb.vercel.app/', action:'Visitar sitio' },
  { name:'LS Acondicionadores', index:'06', group:'trabajos', type:'Trabajo realizado · Freelance · Servicios', description:'Landing page para un negocio de instalación de aire acondicionado.', detail:'Presentación directa de servicios, pensada para convertir visitas en consultas.', stack:['Landing page','Diseño responsive'], url:'https://ls-acondicioner-lp.vercel.app/', action:'Visitar sitio' },
  { name:'Telegram Lead Bot', index:'07', group:'propios', type:'Proyecto propio · Automatización', description:'Bot de calificación de leads desarrollado como solución para una oferta laboral.', detail:'Extrae información del lead vía LLM, aplica reglas de calificación ICP en Python y guarda los datos en Google Sheets.', stack:['Python','Telegram API','LLM','Google Sheets'], url:'https://github.com/nicolaspereirasilvera23-source/Telegram-Bot-Leads', action:'Ver repositorio' },
  { name:'Assistance System', index:'08', group:'propios', type:'Proyecto propio · Asistencias y métricas', description:'Registrar y conciliar manualmente asistencias de 80 personas consumía horas y generaba errores.', detail:'Sistema backend modular para gestión y métricas de asistencia, con persistencia relacional y migraciones Prisma.', stack:['NestJS','TypeScript','Prisma','Supabase'], url:'https://github.com/nicolaspereirasilvera23-source/assistance-system-web', action:'Ver repositorio' },
  { name:'QRLY', index:'09', group:'propios', type:'Proyecto propio · Producto real / SaaS', description:'Las fotos de un evento familiar quedaban dispersas entre celulares, chats y archivos comprimidos.', detail:'Álbum colaborativo por QR: los invitados entran al evento y suben fotos o videos sin registrarse.', stack:['Node.js','Express','Supabase','Cloudinary'], url:'https://github.com/nicolaspereirasilvera23-source/QRLY-AlbumWeb', action:'Ver repositorio' },
];

const tech = ['TypeScript','React','Next.js','NestJS','Node.js','Go','Python','Tailwind CSS','PostgreSQL','MongoDB','Supabase','Prisma','Resend','Cloudinary','Vercel'];

function ProjectFolder({ project }) {
  const [open, setOpen] = useState(false);
  return <article className={`project-entry ${open ? 'is-open' : ''}`}>
    <button className="project-trigger" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={`${open ? 'Cerrar' : 'Abrir'} carpeta de ${project.name}`}>
      <span className="project-count">{project.index}</span>
      <span className="project-name">{project.name}</span>
      <span className="project-type">{project.type}</span>
      <ArrowDownRight className="project-arrow" size={22} />
    </button>
      <div className="folder-stage">{open && <Suspense fallback={<span className="folder-loading">Abriendo proyecto…</span>}><Folder project={project} open={open} onOpenChange={setOpen}/></Suspense>}
    </div>
  </article>;
}

function StackMarquee({ logos }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current || visible) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin:'120px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);
  return <div ref={ref} className="logo-loop-slot">{visible ? <Suspense fallback={<p className="stack-loading">Cargando tecnologías…</p>}><LogoLoop logos={logos}/></Suspense> : <p className="stack-loading" aria-hidden="true">STACK · 15 TECNOLOGÍAS</p>}</div>;
}

function HeroPortrait() {
  return <div className="portrait-wrap"><img className="lanyard-fallback" src="/assets/yop.jpg" alt="" aria-hidden="true"/><Suspense fallback={null}><Lanyard /></Suspense><div className="portrait-label"><span>NICOLÁS PEREIRA</span><span>DEV · MONTEVIDEO</span></div><div className="orbit-note">BUILD<br/>WITH<br/>PURPOSE<span>✳</span></div></div>;
}

function ContactForm() {
  const [status, setStatus] = useState({ kind:'', message:'' });
  const [sending, setSending] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setSending(true); setStatus({ kind:'loading', message:'Enviando mensaje mediante NestJS y Resend…' });
    try {
      const endpoint = import.meta.env.VITE_PORTFOLIO_API_URL || 'http://localhost:3000/api/send-email';
      const response = await fetch(endpoint, { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify(values) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.detail || result.message || 'No se pudo enviar el mensaje.');
      form.reset(); setStatus({ kind:'success', message:'Mensaje enviado. Gracias por escribirme.' });
    } catch (error) {
      setStatus({ kind:'error', message:`${error.message} También podés escribirme a nicolas.psilvera@gmail.com.` });
    } finally { setSending(false); }
  }
  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="form-row"><label>Tu nombre<input name="name" autoComplete="name" required placeholder="¿Cómo te llamás?"/></label><label>Tu email<input name="email" type="email" autoComplete="email" required placeholder="nombre@correo.com"/></label></div>
    <label>Asunto <span>· opcional</span><input name="subject" placeholder="Proyecto, oportunidad, idea…"/></label>
    <label>Mensaje<textarea name="message" required rows="4" placeholder="Contame un poco…"/></label>
    <button type="submit" disabled={sending}>{sending ? 'Enviando…' : 'Enviar mensaje'}<ArrowUpRight size={17}/></button>
    <p className={`form-status ${status.kind}`} role="status" aria-live="polite">{status.message}</p>
  </form>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <Suspense fallback={null}><FluxLines /></Suspense>
    <header className="site-header">
      <a className="wordmark" href="#inicio" aria-label="Nicolás Pereira, inicio"><span className="wordmark-mark">NP</span><span>Nicolás Pereira</span></a>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Navegación principal">
        {[['Sobre mí','#sobre-mi'],['Proyectos','#proyectos'],['Trayectoria','#trayectoria'],['Contacto','#contacto']].map(([label,href]) => <a key={href} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}
      </nav>
      <a className="header-contact" href="mailto:nicolas.psilvera@gmail.com">Hablemos <ArrowUpRight size={15}/></a>
      <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?'Cerrar menú':'Abrir menú'} aria-expanded={menuOpen}>{menuOpen?<X/>:<Menu/>}</button>
    </header>

    <main id="inicio">
      <section className="hero-section">
        <div className="hero-index"><span className="status-dot"/> DISPONIBLE PARA NUEVOS PROYECTOS <span>MONTEVIDEO, UY · -34.9° / -56.2°</span></div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="overline">SOFTWARE DEVELOPER <span>—</span> BACKEND & PRODUCT ENGINEERING</p>
            <h1>Ideas reales.<br/><em>Sistemas</em> que<br/>sí laburan.</h1>
            <p className="hero-intro">Construyo software para resolver problemas concretos: APIs, automatización y productos digitales que funcionan más allá del localhost.</p>
            <div className="hero-actions"><a className="button-primary" href="#proyectos">Explorar proyectos <ArrowDown size={17}/></a><a className="text-link" href="mailto:nicolas.psilvera@gmail.com">Contactarme <ArrowUpRight size={16}/></a></div>
            <div className="hero-footnote"><span>01 / 04</span><span>DISEÑO CON INTENCIÓN. CÓDIGO CON CRITERIO.</span></div>
          </div>
          <HeroPortrait />
        </div>
        <a className="scroll-cue" href="#sobre-mi"><span>DESLIZÁ PARA EXPLORAR</span><ArrowDown size={15}/></a>
      </section>

      <section className="manifesto-section" id="sobre-mi">
        <div className="section-kicker"><span>01 — PUNTO DE PARTIDA</span><span>LO QUE ME MUEVE</span></div>
        <div className="manifesto-grid"><p className="manifesto-title">Me interesa el momento en que una tarea cotidiana se convierte en <em>una buena solución.</em></p><div className="manifesto-body"><p>Empecé por el backend para entender qué ocurre detrás de un formulario. Antes de escribir código, dibujo la arquitectura; después construyo, documento y reviso cada decisión.</p><p>He trabajado con un club, un museo, un evento familiar y equipos de software. Me gusta tomar procesos manuales y convertirlos en sistemas simples, mantenibles y útiles.</p><a className="arrow-link" href="#trayectoria">Mi recorrido <ArrowUpRight size={17}/></a></div></div>
        <div className="principles"><div><span>01</span><b>Primero entender</b><small>El problema antes que la tecnología.</small></div><div><span>02</span><b>Construir con criterio</b><small>Arquitectura clara y código mantenible.</small></div><div><span>03</span><b>Entregar algo real</b><small>Soluciones pensadas para personas.</small></div></div>
      </section>

      <section className="projects-section" id="proyectos">
        <div className="section-kicker"><span>02 — TRABAJO SELECCIONADO</span><span>2024 — 2026</span></div>
        <div className="projects-heading"><h2>De la idea<br/>a <em>lo que funciona.</em></h2><p>Proyectos hechos para personas y organizaciones reales. Abrí una carpeta para ver el desafío y la solución.</p></div>
        <div className="project-groups">
          <div className="project-group"><div className="project-group-heading"><h3>Trabajos realizados</h3><span>03 / FREELANCE</span></div><div className="projects-list">{projects.filter(project=>project.group==='trabajos').map(project=><ProjectFolder key={project.index} project={project}/>)}</div></div>
          <div className="project-group"><div className="project-group-heading"><h3>Proyectos propios</h3><span>06 / INCLUYE COLABORACIÓN OPEN SOURCE</span></div><div className="projects-list">{projects.filter(project=>project.group==='propios').map(project=><ProjectFolder key={project.index} project={project}/>)}</div></div>
        </div>
        <p className="projects-note">09 PROYECTOS <span>·</span> TRABAJO FREELANCE, STARTUP, AUTOMATIZACIONES & OPEN SOURCE</p>
      </section>

      <section className="stack-section" id="stack">
        <div className="section-kicker"><span>03 — HERRAMIENTAS</span><span>STACK EN MOVIMIENTO</span></div>
        <div className="stack-heading"><h2>La herramienta<br/><em>correcta para el trabajo.</em></h2><p>Esta es la tecnología que aparece en mis proyectos y en mi trabajo diario.</p></div>
        <StackMarquee logos={tech} />
        <div className="stack-groups"><div><span>01 / BACKEND</span><p>NestJS · Node.js · Go · Python · APIs</p></div><div><span>02 / FRONTEND</span><p>React · Next.js · TypeScript · Tailwind</p></div><div><span>03 / DATA & TOOLS</span><p>PostgreSQL · MongoDB · Prisma · Supabase · Resend</p></div></div>
      </section>

      <section className="journey-section" id="trayectoria">
        <div className="section-kicker"><span>04 — TRAYECTORIA</span><span>APRENDER · HACER · MEJORAR</span></div>
        <div className="journey-grid"><h2>Experiencia<br/>con los pies<br/><em>en la tierra.</em></h2><div className="timeline">
          <article><time>2026 — PRESENTE</time><div><h3>Backend Developer</h3><p className="org">Qubik Timer · Equipo open source</p><p>NestJS y TypeScript en un equipo colaborativo. Arquitectura, Git Flow, PRs y trabajo junto a frontend, QA y DB.</p></div></article>
          <article><time>JUL 2024 — PRESENTE</time><div><h3>Fullstack Developer Freelance</h3><p className="org">Museo Ezequiel Zamora Casa Pulpería · Venezuela</p><p>Web pública y dashboard administrativo. API en Go, MongoDB, Cloudinary y correo transaccional con Resend.</p></div></article>
          <article><time>2026</time><div><h3>Software Developer Freelance</h3><p className="org">QRLY · Álbum QR para evento familiar</p><p>Solución digital para centralizar fotos de un cumpleaños mediante QR; desde el flujo de usuario hasta el despliegue.</p></div></article>
          <article><time>FEB 2024 — PRESENTE</time><div><h3>Administrador / Coordinador</h3><p className="org">Club Suárez Vóley · Uruguay</p><p>Gestión de inscripciones, cronogramas y comunicación. Experiencia coordinando personas, datos y operación real.</p></div></article>
        </div></div>
        <div className="education-line"><span>FORMACIÓN CONTINUA</span><p>Backend · APIs · testing · arquitectura · TypeScript · NestJS · bases de datos</p></div>
      </section>

      <section className="contact-section" id="contacto"><div className="section-kicker"><span>05 — PRÓXIMO PASO</span><span>MONTEVIDEO, URUGUAY</span></div><div className="contact-body"><p className="overline">¿TENÉS UN PROBLEMA INTERESANTE?</p><h2>Hagamos que<br/><em>funcione.</em></h2><div className="contact-layout"><div><a className="contact-cta" href="mailto:nicolas.psilvera@gmail.com">Escribime <ArrowUpRight size={22}/></a><p className="contact-email">nicolas.psilvera@gmail.com</p></div><ContactForm/></div></div><div className="contact-bottom"><span>DISPONIBLE PARA OPORTUNIDADES Y PROYECTOS FREELANCE</span><div><a href="https://github.com/nicolaspereirasilvera23-source" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href="https://www.linkedin.com/in/nicolas-psilvera" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="mailto:nicolas.psilvera@gmail.com" aria-label="Email"><Mail/></a></div></div></section>
    </main>
    <footer><a className="wordmark" href="#inicio"><span className="wordmark-mark">NP</span><span>Nicolás Pereira</span></a><span>HECHO CON CURIOSIDAD · © 2026</span><a href="#inicio">VOLVER ARRIBA ↑</a></footer>
  </>;
}

export default App;
