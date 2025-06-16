'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRightIcon, PlayIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Navbar } from '@/components/ui/navbar';
import { AuroraBackground } from '@/components/effects/aurora-background';

export default function Home() {
  const router = useRouter();

  const navigateToDemo = () => {
    router.push('/anime/jujutsu-kaisen');
  };

  const navigateToAnimeDetail = () => {
    router.push('/anime/jujutsu-kaisen');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <Navbar />
      
      {/* Background Effects */}
      <AuroraBackground className="absolute inset-0" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <SparklesIcon className="h-8 w-8 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-lg">Premium Experience</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Anime Detail Page
              </span>
              <br />
              <span className="text-white">
                Prototype
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience a cinematic anime detail page with glassmorphism, advanced animations, 
              and production-ready UI components inspired by industry-leading designs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={navigateToDemo}
                className="neumorphic-button-primary flex items-center gap-3 px-8 py-4 text-lg font-semibold group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayIcon className="h-6 w-6" />
                View Demo
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={navigateToAnimeDetail}
                className="neumorphic-button-secondary flex items-center gap-3 px-8 py-4 text-lg font-semibold group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRightIcon className="h-6 w-6" />
                Go to Anime Detail
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.div
                className="flex items-center gap-4 text-gray-400"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-px h-8 bg-gray-600" />
                <div className="text-sm">
                  <div className="font-semibold text-white">Jujutsu Kaisen</div>
                  <div>Featured Anime</div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              {[
                {
                  title: 'Modern UI/UX',
                  description: 'Glassmorphism, neumorphism, and aurora effects',
                  icon: '✨'
                },
                {
                  title: 'Performance',
                  description: 'Optimized animations and responsive design',
                  icon: '⚡'
                },
                {
                  title: 'Accessibility',
                  description: 'WCAG 2.1 AA compliant with full keyboard support',
                  icon: '♿'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="glassmorphic-card p-6 text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}