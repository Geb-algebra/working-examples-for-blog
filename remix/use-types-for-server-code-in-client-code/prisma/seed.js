import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.post.create({
    data: {
      title: 'Hello',
    }
  })
  await prisma.post.create({
    data: {
      title: 'from Japan',
    }
  })
  await prisma.post.create({
    data: {
      title: 'Im Geb',
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })