import { prisma } from "../src/index.js";

async function main() {
  console.log("🌱 Starting seeding...");

  const classicCategory = await prisma.menuCategory.upsert({
    where: { id: "classic-category" },
    update: {},
    create: {
      id: "classic-category",
      name: "Classic Meals",
      description: "Our signature high-protein recipes",
    },
  });

  await prisma.menuItem.upsert({
    where: { id: "chicken-rice" },
    update: {},
    create: {
      id: "chicken-rice",
      name: "Signature Chicken & Rice",
      description: "Tender chicken breast with seasoned jasmine rice",
      price: 12.99,
      calories: 550,
      protein: 45,
      carbs: 60,
      fats: 12,
      categoryId: classicCategory.id,
    },
  });

  console.log("✅ Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
