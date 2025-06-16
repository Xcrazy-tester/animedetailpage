'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface ExpandableSynopsisProps {
  description: string;
  maxLength?: number;
}

export function ExpandableSynopsis({ description, maxLength = 300 }: ExpandableSynopsisProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowToggle = description.length > maxLength;
  const displayText = isExpanded || !shouldShowToggle 
    ? description 
    : description.slice(0, maxLength) + '...';

  return (
    <div className="glassmorphic-card p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Synopsis</h3>
      
      <div className="space-y-4">
        <motion.p
          className="text-gray-300 leading-relaxed"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {displayText}
        </motion.p>

        {shouldShowToggle && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium group"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundClip: 'padding-box',
          WebkitBackgroundClip: 'padding-box',
        }}
      />
    </div>
  );
}