export type ShipStatus = 'docked' | 'sailing' | 'lookingForAFight';

export interface Ship {
  id: string;
  name: string;
  goldCargo: number;
  captain: string;
  status: ShipStatus;
  crewSize: number;
  createdBy: string;
  ownerUserId: string;
  createdAt: Date;
  lastModified: Date;
}

export interface CreateShipRequest {
  name: string;
  goldCargo: number;
  captain: string;
  status: ShipStatus;
  crewSize: number;
  ownerUserId: string;
}

export interface UpdateShipRequest {
  name: string;
  goldCargo: number;
  captain: string;
  status: ShipStatus;
  crewSize: number;
  createdBy: string;
  ownerUserId: string;
  createdAt: Date;
  lastModified: Date;
}

