// Setup script to create an initial admin user
// Run with: npm run setup-admin

import { PrismaClient } from "../src/generated/prisma";
import { hashedPassword } from "../src/utils/hash";

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log("🚀 Setting up admin user...");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminName = process.env.ADMIN_NAME || "System Administrator";

    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        OR: [
          { email: adminEmail },
          { username: adminUsername },
          { role: "ADMIN" }
        ]
      }
    });

    if (existingAdmin) {
      console.log("⚠️  Admin user already exists:");
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Username: ${existingAdmin.username}`);
      console.log(`   Role: ${existingAdmin.role}`);
      return;
    }

    // Hash the admin password
    const hash = await hashedPassword(adminPassword);

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        username: adminUsername,
        name: adminName,
        password: hash,
        role: "ADMIN"
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    console.log("✅ Admin user created successfully!");
    console.log("📧 Admin Details:");
    console.log(`   ID: ${adminUser.id}`);
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Username: ${adminUser.username}`);
    console.log(`   Name: ${adminUser.name}`);
    console.log(`   Role: ${adminUser.role}`);
    console.log(`   Created: ${adminUser.createdAt}`);
    console.log("");
    console.log("🔐 Login Credentials:");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log("");
    console.log("⚠️  Make sure to change the admin password after first login!");

  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Create some sample categories if none exist
async function createSampleCategories() {
  try {
    const existingCategories = await prisma.category.count();
    
    if (existingCategories > 0) {
      console.log(`📂 Found ${existingCategories} existing categories, skipping sample creation.`);
      return;
    }

    console.log("📂 Creating sample categories...");

    const sampleCategories = [
      {
        name: "Programming",
        description: "Programming tutorials, guides, and discussions",
        color: "#3B82F6"
      },
      {
        name: "Design",
        description: "UI/UX design, graphics, and creative content",
        color: "#8B5CF6"
      },
      {
        name: "General",
        description: "General discussions and miscellaneous topics",
        color: "#6B7280"
      }
    ];

    for (const category of sampleCategories) {
      await prisma.category.create({ data: category });
      console.log(`   ✅ Created category: ${category.name}`);
    }

    console.log("📂 Sample categories created successfully!");

  } catch (error) {
    console.error("❌ Error creating sample categories:", error);
  }
}

async function main() {
  console.log("🏗️  Setting up Rose Token API...");
  console.log("");
  
  await createAdminUser();
  console.log("");
  await createSampleCategories();
  
  console.log("");
  console.log("🎉 Setup completed successfully!");
  console.log("🚀 You can now start the server with: npm run dev");
}

main();
