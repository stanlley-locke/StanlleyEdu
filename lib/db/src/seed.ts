import { db } from "./index";
import { usersTable, coursesTable, courseModulesTable } from "./schema";
import { eq } from "drizzle-orm";
import { createHash, randomBytes } from "crypto";

function hashPassword(password: string, salt: string): string {
  return createHash("sha256").update(password + salt).digest("hex");
}

function getSecurePassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  return hashPassword(password, salt) + ":" + salt;
}

async function seed() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed Users
  console.log("👥 Seeding users...");
  const adminUser = {
    firstName: "Stanlley",
    lastName: "Admin",
    email: "admin@stanlleyedu.com",
    phone: "+254700000000",
    passwordHash: getSecurePassword("stanlleylocke"),
    role: "admin",
    status: "active",
    bio: "Lead administrator and platform architect.",
  };

  const students = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+254711111111",
      passwordHash: getSecurePassword("john2026"),
      role: "student",
      status: "active",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "+254722222222",
      passwordHash: getSecurePassword("jane2026"),
      role: "student",
      status: "active",
    },
  ];

  for (const user of [adminUser, ...students]) {
    await db.insert(usersTable)
      .values(user)
      .onConflictDoUpdate({
        target: usersTable.email,
        set: {
          passwordHash: user.passwordHash,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          status: user.status,
        }
      });
  }

  // 2. Seed Courses
  console.log("📚 Seeding courses...");
  const courses = [
    {
      title: "Full-Stack Web Development",
      slug: "full-stack-web-dev",
      description: "Master modern web development from frontend to backend using React, Node.js, and PostgreSQL.",
      shortDescription: "Complete path to becoming a professional web developer.",
      category: "Web Development",
      duration: "12 Weeks",
      startDate: "2024-06-01",
      price: 45000,
      commitmentFee: 5000,
      instructorName: "Stanlley Edu",
      level: "beginner",
      technologies: ["React", "Node.js", "TypeScript", "PostgreSQL"],
      outcomes: ["Build scalable web apps", "Master ESM and Monorepos", "Deploy to production"],
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      title: "Data Science & Machine Learning",
      slug: "data-science-ml",
      description: "Learn to analyze data, build predictive models, and deploy machine learning algorithms.",
      shortDescription: "Unlock the power of data with Python and Scikit-Learn.",
      category: "Data Science",
      duration: "10 Weeks",
      startDate: "2024-06-15",
      price: 55000,
      commitmentFee: 5000,
      instructorName: "Dr. Elena Rivers",
      level: "intermediate",
      technologies: ["Python", "Pandas", "PyTorch", "Jupyter"],
      outcomes: ["Predict trends from data", "Build neural networks", "Process big data"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    },
    {
      title: "UI/UX Design Masterclass",
      slug: "ui-ux-design",
      description: "Design beautiful, functional interfaces that users love. Learn Figma and design principles.",
      shortDescription: "A hands-on guide to modern user experience and interface design.",
      category: "Design",
      duration: "6 Weeks",
      startDate: "2024-07-01",
      price: 30000,
      commitmentFee: 3000,
      instructorName: "Marcus Thorne",
      level: "beginner",
      technologies: ["Figma", "Adobe XD", "Prototyping"],
      outcomes: ["Create high-fidelity mockups", "Run user testing", "Design systems"],
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    },
  ];

  for (const course of courses) {
    const [inserted] = await db.insert(coursesTable).values(course).onConflictDoNothing().returning();
    
    if (inserted) {
      // 3. Seed Modules for each course
      console.log(`🧩 Seeding modules for: ${course.title}...`);
      await db.insert(courseModulesTable).values([
        {
          courseId: inserted.id,
          title: "Introduction",
          description: "Overview of the course and environment setup.",
          order: 1,
          duration: "1 Week",
        },
        {
          courseId: inserted.id,
          title: "Core Fundamentals",
          description: "Diving deep into the base principles and tools.",
          order: 2,
          duration: "3 Weeks",
        },
      ]);
    }
  }

  console.log("✅ Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:");
  console.error(err);
  process.exit(1);
});
