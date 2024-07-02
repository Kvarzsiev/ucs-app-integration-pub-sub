import type { ApplicationService } from '@adonisjs/core/types'

export default class PubSubProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {
    // --------------PUBSUB----------------
    // Importa a função do pubsub
    const pubsub = await import('#services/pub_sub_subscription')

    const subscription = new pubsub.GooglePubSubSubscription(
      process.env.GOOGLE_PUBSUB_SUBSCRIPTION!
    )

    // Importa a função de lidar com tabelas
    const table = await import('#services/pub_sub_table')
    // Inicializa o PubSub
    subscription.listenMessagesV2(new table.PubSubHandlerTable().handlerTable, 'API2')
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
