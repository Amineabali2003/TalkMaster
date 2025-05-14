const authService = require("../services/auth.service");

exports.login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    await authService.requestPasswordReset(req.body.email);
    res.json({ message: "Email envoyé" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.body.token, req.body.newPassword);
    res.json({ message: "Mot de passe réinitialisé" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};