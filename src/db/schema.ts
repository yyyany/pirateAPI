
import { mysqlTable, check ,varchar, int, datetime, mysqlEnum, index, timestamp } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';


export const ships = mysqlTable('ships', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  goldCargo: int('gold_cargo').notNull().default(0),
  captain: varchar('captain', { length: 50 }).notNull(),
  status: mysqlEnum('status', ['docked', 'sailing', 'lookingForAFight']).notNull().default('docked'),
  crewSize: int('crew_size').notNull().default(1),

  createdBy: varchar('created_by', { length: 64 }).notNull(), 
  ownerUserId: varchar('owner_user_id', { length: 36 }).notNull(), 

  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastModified: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// autres format de date 
  // createdAt: datetime('created_at', { mode: 'string' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  // lastModified: datetime('last_modified', { mode: 'string' }).notNull().default(
  //   sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
  // ),

// Contraintes
// Le format du bateau doit respecter ces contraintes :
// a. name : entre 2 et 100 caractères
// b. goldCargo : entre 0 et 1000 000
// c. createdAt : date de création
// d. captain : entre 2 et 50 caractères
// e. status
//    i. dans le port, le statut de ton bateau doit être docked.
//    ii. lors de la navigation, le statut doit être sailing.
//    iii. (v2) statut lookingForAFight
// f. crewSize : entre 1 et 500
// g. createdBy : l’identifiant donné à ton utilisateur lors de ton enregistrement à mon broker
// h. lastModified : date de dernière modification. La date est aussi initialisée lors de la création du bateau
// i. id : le id ne doit pas être dans les champs lors de la navigation.