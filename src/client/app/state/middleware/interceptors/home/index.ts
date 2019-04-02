import {
  acknowledgeRequestDataFailure,
  acknowledgeRequestDataSuccess,
  IAcknowledgeRequestDataFailureAction,
  IAcknowledgeRequestDataSuccessAction,
  IRequestDataAction
} from 'client/app/state/action-creators'
import { IHandlerParams } from 'client/web-workers/rest/_typings'
import { Dispatch, MiddlewareAPI } from 'redux'
import { IState } from '../../../reducers/_interfaces'
import { restWorker } from '../../message-handler'

export function requestDataInterceptor (
  action: IRequestDataAction,
  next: Dispatch<IRequestDataAction>,
  api: MiddlewareAPI<Dispatch<IRequestDataAction>, IState>
) {
  if (action.type === 'REQUEST_DATA') {
    const params: IHandlerParams<IAcknowledgeRequestDataSuccessAction, IAcknowledgeRequestDataFailureAction> = {
      failureAction: acknowledgeRequestDataFailure(null),
      path: 'initialisation',
      successAction: acknowledgeRequestDataSuccess(null),
      type: 'HTTP_GET'
    }
    restWorker.postMessage(params)
  }
  return next(action)
}
