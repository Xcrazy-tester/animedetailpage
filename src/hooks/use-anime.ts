'use client';

import { useState, useEffect } from 'react';
import { AnimeDetailType, UserWatchProgress } from '@/types/content.types';
import { mockAnimeData, mockUserProgress } from '@/data/mock-anime-data';

export function useAnime(slug: string) {
  const [anime, setAnime] = useState<AnimeDetailType | null>(null);
  const [userProgress, setUserProgress] = useState<UserWatchProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (slug === 'jujutsu-kaisen') {
          console.log('useAnime: Setting mock data for jujutsu-kaisen'); // Added log
          setAnime(mockAnimeData);
          setUserProgress(mockUserProgress);
        } else {
          console.log('useAnime: Slug not found', { slug }); // Added log
          setError('Anime not found');
        }
      } catch (err) {
        console.error('useAnime: Error fetching anime', err); // Added error log
        setError('Failed to fetch anime data');
      } finally {
        setLoading(false);
        console.log('useAnime: Loading set to false'); // Added log
      }
    };

    console.log('useAnime: Running effect for slug:', slug); // Added log
    fetchAnime();
  }, [slug]);

  const updateUserProgress = (updates: Partial<UserWatchProgress>) => {
    if (userProgress) {
      setUserProgress({ ...userProgress, ...updates });
    }
  };

  const toggleBookmark = () => {
    if (userProgress) {
      updateUserProgress({ bookmarked: !userProgress.bookmarked });
    }
  };

  const updateWatchStatus = (status: UserWatchProgress['status']) => {
    updateUserProgress({ status });
  };

  const markEpisodeWatched = (episodeId: number, secondsWatched: number, fullyWatched: boolean) => {
    if (userProgress) {
      const newWatchedEpisodes = new Map(userProgress.watchedEpisodes);
      newWatchedEpisodes.set(episodeId, {
        secondsWatched,
        fullyWatched,
        watchedAt: new Date()
      });

      updateUserProgress({
        watchedEpisodes: newWatchedEpisodes,
        lastWatchedEpisodeId: fullyWatched ? episodeId : userProgress.lastWatchedEpisodeId
      });
    }
  };

  return {
    anime,
    userProgress,
    loading,
    error,
    updateUserProgress,
    toggleBookmark,
    updateWatchStatus,
    markEpisodeWatched
  };
}