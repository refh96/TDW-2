'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InteraccionSchema extends Schema {
  up () {
    this.create('interaccions', (table) => {
      table.increments()
      table.integer('perro_interesado_id').unsigned().references('id').inTable('dogs').onDelete('CASCADE');
      table.integer('perro_candidato_id').unsigned().references('id').inTable('dogs').onDelete('CASCADE');
      table.string('preferencia').required();
      table.timestamps();
    })
  }

  down () {
    this.drop('interaccions')
  }
}

module.exports = InteraccionSchema
