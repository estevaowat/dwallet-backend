import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function main() {
   await prisma.user.deleteMany();

   await prisma.user.create({
      data: { name: 'Estevão Watanabe', email: 'estevao.watanabe@gmail.com' },
   });
}

main()
   .catch(() => {
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
