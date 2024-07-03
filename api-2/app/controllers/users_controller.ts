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

      await PubSubService.sendToPubSub(
        transactedUser.$attributes,
        PubSubActionEnum.insert,
        'users',
        'API2'
      )

      return transactedUser
    })

    response.created(user)
  }

  async update({ request, response }: HttpContext) {
    const payload = await updateUserValidator.validate({
      ...request.all(),
      ...request.params(),
    })

    const user = await db.transaction(async (trx) => {
      const transactedUser = await User.findByOrFail('id', payload.id, { client: trx })

      transactedUser.name = payload.name
      transactedUser.email = payload.email
      transactedUser.birthDate = payload.birthDate
      await transactedUser.useTransaction(trx).save()

      await PubSubService.sendToPubSub(
        transactedUser.$attributes,
        PubSubActionEnum.update,
        'users',
        'API2'
      )

      return transactedUser
    })

    response.ok(user)
  }

  async delete({ request, response }: HttpContext) {
    const payload = await deleteUserValidator.validate(request.params())

    await db.transaction(async (trx) => {
      const user = await User.findByOrFail('id', payload.id, { client: trx })
      await user.useTransaction(trx).delete()

      await PubSubService.sendToPubSub(user.$attributes, PubSubActionEnum.delete, 'users', 'API2')
    })

    response.noContent()
  }
}
