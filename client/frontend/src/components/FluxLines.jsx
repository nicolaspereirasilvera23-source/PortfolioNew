import FluxLinesMotion from './FluxLinesMotion.jsx';
import { useEffect, useState } from 'react';

export function FluxLines() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(!query.matches);
    update(); query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);
  if (!enabled) return null;
  return <FluxLinesMotion colors={['#a98bff','#f879bd','#9ecbff']} speed={.32} scale={1.55} turbulence={.72} fluidity={.14} glow={1.45} shimmer={.55} opacity={.56} mouseInteraction mouseStrength={.72} mouseRadius={.3} clickSwirl={false} intro={false} className="flux-background" aria-hidden="true"/>;
}
