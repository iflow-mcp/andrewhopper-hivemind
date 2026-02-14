// Prisma Client导入助手
// 尝试从多个路径导入Prisma Client

let PrismaClient;
try {
  // 尝试从本地build目录导入
  const prismaModule = await import('./prisma/client/index.js');
  PrismaClient = prismaModule.PrismaClient;
  console.error('Using bundled Prisma Client');
} catch (e) {
  console.error('Failed to import bundled Prisma Client:', e.message);
  // 回退到标准导入
  try {
    const prismaModule = await import('@prisma/client');
    PrismaClient = prismaModule.PrismaClient;
    console.error('Using standard Prisma Client');
  } catch (e2) {
    console.error('Failed to import standard Prisma Client:', e2.message);
    throw e2;
  }
}

export { PrismaClient };