# Programación de las reseñas y resultado en la página

## 1. Objetivo

La aplicación permite que los usuarios autenticados publiquen opiniones sobre
los juegos del catálogo. Las reseñas se cargan desde una API, se guardan en un
archivo JSON local y se muestran dentro de la ficha del juego correspondiente.

La funcionalidad se reparte entre:

- [`app/api/reviews/route.js`](../app/api/reviews/route.js): API de lectura y
  escritura.
- [`src/data/reviews.json`](../src/data/reviews.json): datos persistidos.
- [`GameDetailPage.jsx`](../src/components/catalog/GameDetailPage.jsx):
  carga, formulario y representación de las reseñas.
- [`TableTopApp.jsx`](../src/components/TableTopApp.jsx): proporciona el
  usuario autenticado a la ficha del juego.

## 2. Modelo de datos

Cada reseña utiliza una estructura similar a la siguiente:

```json
{
  "id": "arcs-lucia-m",
  "game": "arcs",
  "user": "Lucía M.",
  "initials": "LM",
  "rating": 9,
  "date": "Hace 2 horas",
  "title": "Tensión desde el primer turno",
  "comment": "Cada carta cambia por completo el plan.",
  "likes": 326
}
```

Los campos cumplen estas funciones:

- `id`: identificador único de la reseña.
- `game`: slug del juego al que pertenece.
- `user`: nombre de la persona autora.
- `initials`: iniciales mostradas en el avatar.
- `rating`: puntuación de 1 a 10.
- `date`: fecha o texto temporal mostrado en la interfaz.
- `title`: título de la opinión.
- `comment`: contenido de la reseña.
- `likes`: número de “me gusta”.

Las reseñas iniciales se encuentran en
[`reviews.json`](../src/data/reviews.json), separadas por el slug del juego.
Esto permite recuperar únicamente las opiniones relevantes para cada ficha.

## 3. Consulta de reseñas mediante la API

La ruta [`app/api/reviews/route.js`](../app/api/reviews/route.js) define un
endpoint `GET`:

```text
GET /api/reviews?game=arcs
```

El funcionamiento es:

1. Obtiene el parámetro `game` de la URL.
2. Lee `src/data/reviews.json`.
3. Comprueba que el contenido sea un array.
4. Filtra las reseñas cuyo campo `game` coincide con el slug recibido.
5. Devuelve las reseñas en formato JSON.

Si no se indica el parámetro `game`, la API devuelve todas las reseñas. Si se
produce un error de lectura o de formato, registra el error en el servidor y
responde con estado HTTP `500` y un mensaje en español.

## 4. Carga en la ficha del juego

En [`GameDetailPage.jsx`](../src/components/catalog/GameDetailPage.jsx), las
reseñas se inicializan filtrando los datos importados:

```jsx
const [gameReviews, setGameReviews] = useState(
  () => reviews.filter((review) => review.game === slug),
)
```

Después, un `useEffect` consulta la API cuando cambia el slug:

```jsx
fetch(`/api/reviews?game=${encodeURIComponent(slug)}`)
```

El uso de `encodeURIComponent` evita problemas si el identificador contiene
caracteres especiales. Cuando la respuesta es correcta, el estado
`gameReviews` se sustituye por los datos recibidos. Si la petición falla, se
registra el error en consola.

La inicialización con datos locales permite mostrar contenido inmediatamente,
mientras que la petición a la API sincroniza la información con el archivo
persistido.

## 5. Acceso al formulario

El botón para escribir una reseña solo aparece cuando existe un usuario
autenticado:

```jsx
{user ? (
  <button>Escribir reseña</button>
) : (
  <a href="#login">Inicia sesión para reseñar</a>
)}
```

El usuario se obtiene del estado de [`TableTopApp.jsx`](../src/components/TableTopApp.jsx),
que lo recupera de `localStorage` con la clave `table-top-user`.

Por tanto:

- una persona no autenticada puede leer reseñas;
- una persona no autenticada recibe un enlace para iniciar sesión;
- una persona autenticada puede abrir el formulario modal.

## 6. Formulario de publicación

El componente `ReviewModal` contiene tres datos editables:

- puntuación mediante un selector de 1 a 10;
- título de la reseña;
- comentario de la opinión.

El formulario incluye `required` en título y comentario, y limita la longitud
del título a 100 caracteres y del comentario a 1000 caracteres:

```jsx
<input maxLength="100" required />
<textarea maxLength="1000" required />
```

Al enviarlo, se realiza una petición:

```text
POST /api/reviews
Content-Type: application/json
```

El cuerpo enviado contiene:

```json
{
  "game": "heat",
  "user": "Nombre del usuario",
  "rating": 8,
  "title": "Título de la reseña",
  "comment": "Texto de la opinión"
}
```

Mientras la operación está en curso:

- se muestra el texto `Guardando...`;
- el botón queda deshabilitado;
- se evita el envío repetido.

## 7. Validación en el servidor

El método `POST` de [`route.js`](../app/api/reviews/route.js) vuelve a validar
los datos, independientemente de la validación del navegador:

1. Recorta espacios de `game`, `user`, `title` y `comment`.
2. Convierte la puntuación a número.
3. Comprueba que los campos existan.
4. Comprueba que la puntuación sea un entero entre 1 y 10.
5. Comprueba que el título no supere 100 caracteres.
6. Comprueba que el comentario no supere 1000 caracteres.

Si los datos son incorrectos, devuelve:

```text
400 Bad Request
```

con el mensaje `Completa todos los campos correctamente.` o
`La reseña supera el límite permitido.`.

Esta doble validación evita depender únicamente de las restricciones del
cliente.

## 8. Creación y persistencia de la reseña

Cuando los datos son válidos, el servidor crea un nuevo objeto con:

- un ID formado por el slug y la marca temporal actual;
- las iniciales del usuario, calculadas a partir de su nombre;
- la fecha `Ahora`;
- cero “me gusta” iniciales.

Después, [`writeReviews`](../app/api/reviews/route.js) guarda el array completo
en `reviews.json`. Para reducir el riesgo de dejar el archivo incompleto:

1. escribe primero en `reviews.json.tmp`;
2. renombra el archivo temporal al archivo definitivo.

Si la escritura termina correctamente, la API responde con:

```text
201 Created
```

y devuelve la reseña recién creada en JSON.

Si ocurre un error durante la lectura o escritura, se registra en el servidor y
se devuelve un estado `500` con un mensaje de error.

## 9. Actualización inmediata de la página

Cuando el `POST` responde correctamente, el componente recibe la reseña
mediante `onCreated` y la añade al estado local:

```jsx
onCreated={(review) => {
  setGameReviews((current) => [...current, review])
  setIsReviewFormOpen(false)
}}
```

El resultado es visible inmediatamente sin recargar la página. El modal se
cierra y la nueva reseña aparece al final de la lista del juego actual.

## 10. Representación visual

La sección `ReviewsSection` muestra:

- el texto “Opiniones de la comunidad”;
- el título `Reseñas de {game.name}`;
- el número actualizado de reseñas;
- el botón de publicación o el enlace de login;
- una tarjeta por cada reseña.

Cada tarjeta contiene:

- avatar con iniciales;
- nombre de usuario;
- fecha;
- puntuación;
- título;
- comentario;
- número de “me gusta”;
- texto “Valoración verificada de la comunidad”.

La lista se genera con `map` y utiliza `review.id` como `key`, lo que permite
representar cualquier cantidad de reseñas asociadas al juego.

La sección utiliza `aria-labelledby="reviews-title"` y el contador usa
`aria-live="polite"` para que los cambios sean anunciados por tecnologías de
asistencia sin interrumpir bruscamente la lectura.

## 11. Flujo completo

```text
Usuario abre una ficha
        |
        v
Se muestran las reseñas iniciales del juego
        |
        v
GET /api/reviews?game={slug}
        |
        v
La API filtra reviews.json por game
        |
        v
La página actualiza la lista
        |
        v
Usuario autenticado pulsa "Escribir reseña"
        |
        v
Completa puntuación, título y comentario
        |
        v
POST /api/reviews
        |
        v
Validación y guardado en reviews.json
        |
        v
Respuesta 201 con la nueva reseña
        |
        v
La página la añade al estado y la muestra sin recargar
```

## 12. Resultado en la página

El resultado final puede consultarse entrando en cualquier ficha mediante el
catálogo:

1. Abrir la aplicación.
2. Seleccionar “Juegos”.
3. Elegir un juego, por ejemplo `Heat` o `Pandemic`.
4. Desplazarse hasta “Opiniones de la comunidad”.
5. Consultar las reseñas existentes.
6. Iniciar sesión para ver “Escribir reseña”.
7. Publicar una opinión de prueba.
8. Comprobar que la nueva tarjeta aparece inmediatamente en la lista.

Las reseñas persistidas pueden verificarse en
[`reviews.json`](../src/data/reviews.json). La vista pública se genera en la
sección de reseñas de
[`GameDetailPage.jsx`](../src/components/catalog/GameDetailPage.jsx).

## 13. Limitaciones actuales

La implementación funciona como una solución local de demostración:

- la persistencia se realiza en un archivo JSON del proyecto;
- no existe una base de datos multiusuario;
- no hay sistema de “me gusta” conectado a una acción;
- la fecha de las nuevas reseñas se muestra como `Ahora`;
- no existe paginación ni ordenación configurable;
- la actualización optimista del cliente no vuelve a consultar la API después
  de publicar;
- si el archivo JSON no está disponible, la operación falla con un mensaje
  controlado.

Estas limitaciones no impiden demostrar el flujo completo de creación,
persistencia, recuperación y representación de reseñas.

## 14. Conclusión

La programación de reseñas está implementada mediante una API propia de
Next.js, validación en cliente y servidor, persistencia segura mediante archivo
temporal y actualización inmediata del estado de React.

El resultado se integra en la ficha de cada juego, donde las opiniones se
filtran por slug, se muestran con información de usuario y puntuación, y se
actualizan sin recargar la página después de publicar una nueva reseña.
