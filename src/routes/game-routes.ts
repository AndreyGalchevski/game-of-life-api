import { Router } from "express";
import gameController from "../controllers/game-controller";

const gameRoutes = Router();

gameRoutes.post("/next-step", gameController.handleNextStep);

export default gameRoutes;
