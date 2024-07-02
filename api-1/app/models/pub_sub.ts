import { PubSubActionEnum } from '#enums/pub_sub_action_enum'

export class PubSubModel<T> {
  readonly value: T
  readonly action: PubSubActionEnum
  readonly table: 'users'
  readonly api: 'API1' | 'API2' | undefined

  constructor(value: T, action: PubSubActionEnum, table: 'users', api?: 'API1' | 'API2') {
    this.value = value
    this.action = action
    this.table = table
    this.api = api
  }
}
