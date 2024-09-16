const mongodb = require("mongodb");
const ClienteMongo = mongodb.MongoClient;
var cliente;
const conexao_bd = async () => {
  if (!cliente)
    cliente = await ClienteMongo.connect("mongodb://127.0.0.1:27017");
};
const bd = () => {
  return cliente.db("anotacoes");
};

class AnotacaoMongo {
  async close() {
    if (cliente) cliente.close();
    cliente = undefined;
  }
  async cria(anotacao) {
    await conexao_bd();
    const colecao = bd().collection("anotacoes");
    await colecao.insertOne(anotacao);
  }
  async atualiza(anotacao, chave) {
    await conexao_bd();
    const colecao = bd().collection("anotacoes");
    await colecao.updateOne(
      { _id: new mongodb.ObjectId(chave)},
      {
        $set: {
          titulo: anotacao.titulo,
          descricao: anotacao.descricao,
          tag: anotacao.tag,
        },
      }
    );
  }
  async consulta(chave) {
    await conexao_bd();
    const colecao = bd().collection("anotacoes");
    const anotacao = await colecao.findOne({ _id: new mongodb.ObjectId(chave) });
    return anotacao;
  }
  async deleta(chave) {
    await conexao_bd();
    const colecao = bd().collection("anotacoes");
    const doc = await colecao.findOne({ _id: new mongodb.ObjectId(chave) });
    if (!doc) {
    throw new Error( "Não existe a anotação com chave: ${chave}");
    } else {
      await colecao.findOneAndDelete({  _id: new mongodb.ObjectId(chave) });
    }
  }
  async lista() {
    await conexao_bd();
    const colecao = bd().collection("anotacoes");
    var anotacoes = await colecao.find({}).toArray();
    return anotacoes;
  }

  async listaTag(tag) {
    await conexao_bd();
    const colecao = bd().collection("anotacoes");
    var anotacoes = await colecao.find({tag: tag}).toArray();
    return anotacoes;
  }

 

  async qtdTag(tag) {
    await conexao_bd();
    const colecao = bd().collection("anotacoes");
    var qtd = await colecao.count({});
    if (tag !== "Todas") {
      qtd = await colecao.count({tag: tag});
    }
    return qtd;
  }

}


module.exports = new AnotacaoMongo();