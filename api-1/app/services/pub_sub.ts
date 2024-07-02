import { PubSubActionEnum } from '#enums/pub_sub_action_enum'
import env from '#start/env'
import { GooglePubSubPublish } from '#services/pub_sub_publish'

export class PubSubService {
  constructor(object: object, action: PubSubActionEnum, table: 'users', api: 'API1' | 'API2') {
    this.sendToPubSub(object, action, table, api)
  }

  sendToPubSub(object: object, action: PubSubActionEnum, table: 'users', api: 'API1' | 'API2') {
    if (env.get('NODE_ENV') !== 'test') {
      const publish = env.get('GOOGLE_PUBSUB_TOPIC', '')
      const pubPublish = new GooglePubSubPublish(publish)
      pubPublish.createMessages(object, action, table, api ?? 'API1')
    }
  }
}
