import { IAction } from 'client/app/state/_typings'
import { post } from 'client/services/ajax'
import { handleError } from './_common'
import { IHandlerParams } from './_typings'

export default function handlePost (params: IHandlerParams, ctx: Worker): void {
  const {
    accessToken,
    body,
    successAction,
    failureAction,
    path
  } = params

  post({
    accessToken,
    body,
    endpoint: `api/${path}`
  })
    .subscribe(
      (response) => handleSuccess(response.response.uri, ctx, successAction),
      (error) => handleError(error, ctx, failureAction)
    )
}

function handleSuccess (uri: string, ctx: Worker, successAction: IAction) {
  const followOnAction: IAction = {
    ...successAction,
    payload: uri
  }
  ctx.postMessage({
    action: followOnAction
  })
}
