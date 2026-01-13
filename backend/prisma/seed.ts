import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@polymertrading.com' },
    update: {},
    create: {
      email: 'admin@polymertrading.com',
      password: adminPassword,
      role: 'ADMIN',
      gst: 'ADMIN001',
      pan: 'ADMIN001',
      status: 'APPROVED',
    },
  });

  // Create Platform Margins
  const margins = [
    { polymerType: 'PE', marginType: 'percentage', marginValue: 5.0 },
    { polymerType: 'PP', marginType: 'percentage', marginValue: 4.5 },
    { polymerType: 'PVC', marginType: 'percentage', marginValue: 6.0 },
    { polymerType: 'PS', marginType: 'fixed', marginValue: 500.0 },
  ];

  for (const margin of margins) {
    await prisma.platformMargin.create({
      data: margin,
    });
  }

  console.log('✅ Admin user created:', admin.email);
  console.log('✅ Platform margins seeded');
  console.log('🔑 Admin login: admin@polymertrading.com / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });