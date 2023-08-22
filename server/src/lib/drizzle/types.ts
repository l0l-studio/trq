import { type InferModel } from 'drizzle-orm';
import { pages, users } from '$lib/drizzle/schema.ts';

export type User = InferModel<typeof users>;
export type Page = InferModel<typeof pages>;
