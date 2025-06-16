/**
 * Core type definitions for anime content and user interactions
 */

export interface AnimeDetailType {
  id: number;
  slug: string;
  title: {
    romaji: string;
    english: string | null;
    native: string;
  };
  coverImageUrl: string;
  bannerImageUrl: string;
  releaseYear: number;
  status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS';
  rating: number;
  description: string;
  colorPalette: {
    vibrant: string;
    muted: string;
    dark: string;
    light: string;
    accent: string;
  };
  episodes: Episode[];
  seasons: Season[];
  statisticsScores: ScoreDistribution[];
  recommendations: Recommendation[];
  details: {
    studio: string;
    source: string;
    episodeCount: number;
    episodeDuration: number;
    genres: string[];
    tags: string[];
    meanScore: number;
    popularity: number;
    trending: number;
    favourites: number;
  };
}

export interface Episode {
  id: number;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  thumbnailUrl: string;
  duration: number;
  isFiller: boolean;
  isRecap: boolean;
  airDate: string;
  description?: string;
}

export interface Season {
  number: number;
  title: string;
  episodeCount: number;
  year: number;
  status: string;
}

export interface ScoreDistribution {
  score: number;
  count: number;
  percentage: number;
}

export interface Recommendation {
  id: number;
  slug: string;
  title: string;
  coverImageUrl: string;
  reason: string;
  rating: number;
  genres: string[];
}

export interface UserWatchProgress {
  lastWatchedEpisodeId: number | null;
  watchedEpisodes: Map<number, {
    secondsWatched: number;
    fullyWatched: boolean;
    watchedAt: Date;
  }>;
  bookmarked: boolean;
  rating: number | null;
  status: 'WATCHING' | 'COMPLETED' | 'PLAN_TO_WATCH' | 'DROPPED' | 'PAUSED' | null;
}

export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
      staggerChildren?: number;
    };
  };
}

export interface ParticleConfig {
  count: number;
  size: {
    min: number;
    max: number;
  };
  speed: {
    min: number;
    max: number;
  };
  opacity: {
    min: number;
    max: number;
  };
  colors: string[];
}