const loginTokenService = require("../services/loginTokenService");


const JWT_SECRET = process.env.JWT_SECRET;

exports.createToken = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await loginTokenService.generateTokenForUser(userId);

    res.status(201).json({
      message: "Token created successfully",
      token: result.token,
      expiresAt: result.expiresAt,
      user: result.user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteTokens = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await loginTokenService.deleteTokensForUser(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    const result = await loginTokenService.verifyToken(token);

    res.status(200).json({
      message: "Token is valid",
      decoded: result.decoded,
    });

  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    const result = await loginTokenService.logoutUser(token);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};



exports.getToken = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await loginTokenService.getTokenForUser(userId);

    res.status(200).json({
      message: "Token fetched successfully",
      token: result.token,
      expiresAt: result.expiresAt,
      user: result.user,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
