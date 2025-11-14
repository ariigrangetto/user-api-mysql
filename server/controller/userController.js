import { validatePartialUser, validateUser } from "../schema/userSchema.js";

export class ModelControler {
  constructor({ userModel }) {
    this.userModel = userModel;
  }
  getUsers = async (req, res) => {
    const users = await this.userModel.getUsers();
    if (!users) {
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(201).json({ message: "ok", users });
  };

  getUser = async (req, res) => {
    const { id } = req.params;
    const user = await this.userModel.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json({ message: "ok", user });
  };

  getUserFirstName = async (req, res) => {
    const { firstName } = req.params;
    const user = await this.userModel.getUserFirstName(firstName);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json({ message: "ok", user });
  };

  postUser = async (req, res) => {
    const response = validateUser(req.body);

    if (!response.success) {
      return res.status(404).json({ error: response.error.message });
    }

    const postedUser = await this.userModel.createUser(response.data);

    if (!postedUser) {
      res.status(404).json({ message: "User cannot be created" });
    }

    res.status(201).json({ message: "ok", postedUser });
  };

  patchUser = async (req, res) => {
    const { id } = req.params;
    const validateUpdateUser = validatePartialUser(req.body);

    if (!validateUpdateUser.success) {
      return res.status(404).json({ error: validateUpdateUser.error.message });
    }

    const updatedUser = await this.userModel.patchUser(
      validateUpdateUser.data,
      id
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User cannot be modified" });
    }

    return res.status(201).json({ message: "ok", updatedUser });
  };

  deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await this.userModel.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(201).json({ message: "ok", deletedUser });
  };
}
