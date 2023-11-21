'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Interaccion extends Model {
    static get table(){
        return 'interaccions';
    }
    static get hidden(){
        return ['updated_at']
    }
}

module.exports = Interaccion
