import LogoLoopMotion from './LogoLoopMotion.jsx';

export function LogoLoop({ logos }) {
  const items = logos.map(({ name, slug }) => ({ node:<span className="tech-logo-name"><img src={`https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/${slug}.svg`} alt="" aria-hidden="true" loading="lazy"/><span>{name}</span></span>, title:name, ariaLabel:name }));
  return <div className="logo-loop"><LogoLoopMotion logos={items} speed={42} logoHeight={22} gap={38} pauseOnHover intro={false} ariaLabel="Tecnologías que uso" className="portfolio-logo-loop"/></div>;
}
