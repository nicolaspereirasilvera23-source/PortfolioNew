export function Folder({ project }) {
  return <div className="project-details-panel">
    <div className="project-details-copy">
      <section>
        <p className="project-detail-label">Objetivo</p>
        <p>{project.objective || project.description}</p>
      </section>
      <section>
        <p className="project-detail-label">Mi aporte</p>
        <p>{project.contribution || project.detail}</p>
      </section>
      <section className="project-technical-detail">
        <p className="project-detail-label">Implementación</p>
        <p>{project.detail}</p>
      </section>
    </div>
    <aside className="project-details-aside">
      <p className="project-detail-label">Stack utilizado</p>
      <div className="project-detail-tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
      <div className="project-detail-links">
        {project.url && <a className="project-demo-link" href={project.url} target="_blank" rel="noreferrer">Ver demo <span aria-hidden="true">↗</span></a>}
        {project.repo && <a className="project-repo-link" href={project.repo} target="_blank" rel="noreferrer">Ver repositorio <span aria-hidden="true">↗</span></a>}
        {!project.url && <span className="project-demo-unavailable">Demo pública en preparación</span>}
      </div>
    </aside>
  </div>;
}
