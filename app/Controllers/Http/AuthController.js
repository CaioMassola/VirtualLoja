'use strict'

class AuthController {

    async login({request, response, auth}){
        try {
            const {email, password} = request.post();

            const token = await auth.attempt(email, password);

            return token;

        }catch(e) {
            return response.status(500).send({message: 'Usuário não cadastrado!'})
        }
    }
}

module.exports = AuthController
