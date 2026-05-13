import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Menjalankan seed...");

  const existingUser = await prisma.userAccount.findUnique({
    where: {
      username: "kaprodi_informatika",
    },
  });

  if (existingUser) {
    console.log("User default sudah ada. Seed dilewati.");
    return;
  }

  const user = await prisma.userAccount.create({
    data: {
      username: "kaprodi_informatika",
      password: "password123",
      programStudi: "Teknik Informatika",
    },
  });

  console.log("User default berhasil dibuat:");
  console.log({
    username: user.username,
    programStudi: user.programStudi,
  });
}

main()
  .catch((error) => {
    console.error("Seed gagal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
