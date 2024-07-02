import { PubSubActionEnum } from '#enums/pub_sub_action_enum'
import env from '#start/env'
import { GooglePubSubPublish } from '#services/pub_sub_publish'

export class PubSubService {
  static async sendToPubSub(
    object: object,
    action: PubSubActionEnum,
    table: 'users',
    api: 'API1' | 'API2'
  ) {
    try {
      console.log('sendToPubSub')
      const publish = env.get('GOOGLE_PUBSUB_TOPIC', '')
      const pubPublish = new GooglePubSubPublish(publish)
      await pubPublish.createMessages(object, action, table, api ?? 'API2')
    } catch (err) {
      console.error('Erro ao criar mensagem', err)
    }
  }
}
