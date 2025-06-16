'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ScoreDistribution } from '@/types/content.types';
import { useInViewAnimation } from '@/hooks/use-in-view';

interface ScoreDistributionChartProps {
  scores: ScoreDistribution[];
}

export function ScoreDistributionChart({ scores }: ScoreDistributionChartProps) {
  const { ref, inView } = useInViewAnimation({ threshold: 0.3 });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    if (inView && !animationTriggered) {
      setAnimationTriggered(true);
    }
  }, [inView, animationTriggered]);

  const maxPercentage = Math.max(...scores.map(s => s.percentage));

  const getBarColor = (score: number) => {
    if (score >= 9) return 'from-green-500 to-green-400';
    if (score >= 7) return 'from-blue-500 to-blue-400';
    if (score >= 5) return 'from-yellow-500 to-yellow-400';
    if (score >= 3) return 'from-orange-500 to-orange-400';
    return 'from-red-500 to-red-400';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const barVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div ref={ref} className="space-y-6">
      <div className="glassmorphic-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Score Distribution</h3>
          <div className="text-sm text-gray-400">
            {scores.reduce((sum, s) => sum + s.count, 0).toLocaleString()} total votes
          </div>
        </div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={animationTriggered ? "visible" : "hidden"}
        >
          {scores
            .sort((a, b) => b.score - a.score)
            .map((scoreData) => (
              <motion.div
                key={scoreData.score}
                className="flex items-center gap-4"
                variants={barVariants}
              >
                {/* Score Label */}
                <div className="w-8 text-right">
                  <span className="text-white font-semibold">{scoreData.score}</span>
                </div>

                {/* Bar Container */}
                <div className="flex-1 relative">
                  <div className="h-8 bg-gray-800 rounded-lg overflow-hidden relative">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getBarColor(scoreData.score)} relative overflow-hidden`}
                      initial={{ width: 0 }}
                      animate={{
                        width: animationTriggered 
                          ? `${(scoreData.percentage / maxPercentage) * 100}%`
                          : 0
                      }}
                      transition={{ 
                        duration: 1.2, 
                        delay: (10 - scoreData.score) * 0.1,
                        ease: 'easeOut'
                      }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          delay: 1 + (10 - scoreData.score) * 0.1,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.div>

                    {/* Percentage Label */}
                    <div className="absolute inset-0 flex items-center px-3">
                      <motion.span
                        className="text-white text-sm font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: animationTriggered ? 1 : 0 }}
                        transition={{ 
                          delay: 0.5 + (10 - scoreData.score) * 0.1,
                          duration: 0.3
                        }}
                      >
                        {scoreData.percentage.toFixed(1)}%
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* Count */}
                <div className="w-20 text-right">
                  <motion.span
                    className="text-gray-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: animationTriggered ? 1 : 0 }}
                    transition={{ 
                      delay: 0.7 + (10 - scoreData.score) * 0.1,
                      duration: 0.3
                    }}
                  >
                    {scoreData.count.toLocaleString()}
                  </motion.span>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="mt-8 pt-6 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: animationTriggered ? 1 : 0,
            y: animationTriggered ? 0 : 20
          }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {scores.filter(s => s.score >= 8).reduce((sum, s) => sum + s.percentage, 0).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Positive (8-10)</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">
                {scores.filter(s => s.score >= 5 && s.score < 8).reduce((sum, s) => sum + s.percentage, 0).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Mixed (5-7)</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-red-400">
                {scores.filter(s => s.score < 5).reduce((sum, s) => sum + s.percentage, 0).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Negative (1-4)</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}