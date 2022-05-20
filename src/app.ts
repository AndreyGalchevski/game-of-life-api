import express from "express";
import cors from "cors";

import gameRoutes from "./routes/game-routes";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ limit: "50kb" }));

app.use("/game", gameRoutes);

export default app;
