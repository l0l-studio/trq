import { sqliteTable, AnySQLiteColumn, foreignKey, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const pages = sqliteTable("pages", {
	id: text("id").primaryKey().notNull(),
	authorId: integer("author_id").notNull().references(() => users.id),
	note: text("note"),
	createdAt: integer("created_at").notNull(),
});

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	username: text("username").notNull(),
	email: text("email").notNull(),
},
(table) => {
	return {
		idxName: uniqueIndex("idx_name").on(table.username),
	}
});
