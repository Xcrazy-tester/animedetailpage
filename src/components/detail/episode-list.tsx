'use client';

import { motion } from 'framer-motion';
import { Episode, UserWatchProgress } from '@/types/content.types';
import { EpisodeListItem } from './episode-list-item';

interface EpisodeListProps {
  episodes: Episode[];
  userProgress?: UserWatchProgress;
  onEpisodeSelect?: (episodeId: number) => void;
}

export function EpisodeList({ episodes, userProgress, onEpisodeSelect }: EpisodeListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  if (episodes.length === 0) {
    return (
      <motion.div
        className="glassmorphic-card p-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-gray-400 text-lg">
          No episodes found for the selected filters.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {episodes.map((episode) => (
        <motion.div key={episode.id} variants={itemVariants}>
          <EpisodeListItem
            episode={episode}
            userProgress={userProgress}
            onSelect={() => onEpisodeSelect?.(episode.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}