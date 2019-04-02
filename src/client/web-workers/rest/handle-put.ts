import { put } from 'client/services/ajax'
import { handleError } from './_common'
import { IHandlerParams } from './_typings'
import { ApplicableActions, transformPayload } from './transform-payload'

export default function handlePut (params: IHandlerParams, ctx: Worker): void {
  const {
    accessToken,
    body,
    successAction,
    supressSuccessPayload,
    failureAction,
    path
  } = params

  put({
    accessToken,
    body,
    endpoint: `api/${path}`
  })
    .subscribe(
      (response) => handleSuccess(response.response, ctx, successAction as ApplicableActions, supressSuccessPayload),
      (error) => handleError(error, ctx, failureAction)
    )
}

function handleSuccess (
  updatedResource: any,
  ctx: Worker,
  successAction: ApplicableActions,
  supressSuccessPayload: boolean
) {
  const followOnAction: ApplicableActions = {
    ...successAction,
    payload: updatedResource
  }

  if (!supressSuccessPayload) {
    followOnAction.payload = updatedResource
  } else {
    delete followOnAction.payload
  }

  ctx.postMessage({
    action: transformPayload(followOnAction)
  })
}
