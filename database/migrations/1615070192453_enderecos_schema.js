'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecosSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments()
      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('cascade')
      .onDelete('cascade')
    table.string('pais', 20).notNullable()
    table.string('estado', 20).notNullable()
    table.string('cidade', 30).notNullable()
    table.string('cep', 12).notNullable()
    table.string('endereco', 130).notNullable()
    table.integer('numeroCasa').unique().notNullable().unsigned()
    table.timestamps()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecosSchema
