import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

import User from '../../Models/User'

export default class SecurityController {

    public async signup({request, response}: HttpContextContract) {
        const validations = await schema.create({
            email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
            password: schema.string({}, [rules.confirmed()]),
        })
        const data = await request.validate({ schema: validations })
        const user = await User.create(data)
        return response.created(user)
    }

    public async signin({ request, response, auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            const token = await auth.use('api').attempt(email, password, { expiresIn: '24hours' })
            return token.toJSON()
        } catch {
            return response.unauthorized('Invalid credentials')
        }
    }

    //   logout function
    public async logout({ auth, response }: HttpContextContract) {
        await auth.logout()
        return response.status(200)
    }
}
