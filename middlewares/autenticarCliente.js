const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não enviado." });
  }

  const token = authHeader.split(" ")[1]; // pega só o token, sem "Bearer"

  if (!token) {
    return res.status(401).json({ erro: "Token mal formatado." });
  }

  try {
    const decoded = jwt.verify(token, "seuSegredoJWT"); // MESMO segredo usado no login
    req.user = decoded; // aqui fica id e role
    next();
  } catch (erro) {
    return res.status(401).json({ erro: "Token inválido ou expirado." });
  }
}

module.exports = autenticar;
