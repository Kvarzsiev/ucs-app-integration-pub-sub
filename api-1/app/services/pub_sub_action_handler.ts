import { PubSubModel } from '#models/pub_sub'

export abstract class PubSubHandlerAction<T> {
  constructor(pubsubModel: PubSubModel<T>) {
    this._pubsubValueModel = pubsubModel
  }
  protected _pubsubValueModel: PubSubModel<T>

  async handlerAction(): Promise<boolean> {
    switch (this._pubsubValueModel.action) {
      case 'insert':
        return await this.insert()
      case 'insert_many':
        return await this.insertMany()
      case 'update':
        return await this.update()
      case 'update_many':
        return await this.updateMany()
      case 'delete':
        return await this.delete()
      case 'delete_many':
        return await this.deleteMany()
      default:
        return true
    }
  }

  protected insert(): Promise<boolean> {
    throw new Error('Method insert PubSub handler action not implemented.')
  }
  protected insertMany(): Promise<boolean> {
    throw new Error('Method insertMany PubSub handler action not implemented.')
  }
  protected update(): Promise<boolean> {
    throw new Error('Method update PubSub handler action not implemented.')
  }
  protected updateMany(): Promise<boolean> {
    throw new Error('Method updateMany PubSub handler action not implemented.')
  }
  protected delete(): Promise<boolean> {
    throw new Error('Method delete PubSub handler action not implemented.')
  }
  protected deleteMany(): Promise<boolean> {
    throw new Error('Method deleteMany PubSub handler action not implemented.')
  }
  protected buildData(): Object {
    throw new Error('Method buildData PubSub handler action not implemented.')
  }
}
