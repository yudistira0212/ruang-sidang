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
  console.log("Mulai menjalankan seed...");

  const user = await prisma.userAccount.upsert({
    where: {
      username: "kaprodi_informatika",
    },
    update: {
      password: "password123",
      programStudi: "Teknik Informatika",
    },
    create: {
      username: "kaprodi_informatika",
      password: "password123",
      programStudi: "Teknik Informatika",
    },
  });

  console.log("User default berhasil dibuat / diperbarui:");
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
