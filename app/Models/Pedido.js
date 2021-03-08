'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pedido extends Model {

    user() {
        return this.belongsTo('App/Models/User')
    }

    produtos() {
        return this.belongsTo('App/Models/Produto')
    }

    enderecos() {
        return this.belongsTo('App/Models/Endereco')
    }
}

module.exports = Pedido
