const authService = require("../services/auth.service");

async function login(req, res) {
  try {
    const token = await authService.loginUser(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { login };