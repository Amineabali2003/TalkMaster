const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const rooms = ["Salle A", "Salle B", "Salle C", "Salle D", "Salle E"];

  for (const name of rooms) {
    await prisma.room.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("✅ Salles créées avec succès !");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Erreur seed:", e);
    prisma.$disconnect();
    process.exit(1);
  });