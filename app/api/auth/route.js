import { createHash } from 'node:crypto'
import { readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

const accountsPath = path.join(process.cwd(), 'src', 'data', 'accounts.json')

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex')
}

async function readAccounts() {
  try {
    const contents = await readFile(accountsPath, 'utf8')
    const accounts = JSON.parse(contents)
    if (!Array.isArray(accounts)) {
      throw new Error('El archivo de cuentas debe contener un array.')
    }
    return accounts
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

async function writeAccounts(accounts) {
  const temporaryPath = `${accountsPath}.tmp`
  await writeFile(temporaryPath, `${JSON.stringify(accounts, null, 2)}\n`, 'utf8')
  await rename(temporaryPath, accountsPath)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const action = body?.action
    const email = body?.email?.trim().toLowerCase()
    const identifier = body?.identifier?.trim().toLowerCase()
    const password = body?.password

    if (
      !['login', 'register'].includes(action) ||
      (action === 'register' && !email) ||
      (action === 'login' && !identifier) ||
      typeof password !== 'string'
    ) {
      return Response.json({ error: 'Los datos enviados no son válidos.' }, { status: 400 })
    }

    if (password.length < 6) {
      return Response.json(
        { error: 'La contraseña debe tener al menos 6 caracteres.' },
        { status: 400 },
      )
    }

    const accounts = await readAccounts()
    const account = accounts.find((item) =>
      action === 'login'
        ? item.email === identifier || item.name.toLowerCase() === identifier
        : item.email === email,
    )

    if (action === 'register') {
      if (account) {
        return Response.json({ error: 'Ya existe una cuenta con ese email.' }, { status: 409 })
      }

      const name = body?.name?.trim()
      if (!name) {
        return Response.json({ error: 'El nombre es obligatorio.' }, { status: 400 })
      }
      if (accounts.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
        return Response.json({ error: 'Ya existe una cuenta con ese nombre.' }, { status: 409 })
      }

      const newAccount = {
        id: crypto.randomUUID(),
        name,
        email,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
      }
      await writeAccounts([...accounts, newAccount])
      return Response.json({ user: { name, email } }, { status: 201 })
    }

    if (!account || account.passwordHash !== hashPassword(password)) {
      return Response.json({ error: 'El email o la contraseña no son correctos.' }, { status: 401 })
    }

    return Response.json({ user: { name: account.name, email: account.email } })
  } catch (error) {
    console.error('Error al gestionar la autenticación:', error)
    return Response.json(
      { error: 'No se ha podido completar la operación. Inténtalo de nuevo.' },
      { status: 500 },
    )
  }
}
