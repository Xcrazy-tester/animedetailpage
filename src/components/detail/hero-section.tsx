'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PlayIcon, BookmarkIcon, ShareIcon, StarIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { AnimeDetailType, UserWatchProgress } from '@/types/content.types';
import { cn } from '@/lib/utils';
import { AuroraBackground } from '@/components/effects/aurora-background';
import { ParticleBackground } from '@/components/effects/particle-background';

interface HeroSectionProps {
  anime: AnimeDetailType;
  userProgress?: UserWatchProgress;
  onBookmarkToggle?: () => void;
  onPlayClick?: () => void;
}

export function HeroSection({ 
  anime, 
  userProgress, 
  onBookmarkToggle, 
  onPlayClick 
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const [imageLoaded, setImageLoaded] = useState(false);

  const stats = [
    {
      label: 'Score',
      value: anime.rating.toFixed(1),
      icon: <StarIcon className="h-6 w-6 text-yellow-400" />,
    },
    {
      label: 'Episodes',
      value: anime.details.episodeCount.toString(),
      icon: <PlayIcon className="h-6 w-6 text-blue-400" />,
    },
    {
      label: 'Studio',
      value: anime.details.studio,
      icon: null,
    },
    {
      label: 'Year',
      value: anime.releaseYear.toString(),
      icon: null,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Effects */}
      <AuroraBackground 
        colors={[anime.colorPalette.vibrant, anime.colorPalette.accent, anime.colorPalette.muted]}
        className="absolute inset-0"
      />
      <ParticleBackground 
        config={{
          count: 30,
          colors: [anime.colorPalette.vibrant, anime.colorPalette.accent],
          opacity: { min: 0.1, max: 0.3 }
        }}
      />

      {/* Banner Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <div className="relative w-full h-full">
          <Image
            src={anime.bannerImageUrl}
            alt={anime.title.romaji}
            fill
            className={cn(
              "object-cover transition-opacity duration-1000",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-end"
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            {/* Cover Image */}
            <motion.div
              className="lg:col-span-1"
              variants={itemVariants}
            >
              <div className="relative group">
                <div className="aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={anime.coverImageUrl}
                    alt={anime.title.romaji}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Glassmorphic overlay with play button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <button
                    onClick={onPlayClick}
                    className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 group/play"
                  >
                    <PlayIcon className="h-8 w-8 ml-1 group-hover/play:scale-110 transition-transform" />
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Title and Details */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                className="space-y-4"
                variants={itemVariants}
              >
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      {anime.title.english || anime.title.romaji}
                    </span>
                  </h1>
                  {anime.title.english && anime.title.romaji !== anime.title.english && (
                    <p className="text-xl text-gray-300 font-medium">
                      {anime.title.romaji}
                    </p>
                  )}
                  <p className="text-lg text-gray-400">
                    {anime.title.native}
                  </p>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {anime.details.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={itemVariants}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="glassmorphic-card p-4 text-center group hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {stat.icon && (
                      <div className="flex justify-center mb-2">
                        {stat.icon}
                      </div>
                    )}
                    <div className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <motion.button
                  onClick={onPlayClick}
                  className="neumorphic-button-primary flex items-center gap-3 px-8 py-4 text-lg font-semibold"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlayIcon className="h-6 w-6" />
                  {userProgress?.lastWatchedEpisodeId ? 'Continue Watching' : 'Start Watching'}
                </motion.button>

                <motion.button
                  onClick={onBookmarkToggle}
                  className={cn(
                    "neumorphic-button-secondary flex items-center gap-3 px-6 py-4 text-lg font-semibold",
                    userProgress?.bookmarked && "text-yellow-400"
                  )}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {userProgress?.bookmarked ? (
                    <BookmarkIcon className="h-6 w-6" />
                  ) : (
                    <BookmarkOutlineIcon className="h-6 w-6" />
                  )}
                  {userProgress?.bookmarked ? 'Bookmarked' : 'Add to List'}
                </motion.button>

                <motion.button
                  className="neumorphic-button-secondary flex items-center gap-3 px-6 py-4 text-lg font-semibold"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShareIcon className="h-6 w-6" />
                  Share
                </motion.button>
              </motion.div>

              {/* Description Preview */}
              <motion.div
                className="max-w-2xl"
                variants={itemVariants}
              >
                <p className="text-gray-300 text-lg leading-relaxed line-clamp-3">
                  {anime.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}