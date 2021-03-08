'use strict'


const Produtos = use('App/Models/Produto')

class ProdutoController {


  async create({ request, response, auth }) {
    try {

      if(auth.user.id==1) {

     
      const cadastroProduto = request.all()
      const dados = await Produtos.create(cadastroProduto)


      return response.status(200).send({ message: 'Sucesso ao cadastrar o produto!', dados })
    } else {
      return response.status(401).send({ message: 'Usuário não tem permissão!' })
    }
    } catch (e) {
      return response.status(406).send({ message: 'Erro ao cadastrar o produto!', e })
    }
  }


  async show({ response }) {
    try {

      const dados = await Produtos.query().select('id', 'nomeProduto', 'descricaoProduto', 'precoProduto', 'qtProdutos').fetch()


      if (!dados) {
        return response.status(500).send({ message: 'Não foram encontrados dados no banco de dados' })
      }

      return dados

    } catch (e) {
      return response.status(406).send({ message: 'Erro ao listar o produto!', e })
    }
  }


  async showWithImg({ response }) {
    try {

      const dados = await Produtos.all()


      if (!dados) {
        return response.status(500).send({ message: 'Não foram encontrados dados no banco de dados' })
      }

      return dados

    } catch (e) {
      return response.status(406).send({ message: 'Erro ao listar o produto!', e })
    }
  }

  async showById({ params, response }) {
    const { id } = params
    try {

      const dados = await Produtos.query().where('id', id).first()

      if (!dados) {
        return response.status(500).send({ message: 'Não foram encontrados dados no banco de dados' })
      }

      return dados

    } catch (e) {
      return response.status(406).send({ message: 'Erro ao listar os produtos' })
    }
  }

  async edit({ params, request, response, view }) {

    const { id } = params


    try {
      // const {username, email, cpf, password} = request.post()
      const editar = request.post()
      const dados = await Produtos.query().where('id', id).first()

      if (!dados) {
        return response.status(500).send({ message: 'Não foram encontrados dados no banco de dados' })
      }

      dados.imgProduto = editar.imgProduto,
        dados.nomeProduto = editar.nomeProduto,
        dados.descricaoProduto = editar.descricaoProduto,
        dados.precoProduto = editar.precoProduto,
        dados.qtProdutos = editar.qtProdutos
      dados.id = id

      await dados.save()

      return response.status(500).send({ message: 'Dados editados com sucesso!', dados })

    } catch (e) {
      return response.status(406).send({ message: 'Erro ao editar o produto!', e })
    }
  }

  async destroy({ params, response }) {
    const { id } = params

    try {
      const dados = await Produtos.query().where('id', id).first()

      if (!dados) {
        return response.status(500).send({ message: 'Não foram encontrados dados no banco de dados' })
      }

      await dados.delete()

      return response.status(500).send({ message: 'Dados deletados com sucesso!', dados })


    } catch (e) {
      return response.status(406).send({ message: 'Não ao deletar o ´produto!', e })
    }
  }
}

module.exports = ProdutoController
