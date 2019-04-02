import { IAction } from 'client/app/state/_typings'
import { acknowledgeError } from 'client/app/state/action-creators'

export function handleError (error: any, ctx: Worker, failureAction: IAction) {
  const followOnAction: IAction = {
    ...(failureAction || acknowledgeError(null)),
    payload: {
      httpStatus: error.status,
      text: error.message
    }
  }
  ctx.postMessage({
    action: followOnAction
  })
}
