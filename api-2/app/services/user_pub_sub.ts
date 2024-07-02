import { PubSubModel } from '#models/pub_sub'
import User from '#models/user'
import { PubSubHandlerAction } from '#services/pub_sub_action_handler'

export class UserPubSub extends PubSubHandlerAction<User> {
  constructor(pubsubModel: PubSubModel<User>) {
    super(pubsubModel)
  }
  protected async insert(): Promise<boolean> {
    const user: User = this.buildData()
    await User.create(user)
    return true
  }
  protected async update(): Promise<boolean> {
    const user = await User.findByOrFail('id', this.getId())
    const update = this.buildData()
    user.id = update.id
    user.name = update.name
    user.email = update.email
    user.birthDate = update.birthDate
    await user.save()
    return true
  }
  protected async delete(): Promise<boolean> {
    const user = await User.findByOrFail('id', this.getId())
    await user.delete()
    return true
  }
  protected buildData(): User {
    const model: User = new User()
    model.id = this._pubsubValueModel.value.id
    model.name = this._pubsubValueModel.value.name
    model.email = this._pubsubValueModel.value.email
    model.birthDate = this._pubsubValueModel.value.birthDate
    return model
  }

  protected getId() {
    return this._pubsubValueModel.value.id
  }
}
