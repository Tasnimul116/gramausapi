// import { Server } from "http";
// import mongoose from "mongoose";
// import app from "./app";
// import config from "./app/config";

// let server: Server;

// async function main() {
//   try {
//    await mongoose.connect(config.database_url as string);

//     server = app.listen(config.port, () => {
//       console.log(`app is listening on port ${config.port}`);
//     });

//   } catch (err) {
//     console.log(err);
//   }
// }

// main();

// process.on("unhandledRejection", (err) => {
//   console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// process.on("uncaughtException", () => {
//   console.log(`😈 uncaughtException is detected , shutting down ...`);
//   process.exit(1);
// });




// src/server.ts
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🛢️ Connected to MongoDB`);

    // Only start server if this file is run directly (not imported)
    if (require.main === module) {
      server = app.listen(config.port, () => {
        console.log(`✅ App is listening on port ${config.port}`);
      });
    }
  } catch (err) {
    console.log("❌ Failed to connect to DB", err);
    process.exit(1);
  }
}

main();

// Graceful shutdown
process.on("unhandledRejection", (err) => {
  console.log(`😈 unhandledRejection detected, shutting down...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException detected, shutting down...`);
  process.exit(1);
});

// Export app for Vercel
export default app;