const { spawn } = require("child_process");

const backendDir = "/Users/kanonhara/develop/gotoshisha/backend";

// eslint-disable-next-line no-console
console.log("Starting test runner...");
// eslint-disable-next-line no-console
console.log("Backend directory:", backendDir);

// Change to backend directory and run Prisma generate
const generatePrisma = spawn("npx", ["prisma", "generate"], {
  cwd: backendDir,
  stdio: "inherit",
});

generatePrisma.on("close", (code) => {
  // eslint-disable-next-line no-console
  console.log(`Prisma generate exited with code ${code}`);

  if (code === 0) {
    // Run tests
    // eslint-disable-next-line no-console
    console.log("Running tests...");
    const testProcess = spawn(
      "npx",
      ["vitest", "run", "src/routes/shops.test.ts"],
      {
        cwd: backendDir,
        stdio: "inherit",
      }
    );

    testProcess.on("close", (testCode) => {
      // eslint-disable-next-line no-console
      console.log(`Tests exited with code ${testCode}`);
      process.exit(testCode);
    });
  } else {
    // eslint-disable-next-line no-console
    console.error("Prisma generate failed");
    process.exit(1);
  }
});

generatePrisma.on("error", (error) => {
  // eslint-disable-next-line no-console
  console.error("Error running Prisma generate:", error);
  process.exit(1);
});
