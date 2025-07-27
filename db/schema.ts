import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const userTable = sqliteTable('user', {
    id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
    name: text('name').notNull(),
    age: integer('age').notNull(),
})

export const insertUserSchema = createInsertSchema(userTable, {
    name: (schema) => schema.trim().min(1),
    age: (schema) => schema.int().gte(0),
})

export const selectUserSchema = createSelectSchema(userTable)
