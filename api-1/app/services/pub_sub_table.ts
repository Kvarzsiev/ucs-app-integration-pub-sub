import { PubSubModel } from '#models/pub_sub'
import { UserPubSub } from '#services/user_pub_sub'

export class PubSubHandlerTable {
  async handlerTable(pubsubModel: PubSubModel<any>): Promise<boolean> {
    switch (pubsubModel.table) {
      case 'users':
        return await new UserPubSub(pubsubModel).handlerAction()
    }
  }
}
