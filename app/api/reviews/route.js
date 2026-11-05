import { readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

const reviewsPath = path.join(process.cwd(), 'src', 'data', 'reviews.json')

async function readReviews() {
  const contents = await readFile(reviewsPath, 'utf8')
  const reviews = JSON.parse(contents)
  if (!Array.isArray(reviews)) {
    throw new Error('El archivo de reseñas debe contener un array.')
  }
  return reviews
}

async function writeReviews(reviews) {
  const temporaryPath = `${reviewsPath}.tmp`
  await writeFile(temporaryPath, `${JSON.stringify(reviews, null, 2)}\n`, 'utf8')
  await rename(temporaryPath, reviewsPath)
}

export async function GET(request) {
  try {
    const game = new URL(request.url).searchParams.get('game')
    const reviews = await readReviews()
    return Response.json(game ? reviews.filter((review) => review.game === game) : reviews)
  } catch (error) {
    console.error('Error al leer las reseñas:', error)
    return Response.json({ error: 'No se han podido cargar las reseñas.' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const game = body?.game?.trim()
    const user = body?.user?.trim()
    const title = body?.title?.trim()
    const comment = body?.comment?.trim()
    const rating = Number(body?.rating)

    if (!game || !user || !title || !comment || !Number.isInteger(rating) || rating < 1 || rating > 10) {
      return Response.json({ error: 'Completa todos los campos correctamente.' }, { status: 400 })
    }

    if (title.length > 100 || comment.length > 1000) {
      return Response.json({ error: 'La reseña supera el límite permitido.' }, { status: 400 })
    }

    const reviews = await readReviews()
    const review = {
      id: `${game}-${Date.now()}`,
      game,
      user,
      initials: user
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      rating,
      date: 'Ahora',
      title,
      comment,
      likes: 0,
    }
    await writeReviews([...reviews, review])
    return Response.json(review, { status: 201 })
  } catch (error) {
    console.error('Error al guardar la reseña:', error)
    return Response.json({ error: 'No se ha podido guardar la reseña.' }, { status: 500 })
  }
}
