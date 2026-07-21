import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password) {
  console.error('Użycie: node hash-password.mjs <hasło>')
  process.exit(1)
}

console.log(bcrypt.hashSync(password, 12))
