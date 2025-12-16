const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.criarAdmin = async (req, res) => {
  try {
    const novo = new Admin(req.body);
    await novo.save();
    res.status(201).json({ sucesso: true, mensagem: "Admin criado!" });
  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: "Erro ao criar admin." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.senha !== senha) {
      return res.status(401).json({ sucesso: false, mensagem: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      'seuSegredoJWT',
      { expiresIn: '2h' }
    );

    res.json({ 
      sucesso: true, 
      mensagem: "Login bem-sucedido!", 
      token 
    });

  } catch (erro) {
    res.status(500).json({ sucesso: false, mensagem: "Erro ao fazer login." });
  }
};

exports.perfil = async (req, res) => {
  res.json({ sucesso: true, admin: req.user });
};
