'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { AnimeDetailType, UserWatchProgress, Episode } from '@/types/content.types';
import { EpisodeList } from './episode-list';
import { cn } from '@/lib/utils';

interface EpisodeBrowserProps {
  anime: AnimeDetailType;
  userProgress?: UserWatchProgress;
  onEpisodeSelect?: (episodeId: number) => void;
}

export function EpisodeBrowser({ anime, userProgress, onEpisodeSelect }: EpisodeBrowserProps) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [filterType, setFilterType] = useState<'all' | 'unwatched' | 'watched'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredEpisodes = useMemo(() => {
    let episodes = anime.episodes.filter(episode => episode.seasonNumber === selectedSeason);

    // Apply filters
    switch (filterType) {
      case 'watched':
        episodes = episodes.filter(episode => 
          userProgress?.watchedEpisodes.get(episode.id)?.fullyWatched
        );
        break;
      case 'unwatched':
        episodes = episodes.filter(episode => 
          !userProgress?.watchedEpisodes.get(episode.id)?.fullyWatched
        );
        break;
    }

    // Apply sorting
    episodes.sort((a, b) => {
      const comparison = a.episodeNumber - b.episodeNumber;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return episodes;
  }, [anime.episodes, selectedSeason, filterType, sortOrder, userProgress]);

  const seasonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {/* Season Selector */}
          <div className="relative">
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="glassmorphic-select appearance-none pr-10 pl-4 py-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {anime.seasons.map((season) => (
                <option key={season.number} value={season.number} className="bg-gray-900">
                  {season.title}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter Type */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="glassmorphic-select appearance-none pr-10 pl-4 py-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all" className="bg-gray-900">All Episodes</option>
              <option value="unwatched" className="bg-gray-900">Unwatched</option>
              <option value="watched" className="bg-gray-900">Watched</option>
            </select>
            <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Sort Order */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortOrder('asc')}
            className={cn(
              "px-4 py-2 text-sm rounded-lg transition-all duration-200",
              sortOrder === 'asc'
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            )}
          >
            1 → Latest
          </button>
          <button
            onClick={() => setSortOrder('desc')}
            className={cn(
              "px-4 py-2 text-sm rounded-lg transition-all duration-200",
              sortOrder === 'desc'
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            )}
          >
            Latest → 1
          </button>
        </div>
      </div>

      {/* Season Info */}
      <motion.div
        className="glassmorphic-card p-6"
        key={selectedSeason}
        variants={seasonVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {anime.seasons.find(s => s.number === selectedSeason)?.title}
            </h2>
            <p className="text-gray-400">
              {filteredEpisodes.length} episodes
              {filterType !== 'all' && (
                <span className="ml-2 text-sm">
                  ({filterType === 'watched' ? 'watched' : 'unwatched'})
                </span>
              )}
            </p>
          </div>

          {userProgress && (
            <div className="flex items-center gap-4 text-sm">
              <div className="text-gray-400">
                Progress: {Array.from(userProgress.watchedEpisodes.entries())
                  .filter(([id, data]) => {
                    const episode = anime.episodes.find(ep => ep.id === id);
                    return episode?.seasonNumber === selectedSeason && data.fullyWatched;
                  }).length} / {anime.episodes.filter(ep => ep.seasonNumber === selectedSeason).length}
              </div>
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(Array.from(userProgress.watchedEpisodes.entries())
                      .filter(([id, data]) => {
                        const episode = anime.episodes.find(ep => ep.id === id);
                        return episode?.seasonNumber === selectedSeason && data.fullyWatched;
                      }).length / anime.episodes.filter(ep => ep.seasonNumber === selectedSeason).length) * 100}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Episodes List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedSeason}-${filterType}-${sortOrder}`}
          variants={seasonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <EpisodeList
            episodes={filteredEpisodes}
            userProgress={userProgress}
            onEpisodeSelect={onEpisodeSelect}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}