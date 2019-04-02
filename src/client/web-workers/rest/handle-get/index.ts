import { get } from 'client/services/ajax'
import { handleError } from '../_common'
import { IHandlerParams } from '../_typings'
import { ApplicableActions, transformPayload } from '../transform-payload'

/**
 * Handles HTTP GET request messages sent to the web worker by making
 * an HTTP GET AJAX call to the backend using the passed in parameters.
 * @param params The parameters that should be used to make the GET request
 * @param ctx The web worker context
 */
export default function handleGet (params: IHandlerParams, ctx: Worker): void {
  const {
    accessToken,
    body,
    id,
    successAction,
    supressSuccessPayload,
    failureAction,
    path,
    query
  } = params

  const endpoint = id ? `api/${path}/${id}` : `api/${path}`
  get({
    accessToken,
    body,
    endpoint,
    query
  })
    .subscribe(
      (response) =>
        handleSuccess(response.response, ctx, successAction as ApplicableActions, supressSuccessPayload),
      (error) => handleError(error, ctx, failureAction)
    )
}

function handleSuccess (
  result: any,
  ctx: Worker,
  successAction: ApplicableActions,
  supressSuccessPayload: boolean
) {

  const followOnAction: ApplicableActions = {
    ...successAction
  }
  if (result && !supressSuccessPayload) {
    followOnAction.payload = result
  } else {
    delete followOnAction.payload
  }

  ctx.postMessage({
    action: transformPayload(followOnAction)
  })
}
