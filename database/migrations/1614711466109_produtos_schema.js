'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutosSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      table.text('imgProduto').notNullable().unique()
      table.string('nomeProduto', 30).notNullable().unique()
      table.string('descricaoProduto', 254).notNullable().unique()
      table.decimal('precoProduto', 4).notNullable()
      table.integer('qtProdutos').notNullable().unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutosSchema
