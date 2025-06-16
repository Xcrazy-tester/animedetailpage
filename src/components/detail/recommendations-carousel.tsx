'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Recommendation } from '@/types/content.types';
import { cn } from '@/lib/utils';

interface RecommendationsCarouselProps {
  recommendations: Recommendation[];
}

export function RecommendationsCarousel({ recommendations }: RecommendationsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const x = useTransform(scrollXProgress, [0, 1], [0, -100]);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, recommendations.length - itemsPerView);

  const scrollToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);
    
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / recommendations.length;
      scrollRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => scrollToIndex(currentIndex + 1);
  const prevSlide = () => scrollToIndex(currentIndex - 1);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="glassmorphic-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Recommended for You</h3>
          
          {/* Navigation Controls */}
          <div className="flex gap-2">
            <motion.button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                currentIndex === 0
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
              whileHover={{ scale: currentIndex === 0 ? 1 : 1.05 }}
              whileTap={{ scale: currentIndex === 0 ? 1 : 0.95 }}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                currentIndex >= maxIndex
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
              whileHover={{ scale: currentIndex >= maxIndex ? 1 : 1.05 }}
              whileTap={{ scale: currentIndex >= maxIndex ? 1 : 0.95 }}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ x }}
          >
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                className="flex-shrink-0 w-64 group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  {/* Cover Image */}
                  <div className="aspect-[3/4] overflow-hidden rounded-xl mb-4 relative">
                    <Image
                      src={recommendation.coverImageUrl}
                      alt={recommendation.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/80 rounded-full text-xs text-white">
                      <StarIcon className="h-3 w-3 text-yellow-400" />
                      {recommendation.rating}
                    </div>

                    {/* Quick Info on Hover */}
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-wrap gap-1 mb-2">
                        {recommendation.genres.slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full text-white"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Title and Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                      {recommendation.title}
                    </h4>
                    
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {recommendation.reason}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{recommendation.genres.join(', ')}</span>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10 blur-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(recommendations.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index * itemsPerView)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  Math.floor(currentIndex / itemsPerView) === index
                    ? "bg-blue-400 w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}