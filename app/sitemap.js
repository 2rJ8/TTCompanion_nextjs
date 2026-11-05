const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tabletopcompanion.app'

export default function sitemap() {
  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
