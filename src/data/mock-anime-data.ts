import { AnimeDetailType, UserWatchProgress } from '@/types/content.types';

export const mockAnimeData: AnimeDetailType = {
  id: 1,
  slug: 'jujutsu-kaisen',
  title: {
    romaji: 'Jujutsu Kaisen',
    english: 'Jujutsu Kaisen',
    native: '呪術廻戦'
  },
  coverImageUrl: 'https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg',
  bannerImageUrl: 'https://images.pexels.com/photos/4123914/pexels-photo-4123914.jpeg',
  releaseYear: 2020,
  status: 'RELEASING',
  rating: 8.7,
  description: 'In a world where cursed spirits feed on unsuspecting humans, fragments of the legendary and feared demon Ryomen Sukuna have been lost and scattered about. Should any demon consume Sukuna\'s body parts, the power they gain could destroy the world as we know it. Fortunately, there exists a mysterious school of jujutsu sorcerers who exist to protect the precarious existence of the living from the supernatural!',
  colorPalette: {
    vibrant: '#E53E3E',
    muted: '#68D391',
    dark: '#1A202C',
    light: '#F7FAFC',
    accent: '#9F7AEA'
  },
  episodes: [
    // Season 1 Episodes
    ...Array.from({ length: 24 }, (_, i) => ({
      id: 101 + i,
      seasonNumber: 1,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}: ${['Ryomen Sukuna', 'For Myself', 'Girl of Steel', 'Curse Womb Must Die', 'Curse Womb Must Die -II-', 'After Rain', 'Assault', 'Boredom', 'Small Fry and Reverse Punishment', 'Idle Transfiguration', 'Narrow-minded', 'To You, Someday', 'Tomorrow', 'Kyoto Sister School Exchange Event - Group Battle 0 -', 'Kyoto Sister School Exchange Event - Group Battle 1 -', 'Kyoto Sister School Exchange Event - Group Battle 2 -', 'Kyoto Sister School Exchange Event - Group Battle 3 -', 'Sage', 'Black Flash', 'Nonstandard', 'Jujutsu Koshien', 'The Origin of Blind Obedience', 'The Origin of Blind Obedience -II-', 'Accomplices'][i] || `Unknown Title`}`,
      thumbnailUrl: `https://images.pexels.com/photos/${4123897 + (i % 10)}/pexels-photo-${4123897 + (i % 10)}.jpeg?auto=compress&cs=tinysrgb&w=400`,
      duration: 1420,
      isFiller: false,
      isRecap: false,
      airDate: new Date(2020, 9, 3 + i * 7).toISOString(),
      description: `Episode ${i + 1} of Jujutsu Kaisen Season 1`
    })),
    // Season 2 Episodes
    ...Array.from({ length: 23 }, (_, i) => ({
      id: 201 + i,
      seasonNumber: 2,
      episodeNumber: i + 1,
      title: `Episode ${i + 1}: ${['Hidden Inventory', 'Hidden Inventory 2', 'Hidden Inventory 3', 'Hidden Inventory 4', 'Premature Death', 'It\'s Like That', 'Evening Festival', 'The Shibuya Incident', 'Pandemonium', 'Dagon', 'Red Scale', 'Fluctuations', 'Fluctuations II', 'Fluctuations III', 'Thunderclap', 'Thunderclap II', 'Thunderclap III', 'Right and Wrong', 'Right and Wrong II', 'Right and Wrong III', 'Metamorphosis', 'Metamorphosis II', 'Constant'][i] || `Unknown Title`}`,
      thumbnailUrl: `https://images.pexels.com/photos/${4123900 + (i % 15)}/pexels-photo-${4123900 + (i % 15)}.jpeg?auto=compress&cs=tinysrgb&w=400`,
      duration: 1440,
      isFiller: false,
      isRecap: false,
      airDate: new Date(2023, 6, 6 + i * 7).toISOString(),
      description: `Episode ${i + 1} of Jujutsu Kaisen Season 2`
    }))
  ],
  seasons: [
    {
      number: 1,
      title: 'Jujutsu Kaisen',
      episodeCount: 24,
      year: 2020,
      status: 'FINISHED'
    },
    {
      number: 2,
      title: 'Jujutsu Kaisen Season 2',
      episodeCount: 23,
      year: 2023,
      status: 'FINISHED'
    }
  ],
  statisticsScores: [
    { score: 10, count: 45210, percentage: 28.5 },
    { score: 9, count: 38950, percentage: 24.6 },
    { score: 8, count: 32180, percentage: 20.3 },
    { score: 7, count: 22340, percentage: 14.1 },
    { score: 6, count: 12890, percentage: 8.1 },
    { score: 5, count: 4820, percentage: 3.0 },
    { score: 4, count: 1650, percentage: 1.0 },
    { score: 3, count: 420, percentage: 0.3 },
    { score: 2, count: 180, percentage: 0.1 },
    { score: 1, count: 60, percentage: 0.0 }
  ],
  recommendations: [
    {
      id: 2,
      slug: 'demon-slayer',
      title: 'Demon Slayer: Kimetsu no Yaiba',
      coverImageUrl: 'https://images.pexels.com/photos/4123905/pexels-photo-4123905.jpeg',
      reason: 'Similar supernatural action with beautiful animation',
      rating: 8.9,
      genres: ['Action', 'Supernatural', 'Shounen']
    },
    {
      id: 3,
      slug: 'tokyo-ghoul',
      title: 'Tokyo Ghoul',
      coverImageUrl: 'https://images.pexels.com/photos/4123910/pexels-photo-4123910.jpeg',
      reason: 'Dark supernatural themes with internal monster struggles',
      rating: 8.1,
      genres: ['Action', 'Horror', 'Supernatural']
    },
    {
      id: 4,
      slug: 'attack-on-titan',
      title: 'Attack on Titan',
      coverImageUrl: 'https://images.pexels.com/photos/4123915/pexels-photo-4123915.jpeg',
      reason: 'Intense action and complex character development',
      rating: 9.2,
      genres: ['Action', 'Drama', 'Fantasy']
    },
    {
      id: 5,
      slug: 'my-hero-academia',
      title: 'My Hero Academia',
      coverImageUrl: 'https://images.pexels.com/photos/4123920/pexels-photo-4123920.jpeg',
      reason: 'School setting with supernatural powers and growth',
      rating: 8.5,
      genres: ['Action', 'School', 'Superhero']
    },
    {
      id: 6,
      slug: 'fullmetal-alchemist',
      title: 'Fullmetal Alchemist: Brotherhood',
      coverImageUrl: 'https://images.pexels.com/photos/4123925/pexels-photo-4123925.jpeg',
      reason: 'Masterful storytelling with supernatural elements',
      rating: 9.5,
      genres: ['Action', 'Adventure', 'Drama']
    },
    {
      id: 7,
      slug: 'mob-psycho',
      title: 'Mob Psycho 100',
      coverImageUrl: 'https://images.pexels.com/photos/4123930/pexels-photo-4123930.jpeg',
      reason: 'Psychic abilities and character growth',
      rating: 8.8,
      genres: ['Action', 'Comedy', 'Supernatural']
    },
    {
      id: 8,
      slug: 'chainsaw-man',
      title: 'Chainsaw Man',
      coverImageUrl: 'https://images.pexels.com/photos/4123935/pexels-photo-4123935.jpeg',
      reason: 'Dark supernatural action with unique premise',
      rating: 8.3,
      genres: ['Action', 'Horror', 'Supernatural']
    },
    {
      id: 9,
      slug: 'bleach',
      title: 'Bleach',
      coverImageUrl: 'https://images.pexels.com/photos/4123940/pexels-photo-4123940.jpeg',
      reason: 'Soul reapers and spiritual battles',
      rating: 8.0,
      genres: ['Action', 'Supernatural', 'Shounen']
    },
    {
      id: 10,
      slug: 'hunter-x-hunter',
      title: 'Hunter x Hunter',
      coverImageUrl: 'https://images.pexels.com/photos/4123945/pexels-photo-4123945.jpeg',
      reason: 'Complex power system and character development',
      rating: 9.1,
      genres: ['Action', 'Adventure', 'Fantasy']
    },
    {
      id: 11,
      slug: 'one-piece',
      title: 'One Piece',
      coverImageUrl: 'https://images.pexels.com/photos/4123950/pexels-photo-4123950.jpeg',
      reason: 'Epic adventure with unique abilities',
      rating: 8.7,
      genres: ['Action', 'Adventure', 'Comedy']
    }
  ],
  details: {
    studio: 'Studio MAPPA',
    source: 'Manga',
    episodeCount: 47,
    episodeDuration: 24,
    genres: ['Action', 'School', 'Shounen', 'Supernatural'],
    tags: ['Curses', 'Demons', 'Magic', 'Martial Arts', 'School Life', 'Urban Fantasy'],
    meanScore: 87,
    popularity: 158420,
    trending: 15,
    favourites: 89320
  }
};

export const mockUserProgress: UserWatchProgress = {
  lastWatchedEpisodeId: 104,
  watchedEpisodes: new Map([
    [101, { secondsWatched: 1420, fullyWatched: true, watchedAt: new Date('2024-01-15') }],
    [102, { secondsWatched: 1420, fullyWatched: true, watchedAt: new Date('2024-01-16') }],
    [103, { secondsWatched: 1420, fullyWatched: true, watchedAt: new Date('2024-01-17') }],
    [104, { secondsWatched: 850, fullyWatched: false, watchedAt: new Date('2024-01-18') }]
  ]),
  bookmarked: true,
  rating: 9,
  status: 'WATCHING'
};