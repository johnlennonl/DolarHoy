import { motion, useReducedMotion } from 'framer-motion';

export default function MotionBackground() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Spotlight radial */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background:
            'radial-gradient(1200px 600px at 50% -10%, rgba(99,102,241,0.35) 0%, rgba(34,197,94,0.35) 35%, transparent 60%)'
        }}
      />

      {/* Grid sutil */}
      <div
        className="fixed inset-0 -z-40 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          color: '#0f172a'
        }}
      />

      {/* Gradiente animado muy leve */}
      <motion.div
        className="fixed inset-0 -z-50"
        animate={
          reduce
            ? { backgroundPosition: '50% 50%' }
            : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
        }
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'linear-gradient(90deg, #0ea5e9 0%, #22c55e 50%, #a855f7 100%)',
          backgroundSize: '300% 300%',
          filter: 'saturate(0.8) blur(0.2px)'
        }}
      />

      {/* Ruido sutil */}
      <div
        className="fixed inset-0 -z-20 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")'
        }}
      />
    </>
  );
}
