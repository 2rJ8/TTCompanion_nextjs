import '../src/styles/global.css'

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://tabletopcompanion.app',
  ),
  title: {
    default: 'Table Top Companion | Descubre tu próximo juego de mesa',
    template: '%s | Table Top Companion',
  },
  description:
    'Descubre juegos de mesa, compara mecánicas y encuentra tu próxima partida con la comunidad de Table Top Companion.',
  applicationName: 'Table Top Companion',
  keywords: [
    'juegos de mesa',
    'recomendaciones de juegos de mesa',
    'reseñas de juegos de mesa',
    'juegos de mesa para jugar',
    'comunidad de juegos de mesa',
  ],
  authors: [{ name: 'Table Top Companion' }],
  creator: 'Table Top Companion',
  publisher: 'Table Top Companion',
  category: 'Juegos de mesa',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'Table Top Companion',
    title: 'Table Top Companion | Descubre tu próximo juego de mesa',
    description:
      'Explora juegos de mesa, lee opiniones de la comunidad y organiza tu próxima partida.',
    images: [
      {
        url: '/assets/images/generic-board-game.svg',
        width: 1200,
        height: 630,
        alt: 'Ilustración de un juego de mesa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Table Top Companion | Descubre tu próximo juego de mesa',
    description:
      'Explora juegos de mesa, lee opiniones de la comunidad y organiza tu próxima partida.',
    images: ['/assets/images/generic-board-game.svg'],
  },
  icons: {
    icon: '/assets/images/App_Icon.svg',
    shortcut: '/assets/images/App_Icon.svg',
    apple: '/assets/images/App_Icon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
