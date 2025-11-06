const userService = require("../services/userService");
const loginTokenService = require("../services/loginTokenService"); 

exports.addUpdateUser = async (req, res) => {
  try {
    const result = await userService.addOrUpdateUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ message: "Users retrieved successfully!", userList: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ message: "User retrieved successfully!", user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getUserByName = async (req, res) => {
  try {
    const users = await userService.getUserByName(req.params.userName);
    res.status(200).json({ message: "Users retrieved successfully!", users });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const currentUserId = token ? (await loginTokenService.verifyToken(token)).decoded.id : null;

    const message = await userService.deleteUser(req.params.id, currentUserId);
    res.status(200).json({ message });
  } catch (err) {
    res.status(400).json({ 
      error: err.message,
      details: "Deletion failed" 
    });
  }
};
   
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.login(email, password);

    const result = await loginTokenService.generateTokenForUser(user.id);

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      expiresAt: result.expiresAt,
      user: result.user,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

