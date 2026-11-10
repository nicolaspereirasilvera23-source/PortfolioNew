import FolderMotion from './FolderMotion.jsx';

export function Folder({ project, open, onOpenChange }) {
  const contents = <div className="folder-project-copy">
    <p className="folder-project-type">{project.type}</p>
    <p className="folder-project-description">{project.description}</p>
    <p className="folder-project-detail">{project.detail}</p>
    <div className="folder-project-tags">{project.stack.map(item=><span key={item}>{item}</span>)}</div>
    <div className="folder-project-links">
      {project.url && <a href={project.url} target="_blank" rel="noreferrer" onClick={event=>event.stopPropagation()}>Ver demo ↗</a>}
      {project.repo && <a href={project.repo} target="_blank" rel="noreferrer" onClick={event=>event.stopPropagation()}>Ver repositorio ↗</a>}
    </div>
  </div>;
  return <div className="folder-visual"><FolderMotion label={`Carpeta ${project.name}`} items={[{ content:contents }]} mode="flap" variant="solid" color="#594681" paperColor="#eee8ff" size={.76} open={open} onOpenChange={onOpenChange} draggable={false} zoomOnClick={false} intro={false} theme="dark" className="portfolio-folder"/></div>;
}
