'use strict'

/*
|--------------------------------------------------------------------------
| DataBaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const DogSeeder = use('./DogSeeder')

class DataBaseSeeder {
  async run () {
    await DogSeeder.run();
  }
}

module.exports = DataBaseSeeder
