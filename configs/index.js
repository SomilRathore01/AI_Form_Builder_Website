import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

const sql = neon('postgresql://ai-form-builder_owner:TDzkJ8UVqOd5@ep-shrill-shape-a1zh4k7v.ap-southeast-1.aws.neon.tech/ai-form-builder?sslmode=require');
export const db = drizzle(sql, {schema});

