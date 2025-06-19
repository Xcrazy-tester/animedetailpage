// frontend/src/components/detail/HeroSection.tsx (or wherever you placed it)
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PlayIcon, BookmarkIcon } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkOutlineIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { AnimeDetailType, UserWatchProgress } from '@/types/content.types'; // Assuming these types are correctly defined
import { cn } from '@/lib/utils'; // Assuming cn utility is available
import { AuroraBackground } from '@/components/effects/aurora-background'; // Assuming this path is correct
import { Play, Share, Star, Calendar, Monitor } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
// import { InteractiveGroup } from '@/components/ui/InteractiveGroup'; // This was commented out in your code, keeping it so
import dynamic from 'next/dynamic';
import Head from 'next/head'; // For SEO and page title

// Lazy-load ParticleBackground
const LazyParticleBackground = dynamic(
  () => import('@/components/effects/particle-background').then(mod => mod.ParticleBackground), // Assuming this path is correct
  { ssr: false }
);

interface HeroSectionProps {
  anime: AnimeDetailType & { 
    tagline?: string; 
    // Ensure colorPalette is part of AnimeDetailType or explicitly added here
    colorPalette: { vibrant: string; accent: string; muted: string; }; 
  };
  userProgress?: UserWatchProgress; // Assuming UserWatchProgress includes 'bookmarked' and 'lastWatchedEpisodeId'
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
  // Parallax for the main content area, not just the background image
  const contentY = useTransform(scrollY, [0, 500], [0, 50]); // Content moves up slower
  const bannerY = useTransform(scrollY, [0, 500], [0, 150]); // Background banner moves more
  const bannerScale = useTransform(scrollY, [0, 300], [1, 1.15]); // Scale banner slightly on scroll

  const [imageLoaded, setImageLoaded] = useState(false);
  const [showParticle, setShowParticle] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShowParticle(true),
      { rootMargin: '200px' }
    );
    if (wrapperRef.current) obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    {
      label: 'Score',
      value: anime.rating?.toFixed(1) || 'N/A', // Added null check for rating
      icon: <Star className="h-4 w-4 text-yellow-400" />,
      tooltip: 'Average user rating',
    },
    {
      label: 'Episodes',
      value: anime.details.episodeCount?.toString() || 'N/A', // Added null check
      icon: <Play className="h-4 w-4 text-blue-400" />,
      tooltip: 'Total episodes released',
    },
    {
      label: 'Studio',
      value: anime.details.studio || 'Unknown', // Added fallback
      icon: <Monitor className="h-4 w-4 text-purple-400" />,
      tooltip: 'Production studio',
    },
    {
      label: 'Year',
      value: anime.releaseYear?.toString() || 'N/A', // Added null check
      icon: <Calendar className="h-4 w-4 text-green-400" />,
      tooltip: 'Year of release',
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly faster stagger
        delayChildren: 0.2,  // Slightly earlier delay
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Reduced y offset
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5, // Slightly faster duration
        ease: 'easeOut',
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  // Structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TVSeries', // Or 'Movie' if anime.type is MOVIE
    name: anime.title.english || anime.title.romaji,
    image: anime.coverImageUrl,
    description: anime.description,
    genre: anime.details.genres,
    datePublished: anime.releaseYear?.toString(), // Added null check
    // Add aggregateRating if you have score and ratingCount
    ...(anime.rating && anime.details.ratingCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: anime.rating.toFixed(1),
        ratingCount: anime.details.ratingCount,
      },
    }),
    // Add numberOfEpisodes if available
    ...(anime.details.episodeCount && {
      numberOfEpisodes: anime.details.episodeCount,
    }),
    // Add director or creator if available
    // ...(anime.staff?.find(s => s.role === 'Director')?.name && {
    //   director: {
    //     '@type': 'Person',
    //     name: anime.staff.find(s => s.role === 'Director')!.name,
    //   },
    // }),
  };

  return (
    <>
      <Head>
        <title>{`${anime.title.english || anime.title.romaji} | BlueOceanZ`}</title> {/* Assuming BlueOceanZ is your site name */}
        <meta name="description" content={anime.description?.substring(0, 160) || `Watch ${anime.title.english || anime.title.romaji} on BlueOceanZ.`} />
        <meta property="og:title" content={`${anime.title.english || anime.title.romaji} | BlueOceanZ`} />
        <meta property="og:description" content={anime.description?.substring(0, 160) || `Details and episodes for ${anime.title.english || anime.title.romaji}.`} />
        <meta property="og:image" content={anime.bannerImageUrl || anime.coverImageUrl} />
        <meta property="og:type" content={anime.type === 'MOVIE' ? 'video.movie' : 'video.tv_show'} />
        {/* Add more OG tags like site_name, url etc. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="anime-jsonld" // Added key for React
        />
      </Head>

      <motion.div // This is the main wrapper from your provided code
        layout // Keep layout if you have dynamic height changes not handled by AnimatePresence
        ref={wrapperRef}
        className="relative h-screen min-h-[700px] sm:min-h-[750px] md:min-h-[800px] w-full overflow-hidden 
                   flex flex-col"
      >
        {/* Background Effects */}
        <AuroraBackground
          colors={anime.colorPalette ? [
            anime.colorPalette.vibrant,
            anime.colorPalette.accent,
            anime.colorPalette.muted,
          ] : ['#00A4CC', '#2A4858', '#A4D4AE'] } // Fallback colors
          className="absolute inset-0 opacity-80 dark:opacity-60" // Adjusted opacity
        />
        {showParticle && ( // Conditionally render based on intersection observer
          <LazyParticleBackground
            config={{
              count: 25, // Reduced count slightly
              colors: anime.colorPalette ? [anime.colorPalette.vibrant, anime.colorPalette.accent] : ['#00A4CC', '#2A4858'], // Fallback
              opacity: { min: 0.05, max: 0.25 }, // Adjusted opacity
            }}
          />
        )}

        {/* Mobile Share Button */}
        <div className="absolute top-4 right-4 z-30 sm:hidden"> {/* Increased z-index */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Share this anime"
            // onClick={() => { /* Implement share functionality */ }}
          >
            <Share className="h-5 w-5" />
          </button>
        </div>

        {/* Banner Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0" // Ensure banner is behind content
          style={{ y: bannerY, scale: bannerScale }}
        >
          <div className="relative w-full h-full">
            {anime.bannerImageUrl && ( // Conditionally render banner
              <Image
                src={anime.bannerImageUrl}
                alt={`Banner for ${anime.title.romaji}`}
                fill
                priority
                placeholder="blur" // Use blur placeholder
                blurDataURL={anime.bannerImageUrl} // Simple blurDataURL, can be improved
                className={cn(
                  'object-cover transition-opacity duration-1000',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setImageLoaded(true)}
              />
            )}
            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-10" /> {/* Stronger bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50 z-10 hidden md:block" /> {/* Side fades for wider screens */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 z-10" /> Top fade can be subtle or removed
          </div>
        </motion.div>

        {/* Content - This will also have a parallax effect but less than the banner */}
        <motion.div
            className="relative z-20 flex flex-col w-full mt-auto"
            style={{ y: contentY }} // Apply parallax to content
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
                       pb-28 sm:pb-32 md:pb-36 lg:pb-40" > {/* Max width container for content */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-x-6 lg:gap-x-8 xl:gap-x-12">
        
              {/* Cover Image - Spans more on larger screens for better balance */}
              <motion.div
                className="md:col-span-4 lg:col-span-3 w-40 sm:w-48 md:w-56 lg:w-60 mx-auto md:mx-0" // Adjusted widths
                variants={itemVariants}
              >
                <div className="relative group aspect-[2/3]"> {/* Use aspect ratio for consistency */}
                  {anime.coverImageUrl && ( // Conditionally render cover
                    <Image
                      src={anime.coverImageUrl}
                      alt={`Cover for ${anime.title.romaji}`}
                      fill
                      className="object-cover rounded-lg md:rounded-xl shadow-2xl transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                  )}
                  {/* Optional: Subtle inner shadow or border on hover */}
                  <div className="absolute inset-0 rounded-lg md:rounded-xl ring-1 ring-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                </div>
              </motion.div>

              {/* Title and Details - Takes remaining space */}
              <motion.div 
                className="md:col-span-7 lg:col-span-8 xl:col-span-9 
                           space-y-4 md:space-y-5 text-center md:text-left mt-6 md:mt-0" 
                variants={itemVariants} // Apply itemVariants to the whole block
              >
                {/* Title Block */}
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                    {anime.title.english || anime.title.romaji}
                  </h1>
                  {anime.title.english && anime.title.romaji !== anime.title.english && (
                    <p className="text-md sm:text-lg text-gray-300 font-medium drop-shadow-sm">
                      {anime.title.romaji}
                    </p>
                  )}
                  {anime.title.native && (
                    <p className="text-sm sm:text-base text-gray-400 drop-shadow-sm">
                      {anime.title.native}
                    </p>
                  )}
                </div>

                {/* Genres */}
                {anime.details.genres && anime.details.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {anime.details.genres.slice(0, 5).map((genre) => ( // Show up to 5 genres
                      <span
                        key={genre}
                        className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs sm:text-sm text-gray-200"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Tagline if exists */}
                {anime.tagline && (
                  <motion.p 
                    className="text-lg text-gray-300 italic"
                    variants={itemVariants} // Stagger this in
                  >
                    “{anime.tagline}”
                  </motion.p>
                )}

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2"
                  // variants={itemVariants} // This was causing double animation, let children handle
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="group relative p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-center shadow-sm transition-all duration-300 cursor-default hover:bg-white/10"
                      variants={statItemVariants} // Use specific variants for stats
                      custom={index} // Pass index for staggered delay
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.03 }}
                    >
                      <Tooltip.Provider delayDuration={100}>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <div className="flex justify-center mb-1 sm:mb-2">
                              {stat.icon}
                            </div>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              side="top" align="center" sideOffset={5}
                              className="z-50 text-xs px-2 py-1 rounded-md bg-black/70 border border-white/10 text-white backdrop-blur-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                            >
                              {stat.tooltip}
                              <Tooltip.Arrow className="fill-black/70" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                      <div className="text-base sm:text-lg font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4 justify-center md:justify-start"
                  variants={itemVariants} // Stagger this block
                >
                  <motion.button
                    onClick={onPlayClick}
                    aria-label="Play or continue watching"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
                    whileHover={{ scale: 1.03, boxShadow: `0 0 15px hsla(var(--primary-hsl), 0.5)` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PlayIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    {userProgress?.lastWatchedEpisodeId ? 'Continue Watching' : 'Start Watching'}
                  </motion.button>

                  <motion.button
                    onClick={onBookmarkToggle}
                    aria-label={userProgress?.bookmarked ? 'Remove Bookmark' : 'Add to List'}
                    className={cn(
                      "w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl bg-white/10 border border-white/20 text-gray-200 shadow-md hover:bg-white/20 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black",
                      userProgress?.bookmarked && 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10'
                    )}
                    whileHover={{ scale: 1.03, boxShadow: userProgress?.bookmarked ? `0 0 15px hsla(48,96%,50%,0.4)` : `0 0 15px hsla(0,0%,100%,0.2)` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {userProgress?.bookmarked ? (
                      <BookmarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <BookmarkOutlineIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                    {userProgress?.bookmarked ? 'Bookmarked' : 'Add to List'}
                  </motion.button>

                  <Tooltip.Provider delayDuration={100}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <motion.button
                          aria-label="Share this anime"
                          className="hidden sm:flex w-auto items-center justify-center gap-2 sm:gap-3 px-5 py-3 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl bg-white/10 border border-white/20 text-gray-200 shadow-md hover:bg-white/20 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                          whileHover={{ scale: 1.03, boxShadow: `0 0 15px hsla(0,0%,100%,0.2)` }}
                          whileTap={{ scale: 0.98 }}
                          // onClick={() => { /* Implement share functionality */ }}
                        >
                          <Share className="h-5 w-5 sm:h-6 sm:w-6" />
                          <span className="hidden md:inline">Share</span>
                        </motion.button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="top" align="center" sideOffset={5}
                          className="z-50 text-xs px-2 py-1 rounded-md bg-black/70 border border-white/10 text-white backdrop-blur-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                        >
                          Share this anime
                          <Tooltip.Arrow className="fill-black/70" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </motion.div>
              </motion.div> {/* End Title and Details block */}
            </div> {/* End Grid */}
          </div> {/* End Max Width Container */}
        </motion.div> {/* End Content Parallax Wrapper */}

        {/* Scroll Down Indicator */}
        <motion.div
          style={{ opacity: useTransform(scrollY, [0, 100, 250], [1, 1, 0]) }} // Fade out faster
          className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center z-20 pointer-events-none"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center items-start pt-1.5">
            <motion.div
              className="w-1 h-2.5 bg-white/70 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="mt-2 text-xs text-white/60">Scroll Down</span>
        </motion.div>
      </motion.div> {/* End Main Wrapper */}
    </>
  );
}