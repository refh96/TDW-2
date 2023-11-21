'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DogSchema extends Schema {
  up () {
    this.create('dogs', (table) => {
      table.increments()
      table.string('nombre').unique().notNullable();
      table.string('url_foto');
      table.string('descripcion');
      table.timestamps();
    })
  }

  down () {
    this.drop('dogs')
  }
}

module.exports = DogSchema
