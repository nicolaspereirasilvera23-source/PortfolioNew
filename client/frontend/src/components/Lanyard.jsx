import LanyardMotion from './LanyardMotion.jsx';

export function Lanyard() {
  return <div className="lanyard-root" aria-label="Gafete interactivo de Nicolás Pereira. Arrastrá la tarjeta para moverla y girala para ver el reverso."><LanyardMotion frontImage="/assets/yop.jpg" backImage="/assets/lanyard-back.svg" strapColor="#8d71da" cardColor="#f1eee9" size={.42} strapLength={.76} strapWidth={.52} breeze={.28} className="lanyard-motion"/></div>;
}
