# Estrategias SEO implementadas en Table Top Companion

## 1. Objetivo

Table Top Companion es una web en español para descubrir juegos de mesa,
consultar sus características y compartir opiniones con la comunidad. La
implementación SEO busca que el proyecto sea comprensible para los buscadores,
que sus enlaces se presenten correctamente al compartirlos y que el contenido
principal sea accesible tanto para usuarios como para tecnologías de asistencia.

La mayor parte de la configuración SEO se centraliza en el App Router de
Next.js, especialmente en [`app/layout.jsx`](../app/layout.jsx) y
[`app/page.jsx`](../app/page.jsx).

## 2. SEO técnico

### Metadatos globales

En [`app/layout.jsx`](../app/layout.jsx) se define la metadata por defecto de
la aplicación:

- **Título principal:** `Table Top Companion | Descubre tu próximo juego de mesa`.
- **Plantilla de títulos:** permite añadir el nombre de una página seguido de
  `| Table Top Companion`.
- **Descripción:** resume la propuesta de valor de la web e incluye términos
  relacionados con juegos de mesa y recomendaciones.
- **Palabras clave:** se han incluido expresiones como `juegos de mesa`,
  `reseñas de juegos de mesa` y `comunidad de juegos de mesa`.
- **Autor, creador, editor y categoría:** identifican la aplicación como un
  producto especializado en juegos de mesa.
- **`metadataBase`:** utiliza `NEXT_PUBLIC_SITE_URL` y, si no existe, la URL
  `https://tabletopcompanion.app`. Esto permite resolver correctamente las
  URLs relativas de la metadata.

### URL canónica

Se declara `alternates.canonical` con valor `/`. De esta forma se indica cuál
es la versión preferida de la página principal cuando existen variaciones de
URL.

### Directivas para robots

La metadata permite la indexación y el seguimiento de enlaces:

```js
robots: {
  index: true,
  follow: true,
}
```

También se configura el comportamiento específico para Googlebot, incluyendo
previsualizaciones grandes de imágenes y fragmentos de texto sin límite
explícito.

Además, [`app/robots.js`](../app/robots.js) genera `robots.txt` con estas reglas:

- Permite el acceso de todos los rastreadores a `/`.
- Bloquea `/api/` para evitar indexar endpoints internos.
- Publica la ubicación del sitemap en `/sitemap.xml`.

### Sitemap

[`app/sitemap.js`](../app/sitemap.js) genera un sitemap dinámico de Next.js.
Actualmente contiene la URL principal, con una frecuencia de cambio semanal y
prioridad `1`.

## 3. SEO social y compartición

En [`app/layout.jsx`](../app/layout.jsx) se ha configurado:

- **Open Graph** con tipo `website`, idioma `es_ES`, nombre del sitio, título,
  descripción y URL.
- **Imagen social** en
  `/assets/images/generic-board-game.svg`, con dimensiones declaradas de
  `1200x630` y texto alternativo.
- **Twitter Cards** con tipo `summary_large_image`, título, descripción e
  imagen.
- **Iconos de la aplicación** para navegador, acceso directo y dispositivos
  Apple mediante `App_Icon.svg`.

Estas etiquetas mejoran la presentación de los enlaces cuando se comparten en
redes sociales y aplicaciones de mensajería.

## 4. Datos estructurados

[`app/page.jsx`](../app/page.jsx) inserta tres bloques JSON-LD:

1. **`WebSite`:** identifica el sitio, su nombre, URL, descripción e idioma.
2. **`Organization`:** describe la organización responsable y enlaza su
   logotipo.
3. **`ItemList`:** representa el catálogo de juegos, indicando el número de
   elementos y cada juego como `ListItem` con posición, nombre y URL.

Los datos se serializan con `JSON.stringify` y se escapan los caracteres `<`
antes de insertarlos en el documento. Esto evita que el contenido estructurado
pueda cerrar accidentalmente la etiqueta `script`.

## 5. Contenido y estructura semántica

### Jerarquía de encabezados

Las vistas utilizan una jerarquía HTML clara:

- La página de inicio presenta el juego destacado con un `<h1>`.
- El catálogo utiliza `<h1>` para el título de la sección y `<h2>` para el
  bloque de resultados.
- Cada tarjeta de juego usa `<h3>` para el nombre.
- La vista de detalle utiliza el nombre del juego como `<h1>` y organiza el
  contenido con `<h2>` y `<h3>`.
- Las noticias, colecciones y reseñas se agrupan mediante `<section>` y
  encabezados descriptivos.

Ejemplos de implementación:

- [`HeroSection.jsx`](../src/components/home/HeroSection.jsx)
- [`GamesPage.jsx`](../src/components/catalog/GamesPage.jsx)
- [`GameCard.jsx`](../src/components/catalog/GameCard.jsx)
- [`GameDetailPage.jsx`](../src/components/catalog/GameDetailPage.jsx)

### Contenido orientado a búsquedas

El catálogo contiene información útil y específica para cada juego:

- nombre y descripción;
- categoría y mecánicas;
- número de jugadores;
- duración;
- complejidad;
- año de publicación;
- diseñador;
- descripción larga y aspectos destacados.

Los textos se almacenan junto a los datos del catálogo en
[`games.js`](../src/data/games.js). Esto permite mostrar contenido relacionado
con búsquedas como “juegos cooperativos”, “juegos para dos jugadores” o
“juegos de estrategia”.

### Enlaces internos

La aplicación conecta sus secciones mediante enlaces visibles hacia el
catálogo, colecciones, noticias y fichas individuales. Esta estructura facilita
la navegación del usuario y permite descubrir contenido relacionado.

La navegación funcional está implementada en
[`TableTopApp.jsx`](../src/components/TableTopApp.jsx), donde se resuelven las
rutas hash como `#games` y `#game/{slug}`.

## 6. Imágenes y accesibilidad relacionada con SEO

Las imágenes de juegos tienen textos alternativos descriptivos, por ejemplo
`Ilustración de ${game.name}`, en [`GameCard.jsx`](../src/components/catalog/GameCard.jsx)
y [`GameDetailPage.jsx`](../src/components/catalog/GameDetailPage.jsx).

Los logotipos decorativos se marcan con `alt=""` y `aria-hidden="true"` para
evitar que los lectores de pantalla repitan información visual no necesaria.
Los iconos de interfaz también se ocultan de la lectura cuando son
decorativos.

Otros elementos que favorecen la comprensión y accesibilidad del contenido son:

- atributo `lang="es"` en el elemento `<html>`;
- enlace para saltar al contenido principal;
- navegación con `aria-label`;
- formularios con etiquetas asociadas;
- regiones con `aria-live` para resultados y número de reseñas;
- enlaces con nombres accesibles en tarjetas y acciones.

## 7. Aspectos no implementados o mejorables

La documentación distingue entre las estrategias ya implementadas y las
mejoras que podrían aplicarse en una siguiente iteración:

1. **Rutas indexables por juego:** la interfaz usa navegación hash, por lo que
   `#game/arcs` no es una URL independiente para los buscadores. Para mejorar
   el SEO sería recomendable migrar el catálogo y las fichas a rutas reales de
   Next.js, por ejemplo `/juegos/arcs`.
2. **Sitemap completo:** cuando existan rutas reales para cada juego, el sitemap
   debería incluir todas las fichas del catálogo y sus fechas de actualización.
3. **Metadata por ficha:** cada juego podría tener un título, descripción,
   canonical y datos Open Graph generados dinámicamente.
4. **Imagen social dedicada:** convendría usar una imagen raster o una imagen
   social optimizada específicamente para compartir, además del SVG genérico.
5. **Validación externa:** en producción se debería registrar el sitio en
   Google Search Console y comprobar el sitemap, los datos estructurados, la
   indexación y los Core Web Vitals.

Estas mejoras no deben confundirse con funcionalidades ya presentes: la
configuración actual cubre la página principal y establece una base SEO
correcta, pero no convierte las vistas hash en páginas indexables independientes.

## 8. Resumen

Las estrategias SEO implementadas combinan:

- metadata descriptiva y localizada en español;
- URL canónica y configuración de indexación;
- `robots.txt` con bloqueo de API;
- sitemap generado por Next.js;
- Open Graph y Twitter Cards;
- datos estructurados `WebSite`, `Organization` e `ItemList`;
- contenido de catálogo rico en atributos relevantes;
- estructura semántica de encabezados y secciones;
- textos alternativos y mejoras de accesibilidad;
- enlaces internos entre las áreas principales de la aplicación.

Con esta base, Table Top Companion está preparado para una futura migración a
rutas individuales y para una optimización SEO más profunda del catálogo.
