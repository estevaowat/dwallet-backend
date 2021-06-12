import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function main() {
   await prisma.user.deleteMany();
     
    await prisma.user.create({
      data: {name: "Estevão Watanabe",
         email: 'estevao.watanabe@gmail.com'
      }
   }); 
  }

 main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })