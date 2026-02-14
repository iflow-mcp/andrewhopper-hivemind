#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 设置NODE_PATH，让Prisma Client可以从本地build目录加载
const prismaPath = join(__dirname, 'prisma');
process.env.NODE_PATH = process.env.NODE_PATH 
  ? `${process.env.NODE_PATH}:${prismaPath}` 
  : prismaPath;

// 动态导入实际的MCP服务器
const { default: server } = await import('./index.js');