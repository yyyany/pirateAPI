import { Request, Response, NextFunction } from 'express';
import { ShipService } from '../services/ship.service';
import { CreateShipRequest, UpdateShipRequest } from '../types/ship.types';

// ShipService 
const shipService = new ShipService();

export class ShipController {
  
  getAllShip = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ships = await shipService.getAll();
      res.json(ships);
    } catch (error) {
      next(error);
    }
  };

  getShipById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const ship = await shipService.getById(id);

      if (!ship) {
      return void res.status(404).json({ error: 'Navire introuvable' });
      }

      res.json(ship);
    } catch (error) {
      next(error);
    }
  };

  createShip = async (req: Request<{}, {}, CreateShipRequest>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ship = await shipService.create(req.body);
      res.status(201).json(ship);
    } catch (error) {
      next(error);
    }
  };

  updateShip = async (req: Request<{ id: string }, {}, UpdateShipRequest>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ship = await shipService.update(req.params.id, req.body);
      res.json(ship);
    } catch (error) {
      next(error);
    }
  };

  removeShip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const out = await shipService.delete(req.params.id);
      res.json(out);
    } catch (error) {
      next(error);
    }
  };
}
