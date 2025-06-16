'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimeDetailType, UserWatchProgress } from '@/types/content.types';
import { EpisodeBrowser } from './episode-browser';
import { ScoreDistributionChart } from './score-distribution-chart';
import { RecommendationsCarousel } from './recommendations-carousel';
import { ExpandableSynopsis } from './expandable-synopsis';

interface ContentTabsProps {
  anime: AnimeDetailType;
  userProgress?: UserWatchProgress;
  onEpisodeSelect?: (episodeId: number) => void;
}

export function ContentTabs({ anime, userProgress, onEpisodeSelect }: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="glassmorphic-card grid w-full grid-cols-4 mb-8">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="episodes"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
          >
            Episodes
          </TabsTrigger>
          <TabsTrigger 
            value="stats"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
          >
            Statistics
          </TabsTrigger>
          <TabsTrigger 
            value="similar"
            className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
          >
            Similar
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="overview" className="mt-0">
            <motion.div
              key="overview"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Synopsis */}
                <div className="lg:col-span-2">
                  <ExpandableSynopsis description={anime.description} />
                </div>

                {/* Details */}
                <div className="glassmorphic-card p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Studio</span>
                      <span className="text-white">{anime.details.studio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Source</span>
                      <span className="text-white">{anime.details.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Episodes</span>
                      <span className="text-white">{anime.details.episodeCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white">{anime.details.episodeDuration} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className="text-white capitalize">{anime.status.toLowerCase().replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Score</span>
                      <span className="text-yellow-400 font-semibold">{anime.rating}/10</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-white mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {anime.details.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300 border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glassmorphic-card p-4 text-center">
                  <div className="text-2xl font-bold text-white">{anime.details.popularity.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Popularity</div>
                </div>
                <div className="glassmorphic-card p-4 text-center">
                  <div className="text-2xl font-bold text-white">{anime.details.favourites.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Favorites</div>
                </div>
                <div className="glassmorphic-card p-4 text-center">
                  <div className="text-2xl font-bold text-white">#{anime.details.trending}</div>
                  <div className="text-sm text-gray-400">Trending</div>
                </div>
                <div className="glassmorphic-card p-4 text-center">
                  <div className="text-2xl font-bold text-white">{anime.details.meanScore}%</div>
                  <div className="text-sm text-gray-400">Mean Score</div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="episodes" className="mt-0">
            <motion.div
              key="episodes"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <EpisodeBrowser 
                anime={anime} 
                userProgress={userProgress}
                onEpisodeSelect={onEpisodeSelect}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="stats" className="mt-0">
            <motion.div
              key="stats"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ScoreDistributionChart scores={anime.statisticsScores} />
            </motion.div>
          </TabsContent>

          <TabsContent value="similar" className="mt-0">
            <motion.div
              key="similar"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <RecommendationsCarousel recommendations={anime.recommendations} />
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}