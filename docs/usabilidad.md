# Usabilidad implementada en Table Top Companion

## 1. Objetivo

La usabilidad de Table Top Companion se ha planteado para que una persona
pueda descubrir juegos, consultar sus características, buscar dentro del
catálogo y participar en la comunidad sin necesitar instrucciones adicionales.
La interfaz prioriza una navegación clara, acciones reconocibles, formularios
con ayuda contextual y una experiencia adaptable a escritorio y móvil.

La aplicación principal se compone en
[`TableTopApp.jsx`](../src/components/TableTopApp.jsx), que controla la vista
actual y mantiene el encabezado y el pie visibles en todas las pantallas.

## 2. Arquitectura de navegación

### Navegación principal

[`SiteHeader.jsx`](../src/components/layout/SiteHeader.jsx) organiza las
opciones en tres grupos:

- **Explorar:** juegos, colecciones y noticias.
- **Partidas:** mis partidas y crear partida.
- **Comunidad:** grupos y eventos.

Esta agrupación reduce el número de opciones visibles y ayuda a entender dónde
se encuentra cada funcionalidad. Los menús desplegables utilizan botones,
indican su estado con `aria-expanded` y se cierran con la tecla `Escape`.

### Navegación interna

Las acciones principales se presentan como enlaces o botones con textos
orientados a la tarea:

- “Explorar juegos”.
- “Ver juego”.
- “Explorar más juegos”.
- “Volver a juegos”.
- “Inicia sesión para reseñar”.
- “Escribir reseña”.

Las tarjetas completas de juegos y noticias son enlaces, por lo que el área
interactiva es amplia y fácil de seleccionar.

La aplicación usa rutas hash como `#home`, `#games`, `#login` y
`#game/{slug}`. El cambio de hash actualiza la pantalla sin recargar el
navegador y permite volver atrás con los controles habituales del navegador.

### Breadcrumbs y contexto

El catálogo y las fichas de juego muestran una ruta de contexto, por ejemplo
“Explorar / Juegos de mesa” o “Volver a juegos / nombre del juego”. Esto ayuda a
entender la ubicación actual y facilita regresar a un nivel anterior.

## 3. Descubrimiento de contenido

### Página de inicio

La portada prioriza el contenido más relevante:

1. juego destacado de la semana;
2. noticias y opiniones recientes;
3. colecciones de la comunidad.

Cada bloque incluye un título, una descripción breve y una acción relacionada.
La implementación se encuentra en
[`HomePage.jsx`](../src/components/home/HomePage.jsx),
[`HeroSection.jsx`](../src/components/home/HeroSection.jsx),
[`NewsSection.jsx`](../src/components/home/NewsSection.jsx) y
[`CollectionsSection.jsx`](../src/components/home/CollectionsSection.jsx).

### Catálogo y búsqueda

[`GamesPage.jsx`](../src/components/catalog/GamesPage.jsx) ofrece:

- buscador visible con etiqueta accesible;
- búsqueda por nombre, categoría o mecánica;
- filtros por categoría;
- botón “Restablecer” para volver al estado inicial;
- contador de resultados actualizado;
- mensaje específico cuando no existen coincidencias.

El resultado se actualiza mientras la persona escribe y el número de juegos
aparece en una región `aria-live`, haciendo visible también el cambio para
usuarios de lectores de pantalla.

### Tarjetas informativas

[`GameCard.jsx`](../src/components/catalog/GameCard.jsx) muestra en cada tarjeta
el nombre, la descripción, la categoría, el número de jugadores, la duración,
la valoración y una etiqueta de estado. Esta información permite comparar
juegos sin abrir cada ficha.

## 4. Fichas de juego

[`GameDetailPage.jsx`](../src/components/catalog/GameDetailPage.jsx) organiza la
información en bloques fáciles de recorrer:

- resumen y valoración;
- descripción larga;
- aspectos destacados;
- ficha con jugadores, duración, complejidad, año y diseñador;
- mecánicas;
- reseñas de la comunidad.

La separación entre resumen, datos rápidos y contenido ampliado permite tanto
una lectura rápida como una consulta detallada.

Cuando una ficha no existe, se muestra un estado de error comprensible:
“No hemos encontrado ese juego”, junto con un enlace para volver al catálogo.

## 5. Formularios y prevención de errores

### Inicio de sesión y registro

[`LoginPage.jsx`](../src/components/auth/LoginPage.jsx) permite cambiar entre
iniciar sesión y crear una cuenta sin abandonar la pantalla. El formulario:

- usa etiquetas asociadas a cada campo;
- marca los campos obligatorios con `required`;
- utiliza tipos de entrada apropiados como `email` y `password`;
- configura `autocomplete` para facilitar el rellenado;
- exige una contraseña de seis caracteres como mínimo;
- normaliza email e identificador antes de enviarlos;
- muestra errores del servidor con `role="alert"`;
- muestra confirmaciones con `role="status"`.

### Reseñas

El formulario de reseñas se abre en un diálogo modal y contiene:

- foco inicial en el botón de cerrar;
- cierre mediante `Escape`;
- cierre al pulsar fuera del contenido del diálogo;
- campos obligatorios;
- límites de longitud para título y comentario;
- selección de puntuación de 1 a 10;
- botón deshabilitado mientras se guarda;
- mensaje de error accesible si falla la operación.

Estas medidas reducen entradas incompletas y hacen visible el estado de la
operación.

### Formulario de apoyo

[`CheckoutPage.jsx`](../src/components/checkout/CheckoutPage.jsx) agrupa los
campos mediante `fieldset` y `legend`, separando los datos de contacto de los
datos de pago. También utiliza:

- `type="email"` para validar el correo;
- `inputMode="numeric"` en datos numéricos;
- `autocomplete` para nombre, email y tarjeta;
- placeholders con el formato esperado;
- una indicación clara de que se trata de un formulario de demostración.

## 6. Accesibilidad como parte de la usabilidad

La accesibilidad se ha incorporado como una parte de la experiencia de uso:

- el documento declara `lang="es"`;
- existe un enlace “Saltar al contenido principal”;
- los elementos principales tienen roles HTML semánticos;
- las navegaciones tienen nombres mediante `aria-label`;
- las secciones importantes se relacionan con sus títulos usando
  `aria-labelledby`;
- los iconos decorativos se ocultan con `aria-hidden="true"`;
- las imágenes de juegos tienen textos alternativos descriptivos;
- los controles de menú comunican su estado con `aria-expanded`;
- el selector de tema comunica su estado con `aria-pressed`;
- los mensajes de error, éxito y resultados tienen roles o regiones
  adecuadas.

En [`global.css`](../src/styles/global.css) se define un foco visible para
enlaces, botones, campos y selectores mediante `:focus-visible`. Esto permite
seguir la navegación con teclado sin perder la posición actual.

## 7. Diseño adaptable y personalización

La navegación se adapta a pantallas pequeñas. En [`nav.css`](../src/styles/generic/nav.css)
se activa un botón de menú móvil cuando el ancho es reducido. El botón indica si
el menú está abierto, controla la navegación mediante `aria-controls` y permite
cerrarlo con `Escape`.

La interfaz también incluye un selector de tema claro/oscuro. La preferencia se
guarda en `localStorage` con la clave `table-top-theme`, de modo que se conserva
entre visitas en el mismo navegador.

La sesión del usuario también se conserva localmente mediante
`table-top-user`, permitiendo volver a la aplicación con el estado de usuario
conocido.

## 8. Feedback y estados de la interfaz

Se han contemplado varios estados para evitar que la interfaz parezca bloqueada
o ambigua:

- resultados vacíos en el catálogo;
- juego inexistente;
- errores de autenticación;
- confirmación de cuenta creada o sesión iniciada;
- error de conexión con la API;
- botón de publicación deshabilitado mientras se guarda una reseña;
- texto “Guardando...” durante el envío;
- mensaje de formulario de pago de demostración.

Los mensajes se muestran cerca de la acción que los provoca y utilizan
español, manteniendo la coherencia de la interfaz.

## 9. Consistencia visual y comprensión

La interfaz reutiliza clases y patrones comunes para:

- botones principales y secundarios;
- etiquetas de sección (`eyebrow`);
- tarjetas;
- breadcrumbs;
- campos de formulario;
- mensajes de estado;
- iconos de acciones.

Los botones principales destacan las acciones prioritarias y los botones de
contorno se reservan para acciones secundarias. Las etiquetas y descripciones
explican el contenido antes de que la persona tenga que interactuar con él.

## 10. Limitaciones actuales y mejoras futuras

La documentación refleja el estado actual del proyecto. Las siguientes mejoras
podrían aumentar aún más la usabilidad:

1. **Persistencia de acciones pendientes:** algunos controles visuales, como
   “Guardar juego”, “Mis juegos guardados” o “Configuración”, todavía no tienen
   una acción completa conectada.
2. **Focus management del menú móvil:** puede mejorarse devolviendo el foco al
   botón de apertura después de cerrar el menú.
3. **Focus trap del modal:** el diálogo de reseñas gestiona el foco inicial y
   `Escape`, pero podría impedir completamente que el foco salga del modal
   mientras está abierto.
4. **Validación visible de campos:** además de `required` y los tipos HTML,
   podrían mostrarse mensajes específicos junto a cada campo inválido.
5. **Proceso de pago real:** el checkout está explícitamente definido como
   demostración y no realiza cargos.
6. **Rutas permanentes:** migrar de hash a rutas reales facilitaría compartir,
   recuperar y enlazar directamente cada pantalla.

Estas limitaciones están separadas de las funcionalidades ya implementadas para
no presentar como completadas acciones que actualmente son solo de interfaz.

## 11. Resumen

La usabilidad se ha implementado mediante:

- navegación agrupada y consistente;
- enlaces y botones con textos orientados a tareas;
- catálogo con búsqueda, filtros y estados vacíos;
- fichas de juego organizadas por niveles de detalle;
- formularios etiquetados, autocompletado y validación básica;
- mensajes de error, éxito y carga;
- menú móvil y diseño responsive;
- selector de tema persistente;
- soporte de teclado, foco visible y lectores de pantalla;
- textos alternativos y estructura semántica;
- estados de error comprensibles y acciones para recuperarse.

En conjunto, la web permite descubrir contenido, completar acciones frecuentes y
recuperarse de errores con una carga cognitiva reducida.
