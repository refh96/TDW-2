'use strict'

const { timeStamp } = require('console')

/*
|--------------------------------------------------------------------------
| DogSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
class DogSeeder {
  static async run () {
    await Database.table('dogs').insert([
      {
        'nombre': 'cachupin',
        'url_foto': null,
        'descripcion': 'Senior',
      },
      {
        'nombre': 'copito',
        'url_foto': null,
        'descripcion': 'raza mediana',
      },
      {
        'nombre': 'canela',
        'url_foto': null,
        'descripcion': 'cachorra',
      },
      {
        'nombre': 'balto',
        'url_foto': null,
        'descripcion': 'mitad lobo',
      },
      {
        'nombre': 'bethooven',
        'url_foto': null,
        'descripcion': 'celebridad',
      },
    ])
  }
}

module.exports = DogSeeder
