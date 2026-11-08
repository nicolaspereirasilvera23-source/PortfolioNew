import LanyardMotion from './LanyardMotion.jsx';

export function Lanyard() {
  return <div className="lanyard-root" aria-label="Retrato interactivo de Nicolás Pereira. Arrastrá la tarjeta para moverla."><LanyardMotion frontImage="/assets/yop.jpg" strapColor="#8d71da" cardColor="#f1eee9" size={.91} strapLength={.64} strapWidth={.52} breeze={.28} className="lanyard-motion"/></div>;
}
