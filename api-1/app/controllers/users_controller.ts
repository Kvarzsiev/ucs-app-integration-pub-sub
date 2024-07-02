import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator, deleteUserValidator } from '#validators/user'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { PubSubService } from '#services/pub_sub'
import { PubSubActionEnum } from '#enums/pub_sub_action_enum'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.query()
    return response.ok(users)
  }

  async store({ request, response }: HttpContext) {
    const payload = await createUserValidator.validate(request.all())

    const user = await db.transaction(async (trx) => {
      const transactedUser = await User.create(payload, { client: trx })

      new PubSubService(transactedUser.$attributes, PubSubActionEnum.insert, 'users', 'API1')

      return transactedUser
    })

    response.created(user)
  }

  async update({ request, response }: HttpContext) {
    const payload = await updateUserValidator.validate(request.all())

    // const user = await User.create(payload)

    response.ok(payload)
  }

  async delete({ request, response }: HttpContext) {
    const payload = await deleteUserValidator.validate(request.all())

    await db.transaction(async (trx) => {
      const user = await User.findByOrFail('id', payload.params.id, { client: trx })
      await user.useTransaction(trx).delete()
    })

    response.noContent()
  }
}
