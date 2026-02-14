// Prisma Client导入助手
// 尝试从多个路径导入Prisma Client

let PrismaClient;
try {
  // 尝试从本地build目录导入
  const prismaModule = await import('./prisma/client/index.js');
  PrismaClient = prismaModule.PrismaClient;
} catch (e) {
  // 回退到标准导入
  const prismaModule = await import('@prisma/client');
  PrismaClient = prismaModule.PrismaClient;
}

export { PrismaClient };