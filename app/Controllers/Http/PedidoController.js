'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Pedidos = use('App/Models/Pedido')
const Produtos = use('App/Models/Produto')
const Endereco = use('App/Models/Endereco')

class PedidoController {

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  async criar({ request, response, auth }) {
    try {
      const { produto_id, qtProdutosPedidos } = request.post()

      const estoque = await Produtos.query().select('id', 'qtProdutos', 'precoProduto').where('id', produto_id).first()
      estoque
      if (estoque.qtProdutos >= qtProdutosPedidos) {
        const criar = request.only(['produto_id', 'qtProdutosPedidos', 'endereco_id'])

        //atualiza o valor do pedido com base no preço do pedido
        let newValor = qtProdutosPedidos * estoque.precoProduto
        const dados = await Pedidos.create({ user_id: auth.user.id, valorPedido: newValor, ...criar })

        //atualiza o estoque com base no pedido
        let newEstoque = estoque.qtProdutos - qtProdutosPedidos
        estoque.qtProdutos = newEstoque
        // estoque.id = produto_id

        await estoque.save()

        return response.status(200).send({ message: 'Pedido efetuado com sucesso', dados })
      } else {
        return response.status(200).send({ message: 'Não há estoque suficiente para esse pedido!' })
      }
    } catch (e) {
      return response.status(406).send({ message: 'Houve algum problema!' })
    }
  }

  async listarAllByUser({ request, response, view, auth }) {

    try {
      const usuarios = []
      const dados = await Pedidos.query().select()
        .with('user', x => {
          x.select('id', 'username', 'email')
        }).fetch()


      for (const x of dados.toJSON()) {
        const usuario = {
          idUsuario: x.user.id,
          username: x.user.username,
          email: x.user.email,
          idPedido: x.id,
          qtPedido: x.qtProdutosPedidos,
          precoPedido: x.valorPedido,
          idProduto: x.produto_id,
          nomeProduto: '',
          descricaoProduto: '',
          precoProduto: '',
          idEndereco: x.endereco_id,
          pais: '',
          estado: '',
          cidade: '',
          cep: '',
          endereco: '',
          numeroCasa: ''
        }

        const produto = await Produtos.query().select().where('id', usuario.idProduto).first()
        usuario.nomeProduto = produto.nomeProduto
        usuario.descricaoProduto = produto.descricaoProduto
        usuario.precoProduto = produto.precoProduto

        const endereco = await Endereco.query().select().where('id', usuario.idEndereco).first()
        usuario.pais = endereco.pais
        usuario.estado = endereco.estado
        usuario.cidade = endereco.cidade
        usuario.cep = endereco.cep
        usuario.endereco = endereco.endereco
        usuario.numeroCasa = endereco.numeroCasa

        usuarios.push(usuario)
      }
      if (!dados) {
        return response.status(200).send({ message: 'Usuário não tem pedidos!' })
      }
      return usuarios
    } catch (e) {
      return response.status(406).send({ message: 'Houve algum problema!' })
    }
  }

  async listarTodosAllUser({ request, response, params }) {
    try {
      const dados = await Pedidos.all()

      return dados

    } catch (e) {
      return response.status(406).send({ message: 'Houve algum problema!' })
    }
  }

  async listarById({ params, request, response, view }) {
    try {
      const data = await Pedidos.findOrFail(params.id)

      const dados = await Pedidos.query().select()
        .with('user', x => {
          x.select('id', 'username', 'email')
          x.where('id', data.user_id)
        })
        .with('produtos', x => {
          x.select('id', 'nomeProduto', 'descricaoProduto', 'precoProduto')
          x.where('id', data.produto_id)
        })
        .with('enderecos', x => {
          x.select('id', 'pais', 'estado', 'cidade', 'cep', 'endereco', 'numeroCasa')
          x.where('id', data.endereco_id)
        }).where('id', params.id).first()

      if (!data) {
        return response.status(200).send({ message: 'Usuário não tem pedidos!' })
      }
      return dados

    } catch (e) {
      return response.status(406).send({ message: 'Houve algum problema!' })
    }
  }

  async delete({ params, request, response, auth }) {
    try {
      const dados = await Pedidos.findOrFail(params.id)
      if (dados.user_id != auth.user.id) {
        return response.status(401).send({ message: 'Você não pode deletar este pedido!' })
      }
      await dados.delete()

      return response.status(200).send({ message: 'Pedido deletado com sucesso!' })
    } catch (e) {
      return response.status(406).send({ message: 'Houve algum problema!' })
    }
  }
}

module.exports = PedidoController
