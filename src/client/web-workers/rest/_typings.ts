import { IAction } from 'client/app/state/_typings'
import { IApiParamsQuery } from 'client/services/ajax'

export type MessageTypeString = 'HTTP_GET' | 'HTTP_POST' | 'HTTP_PUT'

type ValidPath =
  'initialisation' | 'home' | 'person' | 'stylist' | 'search' | 'auth/aws/sign-s3' |
  'person/message/convert_to_stylist' | 'gallery'

interface IMessage {
  type: MessageTypeString
}
interface IGetMessage extends IMessage {
  path: string
  type: 'HTTP_GET'
}
interface IPostMessage extends IMessage {
  type: 'HTTP_POST'
}

interface IPutMessage extends IMessage {
  type: 'HTTP_PUT'
}

export interface IHandlerParams<S = IAction, F = IAction> {
  readonly accessToken?: string
  readonly path?: ValidPath
  readonly body?: any
  readonly id?: string
  readonly query?: IApiParamsQuery
  readonly successAction: S
  readonly supressSuccessPayload?: boolean
  readonly failureAction?: F
  readonly type: MessageTypeString
}
export type MessageTypes = IGetMessage | IPostMessage | IPutMessage
export type Handler = (params: IHandlerParams<IAction, IAction>, ctx: Worker) => void

export type HandlerMap<T extends IMessage> = {
  [P in T['type']]: Handler
}
