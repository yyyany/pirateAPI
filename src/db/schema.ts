import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';

// Schéma minimal d'un "bateau"
export const boats = mysqlTable('boats', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

