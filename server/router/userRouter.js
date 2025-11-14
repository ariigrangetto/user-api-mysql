import { Router } from "express";
import { ModelControler } from "../controller/userController.js";

export default function createRouter({ userModel }) {
  const userRouter = Router();

  const userController = new ModelControler({ userModel });

  userRouter.get("/", userController.getUsers);
  userRouter.get("/:id", userController.getUser);
  userRouter.get("/name/:firstName", userController.getUserFirstName);
  userRouter.post("/", userController.postUser);
  userRouter.delete("/:id", userController.deleteUser);
  userRouter.patch("/:id", userController.patchUser);

  return userRouter;
}
