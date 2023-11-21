'use strict'
const { validateAll } = use('Validator')
const Dog = use('App/Models/Dog')
class DogController {

  async index ({ request }) {
    const input = request.all();
    if(input.txtBuscar !== undefined){
      return await Dog.query()
                      .where('nombre', 'like', '%' + input.txtBuscar + '%')
                      .fetch();
    }
    return await Dog.all();
  }


//metodo post
  async store ({ request, response }) {
    const input = request.all();
    const rules = {
      nombre: 'required|unique:dogs,nombre',
      url_foto:'unique'
   
    }
    const validation = await validateAll(input, rules)
    if (validation.fails()) {
      return validation.messages();

    }

    await Dog.create(input);

    return response.json({
      res: true,
      message:"Registro insertado correctamente"
    })
  }


  async show ({ params, response }) {
    return await Dog.findOrFail(params.id);
  }



  async update ({ params, request, response }) {
    const input = request.all();

    await Dog.query().where('id', params.id).update(input);
    return response.json({
      rer: true,
      message:"Registro actualizado correctamente"
    })
  }

  async destroy ({ params, response }) {
    const dog = await Dog.findOrFail(params.id)
    await dog.delete();
    return response.json({
      rer: true,
      message:"Registro eliminado correctamente"
    })
  }

  async cargarFoto({request, response, params}){
    const avatar = request.file('avatar',{
      types: ['image'],
      size: '2mb'
    })
    const nombreArchivo = params.id + "." + avatar.extname;
    await avatar.move('./public/fotografias',{
      name: nombreArchivo,
      overwrite: true
    })
    if(!avatar.moved()){
      return response.status(422).send({
        res: false,
        message: avatar.error()
      })
    }
    const dog = await Dog.findOrFail(params.id);
    dog.url_foto = nombreArchivo;
    await dog.save();

    return response.json({
      res: true,
      message:"foto registrada correctamente"
    })
  }
}

module.exports = DogController
