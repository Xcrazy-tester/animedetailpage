'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/ui/navbar';
import { HeroSection } from '@/components/detail/hero-section';
import { ContentTabs } from '@/components/detail/content-tabs';
import { HeroSkeleton } from '@/components/ui/loading-skeleton';
import { useAnime } from '@/hooks/use-anime';

interface DetailPageClientViewProps {
  slug: string;
}

export function DetailPageClientView({ slug }: DetailPageClientViewProps) {
  const { anime, userProgress, loading, error, toggleBookmark, markEpisodeWatched } = useAnime(slug);

  const handlePlayClick = () => {
    if (anime) {
      const nextEpisode = userProgress?.lastWatchedEpisodeId 
        ? anime.episodes.find(ep => ep.id === userProgress.lastWatchedEpisodeId + 1) || anime.episodes[0]
        : anime.episodes[0];
      
      if (nextEpisode) {
        console.log('Playing episode:', nextEpisode.title);
        // In a real app, this would navigate to the video player
      }
    }
  };

  const handleEpisodeSelect = (episodeId: number) => {
    console.log('Selected episode:', episodeId);
    // In a real app, this would navigate to the video player
    
    // Mock marking episode as watched
    markEpisodeWatched(episodeId, 1420, true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Navbar />
        <HeroSkeleton />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="text-4xl font-bold text-white">Anime Not Found</h1>
            <p className="text-gray-400">
              {error || 'The anime you are looking for does not exist.'}
            </p>
            <motion.button
              onClick={() => window.history.back()}
              className="neumorphic-button-primary px-6 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go Back
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={anime.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection
            anime={anime}
            userProgress={userProgress}
            onBookmarkToggle={toggleBookmark}
            onPlayClick={handlePlayClick}
          />
          
          <ContentTabs
            anime={anime}
            userProgress={userProgress}
            onEpisodeSelect={handleEpisodeSelect}
          />
        </motion.main>
      </AnimatePresence>
    </motion.div>
  );
}