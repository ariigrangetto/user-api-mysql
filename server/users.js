import express from "express";
import cors from "cors";
import "dotenv/config";
import process from "process";
import createRouter from "./router/userRouter.js";

export function createApp({ userModel }) {
  console.log("hello");
  const app = express();
  app.disable("x-powered-by");

  app.use(cors());
  app.use(express.json()); //middleware global

  app.use("/", createRouter({ userModel }));

  app.use((req, res) => {
    res.status(404).send("<h1>404 - NOT FOUND");
  });

  const PORT = process.env.PORT;

  app.listen(PORT, () =>
    console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`)
  );

  app.on("error", (err) => {
    console.log("Error al escuchar el servidor: " + err.message);
    process.exit(1);
  });
}
