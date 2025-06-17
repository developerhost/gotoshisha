#!/bin/bash
cd /Users/kanonhara/develop/gotoshisha/backend
echo "Generating Prisma client..."
npx prisma generate
echo "Running Shop API tests..."
npx vitest run src/routes/shops.test.ts