import { Router } from 'express';
import { ShipController } from '../controllers/ship.controller';
import { mockAuthMiddleware } from "../middleware/error.middleware";

export const createShipRoutes = (): Router => {
  const shipController = new ShipController();
  const router = Router();

  router.get('/ships', shipController.getAllShip);
  router.get('/ships/:id', shipController.getShipById);

  // Middleware appliqué seulement aux routes qui créent/modifient
  router.post("/ships", mockAuthMiddleware, (req, res, next) => {
    // On passe le userId injecté au service
    const bodyWithUser = {
      ...req.body,
      ownerUserId: "system", // injecté
    };
    req.body = bodyWithUser;
    return shipController.createShip(req as any, res, next);
  });

  router.patch('/ships/:id', shipController.updateShip);
  router.delete('/ships/:id', shipController.removeShip);

  return router;
};
