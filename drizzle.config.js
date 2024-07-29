import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://ai-form-builder_owner:TDzkJ8UVqOd5@ep-shrill-shape-a1zh4k7v.ap-southeast-1.aws.neon.tech/ai-form-builder?sslmode=require',
  }
});
