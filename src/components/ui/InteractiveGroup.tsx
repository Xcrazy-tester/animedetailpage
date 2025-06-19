'use client';

import {
  ReactElement,
  ReactNode,
  useState,
  Children,
  isValidElement,
} from 'react';
import { motion } from 'framer-motion';

interface InteractiveGroupProps {
  children: ReactNode;
  activeScale?: number;
  neighborScale?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

export function InteractiveGroup({
  children,
  activeScale = 1.1,
  neighborScale = 0.95,
  springConfig = { stiffness: 300, damping: 25, mass: 0.5 },
}: InteractiveGroupProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center gap-4">
      {Children.map(children, (child, idx) => {
        if (!isValidElement(child)) return child;

        // compute scale & origin
        let scale = 1;
        let originX: 'left' | 'right' | 'center' = 'center';

        if (activeIdx === idx) {
          scale = activeScale;
          originX = 'center';
        } else if (activeIdx !== null && Math.abs(activeIdx - idx) === 1) {
          scale = neighborScale;
          originX = idx < activeIdx ? 'right' : 'left';
        }

        return (
          <motion.div
            key={idx}
            style={{ transformOrigin: originX }}
            transition={{ type: 'spring', ...springConfig }}
            whileHover={{ scale }}
            whileTap={{
              scale:
                activeIdx === idx
                  ? activeScale - 0.05
                  : activeIdx !== null && Math.abs(activeIdx - idx) === 1
                  ? neighborScale + 0.02
                  : 1,
            }}
            onMouseDown={() => setActiveIdx(idx)}
            onMouseUp={() => setActiveIdx(null)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}
