import type { MetadataRoute } from 'next';
import { breedSlugs } from '@/data/breeds';

const BASE = 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/michiteca', '/michi-plaza', '/nosotros'].map((r) => ({
    url: `${BASE}${r}`,
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1 : 0.8,
  }));

  const breedRoutes = breedSlugs().flatMap((slug) => [
    { url: `${BASE}/michiteca/${slug}`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/michi-plaza/${slug}`, changeFrequency: 'weekly' as const, priority: 0.5 },
  ]);

  return [...staticRoutes, ...breedRoutes];
}
