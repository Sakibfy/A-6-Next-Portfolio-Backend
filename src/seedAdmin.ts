import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const  seedSuoerAdmin = async ()  => {
  try {
    const email = process.env.SEED_OWNER_EMAIL || "owner@gmail.com";
  const Password = process.env.SEED_OWNER_PASSWORD || "12345678";

  // check if already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  
  if (existing) {
    console.log("🚨 Owner already exists:", email);
    return;
  }

  console.log("⚡ Creating Portfolio Owner...");

  const user = await prisma.user.create({
    data: {
      name: "Portfolio Owner",
      email,
      password: Password, 
      role: "OWNER",
    
    },
  });

  console.log("✅ Owner created successfully:", user.email);
  } catch (error) {
     console.log(error);
  }
}


