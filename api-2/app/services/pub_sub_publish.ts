import { PubSub } from '@google-cloud/pubsub'
import { PubSubActionEnum } from '#enums/pub_sub_action_enum'
import { PubSubModel } from '#models/pub_sub'

export class GooglePubSubPublish {
  constructor(topicName: string) {
    this._topicName = topicName
  }
  private _topicName: string
  async createMessages(
    message: object,
    action: PubSubActionEnum,
    table: 'users',
    api?: 'API1' | 'API2'
  ) {
    const pubSubClient = new PubSub()
    const send = new PubSubModel(message, action, table, api)
    // Creates a new topic
    const topic = pubSubClient.topic(this._topicName)
    const dataSend = JSON.stringify(send)
    console.log(dataSend)
    //Create message
    const data: Buffer = Buffer.from(dataSend)
    // Send a message to the topic
    const response = await topic.publishMessage({ data })
    console.log('response', response)
  }
}
