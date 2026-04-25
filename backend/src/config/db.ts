import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "./env";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// 🔹 Create PostgreSQL Pool (optimized)
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10, // max connections
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

// 🔹 Prisma Adapter
const adapter = new PrismaPg(pool);

// 🔹 Prisma Client Factory
const createPrismaClient = () =>
  new PrismaClient({
    adapter,
    log:
      // env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

// 🔹 Singleton Pattern (VERY IMPORTANT)
export const prisma = global.prisma || createPrismaClient();

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// 🔹 Connect DB
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

// 🔹 Graceful Shutdown (Production MUST)
const shutdown = async () => {
  try {
    await prisma.$disconnect();
    await pool.end();
    console.log("Database disconnected");
    process.exit(0);
  } catch (error) {
    console.error("Error during DB shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
