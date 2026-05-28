// backend/scripts/migrateItems.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const result = await mongoose.connection.collection("invoices").updateMany(
  { Items: { $exists: true } },
  [{ $set: { items: "$Items" } }, { $unset: "Items" }]
);

console.log("Migrated:", result.modifiedCount, "invoices");
await mongoose.connection.close();