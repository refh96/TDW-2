'use strict'
const User = use('App/Models/User')
class UserController {
     async store ({request, response}){
        const input = request.all();
        await User.create(input);
        return response.json({
            res: true,
            message:"Registro insertado correctamente"
        })
     }

     async login({request, response, auth}){
        let input = request.all();
        let token = await auth.withRefreshToken().attempt(input.email, input.password);
        return response.json({
            res: true,
            token: token,
            message:"Bienvenido al sistema"
        })
     }

     async getUser({response, auth}){
        try{
            return await auth.getUser()
        } catch(error){
            response.send('ningun usuario autenticado')

        }
     }
}

module.exports = UserController
