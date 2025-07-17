// Script to populate the predefined course categories
// Run with: npm run setup-categories

import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function createCourseCategories() {
  try {
    console.log("🏗️  Setting up course categories...");

    const courseCategories = [
      {
        name: "Grammar",
        description: "Grammar rules, structure, and usage",
        color: "#3B82F6"
      },
      {
        name: "Vocabulary",
        description: "Word learning and expansion",
        color: "#10B981"
      },
      {
        name: "Pronunciation",
        description: "Speech sounds and pronunciation practice",
        color: "#F59E0B"
      },
      {
        name: "Conversation & Dialogues",
        description: "Interactive speaking practice",
        color: "#8B5CF6"
      },
      {
        name: "Listening Comprehension",
        description: "Audio understanding and interpretation",
        color: "#EF4444"
      },
      {
        name: "Reading Practice",
        description: "Text comprehension and reading skills",
        color: "#06B6D4"
      },
      {
        name: "Writing Practice",
        description: "Written expression and composition",
        color: "#84CC16"
      },
      {
        name: "Speaking Practice",
        description: "Oral communication skills",
        color: "#F97316"
      },
      {
        name: "Idioms & Phrases",
        description: "Common expressions and figurative language",
        color: "#EC4899"
      },
      {
        name: "Common Expressions",
        description: "Everyday phrases and expressions",
        color: "#6366F1"
      },
      {
        name: "Culture & Context",
        description: "Cultural understanding and context",
        color: "#14B8A6"
      },
      {
        name: "Business Language",
        description: "Professional and business communication",
        color: "#64748B"
      },
      {
        name: "Travel Language",
        description: "Travel-related vocabulary and phrases",
        color: "#DC2626"
      },
      {
        name: "Slang & Informal Speech",
        description: "Casual and informal language usage",
        color: "#7C3AED"
      },
      {
        name: "Daily Practice / Word of the Day",
        description: "Regular practice and daily learning",
        color: "#059669"
      },
      {
        name: "Kids / Beginner Module",
        description: "Child-friendly and beginner content",
        color: "#D97706"
      },
      {
        name: "Advanced Topics",
        description: "Complex and advanced language concepts",
        color: "#7C2D12"
      },
      {
        name: "Numbers, Dates & Time",
        description: "Numerical and temporal expressions",
        color: "#1E40AF"
      },
      {
        name: "Alphabet & Phonics",
        description: "Basic letters, sounds, and phonics for beginners",
        color: "#BE185D"
      }
    ];

    let createdCount = 0;
    let skippedCount = 0;

    for (const category of courseCategories) {
      try {
        // Check if category already exists
        const existingCategory = await prisma.category.findUnique({
          where: { name: category.name }
        });

        if (existingCategory) {
          console.log(`   ⚠️  Category "${category.name}" already exists, skipping...`);
          skippedCount++;
          continue;
        }

        // Create the category
        await prisma.category.create({ data: category });
        console.log(`   ✅ Created category: ${category.name}`);
        createdCount++;

      } catch (error) {
        console.error(`   ❌ Error creating category "${category.name}":`, error);
      }
    }

    console.log("");
    console.log(`🎉 Category setup completed!`);
    console.log(`   ✅ Created: ${createdCount} categories`);
    console.log(`   ⚠️  Skipped: ${skippedCount} categories (already exist)`);
    console.log(`   📊 Total available: ${createdCount + skippedCount} categories`);

    // Display all categories
    const allCategories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    console.log("");
    console.log("📂 All available categories:");
    allCategories.forEach((cat, index) => {
      console.log(`   ${index + 1}. ${cat.name} (ID: ${cat.id})`);
    });

  } catch (error) {
    console.error("❌ Error setting up categories:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log("🚀 Rose Token - Course Categories Setup");
  console.log("=====================================");
  console.log("");
  
  await createCourseCategories();
  
  console.log("");
  console.log("🎯 Next steps:");
  console.log("   1. Start the server: npm run dev");
  console.log("   2. Test GET /api/categories to see all categories");
  console.log("   3. Use POST /api/categories/:categoryId/lessons to add lessons");
  console.log("");
  console.log("📚 API Endpoints available:");
  console.log("   GET    /api/categories");
  console.log("   GET    /api/categories/:categoryId/lessons");
  console.log("   POST   /api/categories/:categoryId/lessons (admin)");
  console.log("   GET    /api/lessons/:lessonId");
  console.log("   PUT    /api/lessons/:lessonId (admin)");
  console.log("   DELETE /api/lessons/:lessonId (admin)");
}

main();
