import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetailPageClientView } from './detail-page-client-view';
import { mockAnimeData } from '@/data/mock-anime-data';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Normalize the slug for comparison
  const normalizedSlug = params.slug.toLowerCase().trim();
  
  // In a real app, you'd fetch this data from an API
  if (normalizedSlug !== 'jujutsu-kaisen') {
    return {
      title: 'Anime Not Found',
    };
  }

  const anime = mockAnimeData;

  return {
    title: `${anime.title.english || anime.title.romaji} | FlixOra`,
    description: anime.description.slice(0, 160) + '...',
    openGraph: {
      title: anime.title.english || anime.title.romaji,
      description: anime.description,
      images: [
        {
          url: anime.bannerImageUrl,
          width: 1200,
          height: 630,
          alt: anime.title.romaji,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: anime.title.english || anime.title.romaji,
      description: anime.description,
      images: [anime.bannerImageUrl],
    },
  };
}

export default function AnimePage({ params }: PageProps) {
  // Normalize the slug for comparison
  const normalizedSlug = params.slug.toLowerCase().trim();
  
  if (normalizedSlug !== 'jujutsu-kaisen') {
    notFound();
  }

  return <DetailPageClientView slug={params.slug} />;
}

export function generateStaticParams() {
  return [
    { slug: 'jujutsu-kaisen' },
  ];
}