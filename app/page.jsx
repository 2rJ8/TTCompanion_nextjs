import TableTopApp from '../src/components/TableTopApp'
import { games } from '../src/data/games'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tabletopcompanion.app'

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Table Top Companion',
    url: siteUrl,
    description:
      'Descubre juegos de mesa, compara mecánicas y encuentra tu próxima partida con la comunidad.',
    inLanguage: 'es-ES',
  }
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Table Top Companion',
    url: siteUrl,
    logo: `${siteUrl}/assets/images/App_Icon.svg`,
  }
  const catalogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catálogo de juegos de mesa',
    description: 'Juegos de mesa recomendados por la comunidad de Table Top Companion.',
    numberOfItems: games.length,
    itemListElement: games.map((game, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/#game/${game.slug}`,
      name: game.name,
    })),
  }

  return (
    <>
      {[jsonLd, organizationJsonLd, catalogJsonLd].map((structuredData) => (
        <script
          key={structuredData['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
      ))}
      <TableTopApp />
    </>
  )
}
