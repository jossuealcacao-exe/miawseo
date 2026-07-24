import type { MetadataRoute } from 'next';
import { breedSlugs } from '@/data/breeds';
import { historySlugs } from '@/data/history';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/michiteca', '/michi-plaza', '/nosotros'].map((r) => ({
    url: `${SITE_URL}${r}`,
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1 : 0.8,
  }));

  const breedRoutes = breedSlugs().flatMap((slug) => [
    { url: `${SITE_URL}/michiteca/${slug}`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/michi-plaza/${slug}`, changeFrequency: 'weekly' as const, priority: 0.5 },
  ]);

  const historyRoutes = historySlugs().map((slug) => ({
    url: `${SITE_URL}/historia/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...breedRoutes, ...historyRoutes];
}
