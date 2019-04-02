import { HandlerMap, IHandlerParams, MessageTypes, MessageTypeString } from './_typings'
import handleGet from './handle-get'
import handlePost from './handle-post'
import handlePut from './handle-put'

const ctx: Worker = self as any

ctx.addEventListener('message', handler)

const handlerMap: HandlerMap<MessageTypes> = {
  HTTP_GET: handleGet,
  HTTP_POST: handlePost,
  HTTP_PUT: handlePut
}

function handler (evt: MessageEvent) {
  const {
    accessToken, successAction, supressSuccessPayload, failureAction,
    path, type, body, query, id
  } = evt.data
  const params: IHandlerParams = {
    accessToken,
    body,
    failureAction,
    id,
    path,
    query,
    successAction,
    supressSuccessPayload,
    type
  }
  const handlerFunction = handlerMap[(evt.data.type as MessageTypeString)]
  handlerFunction && handlerFunction(params, ctx)
}
