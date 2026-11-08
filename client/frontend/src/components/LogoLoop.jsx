import LogoLoopMotion from './LogoLoopMotion.jsx';

export function LogoLoop({ logos }) {
  const items = logos.map(name => ({ node:<span className="tech-logo-name">{name}</span>, title:name, ariaLabel:name }));
  return <div className="logo-loop"><LogoLoopMotion logos={items} speed={42} logoHeight={22} gap={38} pauseOnHover intro={false} ariaLabel="Tecnologías que uso" className="portfolio-logo-loop"/></div>;
}
