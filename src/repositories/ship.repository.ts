import { eq, sql, and } from 'drizzle-orm';
import { ships } from '../db/schema';
import { Ship } from '../types/ship.types';
import { db } from '../db/connection';

export class ShipRepository {
  async findAll(): Promise<Ship[]> {
    const result = await db.select().from(ships).orderBy(ships.createdAt);
    return result.map(this.mapShip);
  }

  async findById(id: string): Promise<Ship | null> {
    const result = await db.select().from(ships).where(eq(ships.id, id)).limit(1);
    return result.length > 0 ? this.mapShip(result[0]) : null;
  }

  async create(ship: Ship): Promise<Ship> {
    await db.insert(ships).values(ship);
    const [created] = await db.select().from(ships).where(eq(ships.id, ship.id)).limit(1);
    if (!created) throw new Error('Failed to create ship');
    return this.mapShip(created);
  }

  async update(id: string, patch: Partial<Ship>): Promise<Ship | null> {
    await db.update(ships).set(patch).where(eq(ships.id, id));
    const [updated] = await db.select().from(ships).where(eq(ships.id, id)).limit(1);
    return updated ? this.mapShip(updated) : null;
  }

  async delete(id: string): Promise<null> {
    const result = await db.delete(ships).where(eq(ships.id, id));
    return null;
  }

    async countAll(): Promise<number> {
    const [result] = await db.select({ count: sql<number>`count(*)` }).from(ships);
    return result.count;
    }
    
  private mapShip(row: any): Ship {
    return {
      id: row.id,
      name: row.name,
      goldCargo: row.goldCargo,
      captain: row.captain,
      status: row.status,
      crewSize: row.crewSize,
      createdBy: row.createdBy,
      ownerUserId: row.ownerUserId,
      createdAt: row.createdAt,
      lastModified: row.lastModified,
    };
  }
}
