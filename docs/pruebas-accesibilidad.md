# Entrega de pruebas de accesibilidad

## 1. Objetivo de la prueba

Se ha evaluado la accesibilidad de Table Top Companion utilizando la auditoría
de **Lighthouse** integrada en la extensión de Chrome y publicada en
PageSpeed Insights.

El objetivo de la prueba es comprobar que la web puede ser utilizada por
personas con diferentes capacidades, especialmente mediante teclado, lectores
de pantalla y dispositivos con pantallas pequeñas.

## 2. Evidencia del análisis

Informe utilizado:

[Informe de Lighthouse en PageSpeed Insights](https://pagespeed.web.dev/analysis/https-tt-companion-nextjs-vercel-app/rr46sl8gu7?form_factor=desktop&category=performance&category=accessibility&category=best-practices&category=seo&category=agentic-browsing&hl=es&utm_source=lh-chrome-ext)

- Herramienta: Lighthouse mediante la extensión de Chrome.
- Tipo de dispositivo: escritorio (`form_factor=desktop`).
- Fecha del informe: 18 de noviembre de 2026.
- Categoría analizada: Accessibility.
- Categorías adicionales visibles en el informe: Performance, Best Practices,
  SEO y Agentic Browsing.

El enlace corresponde a un informe de laboratorio. No se han incorporado
puntuaciones numéricas en este documento porque el detalle de resultados se
carga dinámicamente en PageSpeed Insights y no se puede verificar de forma
estable desde el código fuente del proyecto. Las comprobaciones descritas a
continuación sí están respaldadas por la implementación actual.

## 3. Criterios de accesibilidad implementados

### Idioma y estructura del documento

En [`app/layout.jsx`](../app/layout.jsx) se declara:

```jsx
<html lang="es">
```

Esto permite que los lectores de pantalla seleccionen correctamente el idioma
de pronunciación. Las vistas principales usan elementos semánticos como
`header`, `nav`, `main`, `section`, `article`, `footer`, `form`, `fieldset` y
`legend`.

### Navegación por teclado

El encabezado, los menús, los enlaces, los botones y los formularios utilizan
elementos HTML nativos que pueden recibir foco mediante teclado.

En [`global.css`](../src/styles/global.css) se aplica un indicador de foco
visible a enlaces, botones, campos y selectores:

```css
:where(a, button, input, select, textarea):focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
```

Además, [`SiteHeader.jsx`](../src/components/layout/SiteHeader.jsx) permite:

- abrir y cerrar el menú móvil con un botón;
- comunicar el estado del menú mediante `aria-expanded`;
- cerrar los menús desplegables con `Escape`;
- devolver el foco al botón que abrió un menú desplegable;
- identificar el objetivo del menú mediante `aria-controls`.

### Acceso directo al contenido

El encabezado incluye un enlace “Saltar al contenido principal” que apunta a
`#main-content`. Esto evita que una persona que navega con teclado tenga que
recorrer todos los enlaces del encabezado en cada cambio de pantalla.

### Nombres accesibles

Los controles que solo muestran iconos tienen nombres accesibles mediante
`aria-label`. Algunos ejemplos son:

- abrir o cerrar el menú;
- cambiar el tema;
- iniciar sesión;
- cerrar sesión;
- abrir configuración;
- cerrar el formulario de reseña.

Los iconos decorativos de `lucide-react` se marcan con
`aria-hidden="true"` para que no se anuncien dos veces.

### Imágenes

Las imágenes de los juegos tienen textos alternativos dinámicos, por ejemplo
`Ilustración de Arcs`, en [`GameCard.jsx`](../src/components/catalog/GameCard.jsx),
[`GameDetailPage.jsx`](../src/components/catalog/GameDetailPage.jsx) y
[`HeroSection.jsx`](../src/components/home/HeroSection.jsx).

Los logotipos que funcionan como decoración visual utilizan `alt=""` y
`aria-hidden="true"`, evitando información repetida para usuarios de lectores
de pantalla.

### Formularios

Los formularios de login, registro, reseñas y apoyo utilizan etiquetas
asociadas a sus campos mediante `htmlFor` e `id`.

También se han aplicado:

- `required` en campos obligatorios;
- tipos específicos como `email` y `password`;
- `minLength` para la contraseña;
- `autoComplete` para facilitar el rellenado;
- `inputMode="numeric"` en datos numéricos;
- `fieldset` y `legend` para agrupar los datos de contacto y pago;
- placeholders que indican el formato esperado.

Las implementaciones principales se encuentran en
[`LoginPage.jsx`](../src/components/auth/LoginPage.jsx),
[`CheckoutPage.jsx`](../src/components/checkout/CheckoutPage.jsx) y
[`GameDetailPage.jsx`](../src/components/catalog/GameDetailPage.jsx).

### Mensajes y cambios dinámicos

Los mensajes de error de autenticación y reseñas utilizan `role="alert"`.
Los mensajes de confirmación de login utilizan `role="status"`.

El contador de resultados del catálogo y el número de reseñas usan
`aria-live="polite"`, de modo que un lector de pantalla puede anunciar los
cambios sin interrumpir inmediatamente la lectura.

Los diálogos de reseñas incluyen:

- `role="dialog"`;
- `aria-modal="true"`;
- `aria-labelledby` asociado a su título;
- foco inicial en el botón de cerrar;
- cierre con la tecla `Escape`.

### Contraste y temas

La aplicación dispone de variables de color para los temas claro y oscuro.
El control de cambio de tema comunica su estado mediante `aria-pressed` y
guarda la preferencia del usuario en `localStorage`.

El foco utiliza la variable `--color-focus`, definida en el sistema de colores,
para mantener una indicación visual diferenciada sobre fondos claros y oscuros.

## 4. Tabla de comprobaciones

| Comprobación | Implementación | Evidencia |
|---|---|---|
| Idioma del documento | `lang="es"` | [`app/layout.jsx`](../app/layout.jsx) |
| Navegación con teclado | Foco visible y controles nativos | [`global.css`](../src/styles/global.css), [`SiteHeader.jsx`](../src/components/layout/SiteHeader.jsx) |
| Enlace para saltar contenido | `href="#main-content"` | [`SiteHeader.jsx`](../src/components/layout/SiteHeader.jsx) |
| Etiquetas de formularios | `label`, `htmlFor` e `id` | [`LoginPage.jsx`](../src/components/auth/LoginPage.jsx), [`CheckoutPage.jsx`](../src/components/checkout/CheckoutPage.jsx) |
| Imágenes accesibles | `alt` descriptivo o vacío cuando son decorativas | [`GameCard.jsx`](../src/components/catalog/GameCard.jsx) |
| Iconos no redundantes | `aria-hidden="true"` | [`SiteHeader.jsx`](../src/components/layout/SiteHeader.jsx) |
| Menú móvil accesible | `aria-expanded`, `aria-controls` y `Escape` | [`SiteHeader.jsx`](../src/components/layout/SiteHeader.jsx) |
| Mensajes de error | `role="alert"` | [`LoginPage.jsx`](../src/components/auth/LoginPage.jsx), [`GameDetailPage.jsx`](../src/components/catalog/GameDetailPage.jsx) |
| Mensajes de estado | `role="status"` y `aria-live` | [`LoginPage.jsx`](../src/components/auth/LoginPage.jsx), [`GamesPage.jsx`](../src/components/catalog/GamesPage.jsx) |
| Diálogo accesible | `role="dialog"`, `aria-modal` y título asociado | [`GameDetailPage.jsx`](../src/components/catalog/GameDetailPage.jsx) |
| Agrupación de campos | `fieldset` y `legend` | [`CheckoutPage.jsx`](../src/components/checkout/CheckoutPage.jsx) |

## 5. Resultado y valoración

La implementación contiene las medidas principales que Lighthouse suele
comprobar en una auditoría de accesibilidad:

- idioma del documento correctamente definido;
- controles con nombres accesibles;
- imágenes con texto alternativo;
- formularios etiquetados;
- navegación por teclado;
- foco visible;
- estructura semántica;
- comunicación de estados dinámicos;
- diálogos y menús con atributos ARIA;
- adaptación de la navegación para móvil.

Por tanto, el análisis no se ha limitado a una puntuación: se han revisado
también las evidencias del código que hacen posible el resultado de
accesibilidad.

## 6. Mejoras pendientes

Aunque la base de accesibilidad está implementada, quedan mejoras posibles:

1. Añadir un **focus trap** completo en el modal de reseñas para impedir que el
   foco salga del diálogo mientras está abierto.
2. Devolver siempre el foco al botón de apertura al cerrar el menú móvil.
3. Añadir mensajes específicos junto a cada campo cuando falla la validación.
4. Revisar manualmente el contraste de todas las combinaciones de color en los
   temas claro y oscuro con el selector de contraste de Lighthouse.
5. Realizar una prueba manual con un lector de pantalla, por ejemplo NVDA.
6. Repetir Lighthouse en móvil y en las pantallas `#games`, `#login`,
   `#checkout` y `#game/{slug}`, ya que el informe enlazado corresponde a la
   entrada principal en escritorio.

## 7. Conclusión

La prueba de accesibilidad se ha realizado con Lighthouse y se ha contrastado
con la implementación del proyecto. Table Top Companion incorpora una base
accesible mediante HTML semántico, navegación por teclado, foco visible,
etiquetas de formulario, textos alternativos, atributos ARIA y mensajes de
estado.

La evidencia externa de la auditoría queda disponible en el informe de
PageSpeed Insights enlazado al comienzo de este documento. Las mejoras
pendientes están identificadas para continuar con una validación más completa
en dispositivos móviles, lectores de pantalla y flujos secundarios.
