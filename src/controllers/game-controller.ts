import { Request, Response } from "express";

import gameService from "../services/game-service";

const gameController = {
  handleNextStep: (
    req: Request<unknown, unknown, Array<Array<number>>>,
    res: Response
  ): void => {
    const updatedGrid = gameService.handleNextStep(req.body);
    res.json({ data: updatedGrid });
  },
};

export default gameController;
