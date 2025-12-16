const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProdutoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true
    },

    descricao: {
      type: String,
      default: ""
    },

    preco: {
      type: Number,
      required: true,
      min: 0.01
    },

    precoOriginal: {
      type: Number,
      default: 0,
      min: 0
    },

    categoria: {
      type: String,
      required: true
    },

    estoque: {
      type: Number,
      default: 0,
      min: 0
    },

    imagem: {
      type: String,
      default: "img/placeholder.png"
    },

    emOferta: {
      type: Boolean,
      default: false
    },

    ativo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Produto", ProdutoSchema);
