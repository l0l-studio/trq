import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import env from '$lib/env.ts';

const client = createClient({
    url: env.TURSO_DB_URL,
    authToken: env.TURSO_TOKEN,
});

export const db = drizzle(client);
