'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Dog extends Model {
    static get table(){
        return 'dogs';
    }
    
    static get hidden(){
        return ['updated_at','created_at']
    }
    interestedInteractions() {
        return this.hasMany('App/Models/Interaccion', 'id', 'perro_interesado_id')
      }
    
    candidateInteractions() {
        return this.hasMany('App/Models/Interaccion', 'id', 'perro_candidato_id')
      }
}

module.exports = Dog
