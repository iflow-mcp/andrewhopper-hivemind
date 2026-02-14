#!/usr/bin/env node
import { spawn } from 'child_process';

// 自动生成 Prisma Client
const prismaGenerate = () => {
  return new Promise((resolve) => {
    const npxPrisma = spawn('npx', ['prisma', 'generate'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true
    });

    let output = '';
    npxPrisma.stdout.on('data', (data) => {
      output += data.toString();
    });

    npxPrisma.stderr.on('data', (data) => {
      output += data.toString();
    });

    npxPrisma.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.warn('Warning: Prisma generate failed (this is ok if client already exists)');
        resolve();
      }
    });

    // 30秒超时
    setTimeout(() => {
      npxPrisma.kill();
      console.warn('Warning: Prisma generate timeout (this is ok if client already exists)');
      resolve();
    }, 30000);
  });
};

// 等待 Prisma Client 生成
await prismaGenerate();

// 动态导入实际的MCP服务器
const { default: server } = await import('./index.js');