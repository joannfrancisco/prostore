// import { neonConfig } from "@neondatabase/serverless";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { PrismaClient } from "@prisma/client";
// import ws from "ws";

// // Enable WebSocket connections for Neon
// neonConfig.webSocketConstructor = ws;

// // Use your connection string directly
// const connectionString = process.env.DATABASE_URL!;

// // ✅ Correct: pass an object with the connection string
// const adapter = new PrismaNeon({ connectionString });

// export const prisma = new PrismaClient({ adapter }).$extends({
//   result: {
//     product: {
//       price: {
//         compute(product) {
//           return product.price.toString();
//         },
//       },
//       rating: {
//         compute(product) {
//           return product.rating.toString();
//         },
//       },
//     },
//   },
// });

// // import { neonConfig } from "@neondatabase/serverless";
// // import { PrismaNeon } from "@prisma/adapter-neon";
// // import { PrismaClient } from "@prisma/client";
// // import ws from "ws";

// // // Enable WebSocket connections for Neon
// // neonConfig.webSocketConstructor = ws;

// // const connectionString = process.env.DATABASE_URL!;

// // // ✅ CORRECT: pass config object, not Pool
// // const adapter = new PrismaNeon({
// //   connectionString,
// // });

// // export const prisma = new PrismaClient({ adapter }).$extends({
// //   result: {
// //     product: {
// //       price: {
// //         compute(product) {
// //           return product.price.toString();
// //         },
// //       },
// //       rating: {
// //         compute(product) {
// //           return product.rating.toString();
// //         },
// //       },
// //     },
// //   },
// // });

/* eslint-disable @typescript-eslint/no-require-imports */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create the client
function createPrismaClient() {
  if (process.env.VERCEL) {
    return new PrismaClient({ log: ["error"] });
  }

  const { neonConfig } = require("@neondatabase/serverless");
  const { PrismaNeon } = require("@prisma/adapter-neon");
  const ws = require("ws");

  neonConfig.webSocketConstructor = ws;

  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });

  return new PrismaClient({ adapter });
}

// ✅ Use type assertion here
export const prisma =
  globalForPrisma.prisma ??
  (createPrismaClient().$extends({
    result: {
      product: {
        price: {
          compute(product) {
            return product.price.toString();
          },
        },
        rating: {
          compute(product) {
            return product.rating.toString();
          },
        },
      },
    },
  }) as unknown as PrismaClient);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
