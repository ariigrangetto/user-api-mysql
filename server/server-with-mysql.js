import { UserModel } from "./model/mysql/useModel.js";
import { createApp } from "./users.js";

createApp({ userModel: UserModel });
