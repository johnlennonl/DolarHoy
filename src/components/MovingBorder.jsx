import React from 'react';
import { motion } from 'framer-motion';

/**
 * Un contenedor con borde animado sutil, estilo "Aceternity".
 * Props:
 *  - children: contenido interno
 *  - className: clases extra para el contenedor
 */
export default function MovingBorder({ children, className = '' }) {
  return (
    <div className={`relative p-[2px] rounded-2xl overflow-hidden ${className}`}>
      {/* Borde animado */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(59,130,246,0.5), rgba(16,185,129,0.5), rgba(244,63,94,0.5), rgba(59,130,246,0.5))'
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
      />
      {/* Difuminado suave para que no sea invasivo */}
      <div className="absolute inset-0 bg-white rounded-2xl m-[2px]" />
      {/* Contenido */}
      <div className="relative rounded-2xl bg-white">{children}</div>
    </div>
  );
}
