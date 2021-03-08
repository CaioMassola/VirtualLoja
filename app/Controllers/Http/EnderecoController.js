'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Endereco = use('App/Models/Endereco');

class EnderecoController {

  async index({ response }) {

    try {
      const endereco = await Endereco.query().with('user', x => {
        x.select('id', 'username')
      }).fetch()

      if (endereco.rows.length == 0) {
        return response.status(200).send({ message: 'Usuário não tem endereço cadastrado!' })
      }
      return endereco

    } catch (e) {
      return response.status(406).send({ message: 'Erro ao listar o endereço!' })
    }
  }

  async store({ request, auth, response }) {

    try {
      const criar = request.only(['pais', 'estado', 'cidade', 'cep', 'endereco', 'numeroCasa'])

      const dados = await Endereco.create({ user_id: auth.user.id, ...criar })

      return response.status(200).send({ message: 'Endereço cadastrado com sucesso!', dados })

    } catch (e) {
      return response.status(406).send({ message: 'Houve um problema ao cadastrar o endereço!' })
    }
  }

  async show({ params, response }) {
    try {
      const endereco = await Endereco.findOrFail(params.id);

      if (!endereco) {
        return response.status(200).send({ message: 'Usuário não tem endereço cadastrado!' })
      }
      return endereco

    } catch (e) {
      return response.status(406).send({ message: 'Houve um problema para listar o endereço!' })
    }
  }

  async update({ params, request, response, auth }) {

    try {
      const { pais, estado, cidade, cep, endereco, numeroCasa } = request.post()

      const dados = await Endereco.query().where('id', params.id).first()

      dados.pais = pais,
        dados.estado = estado,
        dados.cidade = cidade,
        dados.cep = cep,
        dados.endereco = endereco,
        dados.numeroCasa = numeroCasa

      if (dados.user_id != auth.user.id) {
        return response.status(401).send({ message: 'Você não pode deletar este endereço!' })
      }

      await dados.save()

      return response.status(200).send({ message: 'Endereço editado com sucesso!', dados })

    } catch (e) {
      return response.status(406).send({ message: 'Houve um problema ao cadastrar o endereço!' })
    }
  }


  async destroy({ params, response, auth }) {

    try {
      const endereco = await Endereco.findOrFail(params.id);

      if (endereco.user_id != auth.user.id) {
        return response.status(401).send({ message: 'Você não pode deletar este endereço!' })
      }
      await endereco.delete();

      return response.status(200).send({ message: 'Endereço deletados com sucesso!' })
    } catch (e) {
      return response.status(406).send({ message: 'Houve um problema ao deletar o endereço!' })
    }
  }
}
module.exports = EnderecoController
