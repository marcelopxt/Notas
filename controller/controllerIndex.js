const anotacoes = require('../model/anotacaoMongo.js');


exports.tela_principal = async function (req, res) {
  var tag = req.body.tag;

  var todasAnotacoes = await anotacoes.lista();
  var anotacoesFiltradas = await anotacoes.listaTag(tag);
  var todasCriadas = await anotacoes.qtdTag("Todas");
  var qtdPessoal = await anotacoes.qtdTag("Pessoal")
  var qtdLazer = await anotacoes.qtdTag("Lazer")
  var qtdTrabalho = await anotacoes.qtdTag("Trabalho")
  var qtdCurso = await anotacoes.qtdTag("Curso")
  var vetorUtilizadas = []

  var pessoal = false
  var trabalho = false
  var lazer = false
  var curso = false
  var maisUtilizada
  var vetorEmpate = []
  var maiorqtd = 0;
  var resposta

  if ((tag == "Todas" || tag === undefined)) {
    retorno = todasAnotacoes
  } else {
    retorno = anotacoesFiltradas
  }

  retorno.forEach((anotacao) => {
    switch (anotacao.tag) {
      case "Pessoal":
        anotacao.pessoal = true;
        pessoal = true;
        break;
      case "Trabalho":
        anotacao.trabalho = true;
        trabalho = true;
        break;
      case "Curso":
        anotacao.curso = true;
        curso = true;
        break;
      case "Lazer":
        anotacao.lazer = true;
        lazer = true;
        break;
    }
  });

  if (pessoal) {
    vetorUtilizadas.push("Pessoal")
  }
  if (trabalho) {
    vetorUtilizadas.push(" Trabalho")
  }
  if (lazer) {
    vetorUtilizadas.push(" Lazer")
  }
  if (curso) {
    vetorUtilizadas.push(" Curso")
  }


  if (qtdPessoal > qtdLazer && qtdPessoal > qtdTrabalho && qtdPessoal > qtdCurso) {
    maiorqtd = qtdPessoal
    resposta = "Pessoal"
  }else
  if ((qtdTrabalho > qtdLazer && qtdTrabalho > qtdPessoal && qtdTrabalho > qtdCurso)) {
    maiorqtd = qtdTrabalho
    resposta = "Trabalho"
  }else
  if (qtdLazer > qtdPessoal && qtdLazer > qtdTrabalho && qtdLazer > qtdCurso) {
    maiorqtd = qtdLazer
    resposta = "Lazer"
  }else
  if ((qtdCurso > qtdLazer && qtdCurso > qtdPessoal && qtdCurso > qtdTrabalho)) {
    maiorqtd = qtdCurso
    resposta = "Curso"
  }else{

    if (qtdCurso != maiorqtd) {
      vetorEmpate.push(" Curso")
      resposta = vetorEmpate
    }
    if (qtdLazer != maiorqtd) {
      vetorEmpate.push(" Lazer")
      resposta = vetorEmpate
    }
    if (qtdTrabalho != maiorqtd) {
      vetorEmpate.push(" Trabalho")
      resposta = vetorEmpate
    }
    if (qtdPessoal != maiorqtd) {
      vetorEmpate.push(" Pessoal")
      resposta = vetorEmpate
    }

  }
    



  // if (qtdCurso == maiorqtd) {
  //   vetorEmpate.push(" Curso")
  // }
  // if (qtdLazer == maiorqtd) {
  //   vetorEmpate.push(" Lazer")
  // }
  // if (qtdTrabalho == maiorqtd) {
  //   vetorEmpate.push(" Trabalho")
  // }
  // if (qtdPessoal == maiorqtd) {
  //   vetorEmpate.push(" Pessoal")
  // }

  console.log(vetorEmpate)



  condescricao = {
    titulo_pagina: "Gerenciador de Notas de Texto",
    anotacoes: retorno,
    pessoal: pessoal,
    curso: curso,
    lazer: lazer,
    trabalho: trabalho,
    qtdPessoal: qtdPessoal,
    qtdLazer: qtdLazer,
    qtdTrabalho: qtdTrabalho,
    qtdCurso: qtdCurso,
    notasCriadas: todasCriadas,
    tagsUtilizadas: vetorUtilizadas,
    maisUtilizada: resposta
  };

  res.render('index', condescricao);

}


exports.tela_sobre = async function (req, res) {
  condescricao = {
    titulo_pagina: "Sobre a Aplicação",
  }
  res.render('sobre', condescricao);
}

exports.tela_errorID = async function (req, res) {
  var id = req.params.id;
  console.log(id)
  condescricao = {
    titulo_pagina: "Erro ao encontrar id",
    id: id,
  };
  res.render('errorid', condescricao);
};
