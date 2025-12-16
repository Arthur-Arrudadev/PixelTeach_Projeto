module.exports = function verificarAdmin(req, res, next) {
  try {
    // usuário vem armazenado após o login (provavelmente no req.user ou req.cliente)
    const usuario = req.user || req.cliente;

    if (!usuario) {
      return res.status(401).json({ erro: "Usuário não autenticado." });
    }

    if (usuario.role !== "admin") {
      return res.status(403).json({ erro: "Acesso negado. Apenas administradores." });
    }

    next(); // passa pra próxima etapa caso seja admin
  } catch (erro) {
    console.error("Erro no middleware de admin:", erro);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
};

