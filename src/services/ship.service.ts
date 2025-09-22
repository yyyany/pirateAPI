import { ShipRepository } from '../repositories/ship.repository';
import { Ship, CreateShipRequest, UpdateShipRequest, ShipStatus } from '../types/ship.types';
import { v4 as uuidv4 } from 'uuid';

const repository = new ShipRepository();

// Cette partie est faite par GPT pour valider les données.

const LIMITS = {
  name: [2, 100],
  captain: [2, 50],
  goldCargo: [0, 1_000_000],
  crewSize: [1, 500],
} as const;

// Cette partie est faite par GPT pour valider les données.
const ALLOWED_STATUS: ShipStatus[] = ['docked', 'sailing', 'lookingForAFight'];
const MAX_SHIPS = 8; 

function assertStringLen(label: string, v: string, min: number, max: number) {
    if (typeof v !== 'string' || v.length < min || v.length > max) throw new Error(`${label} invalide (${min}..${max})`);
}
function assertIntRange(label: string, v: unknown, min: number, max: number) {
  if (!Number.isInteger(v) || (v as number) < min || (v as number) > max) throw new Error(`${label} invalide (${min}..${max})`);
}
function assertStatus(v: unknown) {
  if (v === undefined) return;
  if (!ALLOWED_STATUS.includes(v as ShipStatus)) throw new Error(`status invalide (${ALLOWED_STATUS.join(' | ')})`);
}
//
export class ShipService {
    
    async getAll(): Promise<Ship[]> {
        return repository.findAll();
  }

  async getById(id: string): Promise<Ship | null> {
    if (!id) throw new Error('id requis');
    return await repository.findById(id);
  }

  async create(payload: CreateShipRequest): Promise<Ship> {

    // Validation des données d'entrée (IA)
    assertStringLen('name', payload.name, LIMITS.name[0], LIMITS.name[1]);
    assertIntRange('goldCargo', payload.goldCargo, LIMITS.goldCargo[0], LIMITS.goldCargo[1]);
    assertStringLen('captain', payload.captain, LIMITS.captain[0], LIMITS.captain[1]);
    assertIntRange('crewSize', payload.crewSize, LIMITS.crewSize[0], LIMITS.crewSize[1]);
    assertStatus(payload.status);

    //
    const count = await repository.countAll();
    if (count >= MAX_SHIPS) throw new Error(`Limite atteinte: max ${MAX_SHIPS} navires.`);

    const now = new Date();
    const entity: Ship = {
      id: uuidv4(),
      name: payload.name,
      goldCargo: payload.goldCargo,
      captain: payload.captain,
      status: payload.status ?? 'docked',
      crewSize: payload.crewSize,
      createdBy: "system",             //  userId 
      ownerUserId: "demo-user",   // a changer > payload.ownerUserId,
      createdAt: now,
      lastModified: now,
    };
    return repository.create(entity);
  }

  async update(id: string, patch: UpdateShipRequest): Promise<Ship> {
    const current = await repository.findById(id);
    if (!current) throw new Error('Navire introuvable');

    const next: Partial<Ship> = {};

    // Validation des données d'entrée (IA)
    if (patch.name !== undefined) {
      assertStringLen('name', patch.name, LIMITS.name[0], LIMITS.name[1]);
      next.name = patch.name;
    }
    if (patch.goldCargo !== undefined) {
      assertIntRange('goldCargo', patch.goldCargo, LIMITS.goldCargo[0], LIMITS.goldCargo[1]);
      next.goldCargo = patch.goldCargo;
    }
    if (patch.captain !== undefined) {
      assertStringLen('captain', patch.captain, LIMITS.captain[0], LIMITS.captain[1]);
      next.captain = patch.captain;
    }
    if (patch.crewSize !== undefined) {
      assertIntRange('crewSize', patch.crewSize, LIMITS.crewSize[0], LIMITS.crewSize[1]);
      next.crewSize = patch.crewSize;
    }
    if (patch.status !== undefined) {
      assertStatus(patch.status);
      next.status = patch.status;
    }

    next.lastModified = new Date();

    const updated = await repository.update(id, next as Ship);
    if (!updated) throw new Error('Mise à jour échouée');
    return updated;
  }


  async delete(id: string): Promise<{ ok: true }> {
    const affected = await repository.delete(id);
    if (!affected) throw new Error('Navire introuvable');
    return { ok: true };
  }
}
