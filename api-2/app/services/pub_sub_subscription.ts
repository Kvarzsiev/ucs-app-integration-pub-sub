import { PubSub, Subscription } from '@google-cloud/pubsub'
import { PubSubModel } from '#models/pub_sub'

export class GooglePubSubSubscription {
  constructor(subscriptionName: string) {
    this._subscription = new PubSub().subscription(subscriptionName)
  }
  private _subscription: Subscription

  async listenMessagesV2(
    fn: (obj: PubSubModel<any>) => Promise<boolean>,
    logger?: any
  ): Promise<void> {
    this._subscription.on('message', async (message: any) => {
      const data = JSON.parse(message.data.toString())

      const pubSubModel = new PubSubModel(data.value, data.action, data.table, data.api)
      if (pubSubModel.api !== 'API2') {
        console.log('message received', data)
        await fn(pubSubModel)
          .then(() => {
            message.ack()
          })
          .catch((err) => {
            if (err.routine === '_bt_check_unique') {
              message.ack()
            } else {
              if (logger) {
                logger.warn('___________________________________________________')
                logger.warn('Erro no PubSub (handle):' + JSON.stringify(data[0]))
                logger.warn('Routine:' + err.routine)
                logger.warn('Message:' + err.message)
                logger.warn('Error:' + err)
              }
              //comentada a linha que limpa os console.logs de erros
            }
          })
      } else {
        message.ack()
      }
    })
  }
}
