'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidosSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('cascade')
      .onDelete('cascade')
      table
      .integer('produto_id')
      .unsigned()
      .references('id')
      .inTable('produtos')
      .onUpdate('cascade')
      .onDelete('cascade') 
      table.integer('qtProdutosPedidos').notNullable().unsigned()
      table.decimal('valorPedido').notNullable()
      table
      .integer('endereco_id')
      .unsigned()
      .references('id')
      .inTable('enderecos')
      .onUpdate('cascade')
      .onDelete('cascade')
     
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidosSchema
