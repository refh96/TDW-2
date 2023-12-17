'use strict'

const { validateAll } = use('Validator')
const Interaccion = use('App/Models/Interaccion')
class InteraccionController {

  async index ({ request, response }) {
    const input = request.all();
    if(input.txtBuscar !== undefined){
      return await Interaccion.query()
                      .where('preferencia', 'like', '%' + input.txtBuscar + '%')
                      .fetch();
    }
    return await Interaccion.all();

  }


  async store ({ request, response }) {
    const input = request.only(['perro_interesado_id', 'perro_candidato_id', 'preferencia'])
    const rules = {
    preferencia: 'required|min:1|max:1|'
    }
   
    const validation = await validateAll(input, rules)
    if (validation.fails()) {
      return validation.messages();

    }
    await Interaccion.create(input)
    return response.json({ res:true, message:"it s a match!" })
  }

  async show ({ params }) {
    return await Interaccion.findOrFail(params.id);

  }


  async update ({ params, request, response }) {
    const input = request.all();
    await Interaccion.query().where('id', params.id).update(input);
    return response.json({
      res: true,
      message:"Registro actualizado correctamente"
    })
  }


  async destroy ({ params, request, response }) {
    const interaccion = await Interaccion.findOrFail(params.id)
    await interaccion.delete();
    return response.json({
      rer: true,
      message:"Registro eliminado correctamente"
    })
  }
  /*async getPerroInteresado({ response }) {
    try {
      const apiResponse = await axios.get('https://dog.ceo/api/breeds/image/random')
      const { data } = apiResponse

      const perroInteresado = {
        id: 1,
        nombre: data.message.split('/')[4]
      }

      return response.json(perroInteresado)
    } catch (error) {
      return response.status(500).json({ error: 'Error al obtener el perro interesado' })
    }
  }*/
  async guardarPreferencias({ request, response }) {
    try {
      const {
        perro_interesado_id,
        perro_candidatos_aceptados,
        perro_candidatos_rechazados
      } = request.only([
        'perro_interesado_id',
        'perro_candidatos_aceptados',
        'perro_candidatos_rechazados'
      ])

      for (const candidato of perro_candidatos_aceptados) {
        await Interaccion.create({
          perro_interesado_id,
          perro_candidato_id: candidato.id,
          preferencia: 'A'
        })
      }

      for (const candidato of perro_candidatos_rechazados) {
        await Interaccion.create({
          perro_interesado_id,
          perro_candidato_id: candidato.id,
          preferencia: 'R'
        })
      }

      return response.json({ message: 'Preferencias guardadas exitosamente' })
    } catch (error) {
      return response.status(500).json({ error: 'Error al guardar las preferencias' })
    }
  }
   async perrosAceptados({ params, response, request }) {
    try {
      const input = request.only(['perro_interesado_id', 'perro_candidato_id', 'preferencia'])
      const perrosAceptados = await Interaccion.query()
        .where('perro_interesado_id', input)
        .where('preferencia', 'A', input)
        .with('perro_candidato_id', input)
        .fetch()

      return response.json(perrosAceptados)
    } catch (error) {
      return response.status(500).json({ error: 'Error al obtener perros aceptados' })
    }
  }

  async perrosRechazados({ params, response, request }) {
    try {
      const input = request.only(['perro_interesado_id', 'perro_candidato_id', 'preferencia'])
      const perrosRechazados = await Interaccion.query()
        .where('perro_interesado_id', input)
        .where('preferencia', 'R', input)
        .with('perro_candidato_id', input)
        .fetch()

      return response.json(perrosRechazados)
    } catch (error) {
      return response.status(500).json({ error: 'Error al obtener perros rechazados' })
    }
  }
}

module.exports = InteraccionController
