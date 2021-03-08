'use strict'

const User = use('App/Models/User')

class UsuarioController {

async create({request, response}){
    try {
    const cadastro = request.all()
    const dados = await User.create(cadastro)
    
    
    return response.status(200).send({message: 'Sucesso ao cadastrar o usuário!', dados})

    }catch(e){
        return response.status(406).send({message: 'Erro ao cadastrar!', e})
    }
}
 
async read({response}) {

    try {

        const dados = await User.all()

        if (!dados) {
            return response.status(500).send({ message: 'Não foram encontrados dados no banco de dados' })
        }
        
        return dados

    }catch(e){
        return response.status(406).send({ message: 'Não ao listar o usuários', e })
    }

}

async readById({ response, params}){
    const { id } = params
    try {

        const dados = await User.query().where('id', id).first()

        if (!dados) {
            return response.status(500).send({ message: 'Não foram encontrados dados no banco de dados' })
        }

        return dados

    }catch(e){
        return response.status(406).send({ message: 'Erro ao listar os usuário'})
    }

}

async update({request, response, params}){
    const { id } = params
    

    try {
        // const {username, email, cpf, password} = request.post()
        const editar = request.post()
        const dados = await User.query().where('id', id).first()

        if (!dados) {
            return response.status(500).send({ message: 'Não foram encontrados dados no banco de dados' })
        }

        dados.username = editar.username,
        dados.email = editar.email,
        dados.cpf = editar.cpf,
        dados.password = editar.password,
        dados.id = id

        await dados.save()

        return response.status(500).send({ message: 'Dados editados com sucesso!'})

    }catch(e){
        return response.status(406).send({ message: 'Não ao editar o usuário!', e })
    }

}

async delete({response, params}){
    const { id } = params

    try {
        const dados = await User.query().where('id', id).first()

        if (!dados) {
            return response.status(500).send({ message: 'Não foram encontrados dados no banco de dados' })
        }

      await dados.delete()

      return response.status(500).send({ message: 'Dados deletados com sucesso!', dados })


    }catch(e){
        return response.status(406).send({ message: 'Não ao deletar o usuário!', e })
    }

}
}

module.exports = UsuarioController
