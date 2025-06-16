'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { PlayIcon as PlayOutlineIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Episode, UserWatchProgress } from '@/types/content.types';
import { cn } from '@/lib/utils';

interface EpisodeListItemProps {
  episode: Episode;
  userProgress?: UserWatchProgress;
  onSelect?: () => void;
}

export function EpisodeListItem({ episode, userProgress, onSelect }: EpisodeListItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const watchData = userProgress?.watchedEpisodes.get(episode.id);
  const isWatched = watchData?.fullyWatched || false;
  const isInProgress = watchData && !watchData.fullyWatched && watchData.secondsWatched > 0;
  const progressPercentage = watchData ? (watchData.secondsWatched / episode.duration) * 100 : 0;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      className="group cursor-pointer relative"
      onClick={onSelect}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="glassmorphic-card p-4 space-y-4 hover:bg-white/15 transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={episode.thumbnailUrl}
            alt={episode.title}
            fill
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Play Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white group-hover:bg-white/30 transition-all duration-300">
              <PlayIcon className="h-6 w-6 ml-1" />
            </div>
          </motion.div>

          {/* Status Indicators */}
          <div className="absolute top-2 left-2 flex gap-2">
            {episode.isFiller && (
              <span className="px-2 py-1 text-xs bg-yellow-500/80 text-black rounded-full font-medium">
                Filler
              </span>
            )}
            {episode.isRecap && (
              <span className="px-2 py-1 text-xs bg-blue-500/80 text-white rounded-full font-medium">
                Recap
              </span>
            )}
          </div>

          {/* Watch Status */}
          <div className="absolute top-2 right-2">
            {isWatched ? (
              <CheckCircleIcon className="h-6 w-6 text-green-400" />
            ) : isInProgress ? (
              <div className="w-6 h-6 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
            ) : null}
          </div>

          {/* Progress Bar */}
          {isInProgress && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          )}

          {/* Duration */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/80 rounded text-xs text-white">
            <ClockIcon className="h-3 w-3" />
            {formatDuration(episode.duration)}
          </div>
        </div>

        {/* Episode Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 flex-1">
              Episode {episode.episodeNumber}: {episode.title}
            </h3>
          </div>

          {episode.description && (
            <p className="text-sm text-gray-400 line-clamp-2">
              {episode.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatDate(episode.airDate)}</span>
            {watchData?.watchedAt && (
              <span>Watched {formatDate(watchData.watchedAt.toISOString())}</span>
            )}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
      />
    </motion.div>
  );
}