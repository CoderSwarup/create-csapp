// Prisma Schema Template
const PRISMA_SCHEMA_TEMPLATE = `
datasource db {
  provider = "postgresql" // Change this to your database provider
  url      = env("DATABASE_URL") // URL to your database
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
`;

// Prisma Client Template
const PRISMA_CLIENT_TEMPLATE = `
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
`;

export { PRISMA_CLIENT_TEMPLATE, PRISMA_SCHEMA_TEMPLATE };
