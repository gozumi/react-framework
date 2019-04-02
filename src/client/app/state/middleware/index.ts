import { Dispatch, MiddlewareAPI } from 'redux'

import { IRequestDataAction } from '../action-creators'
import { IState } from '../reducers/_interfaces'
import { requestDataInterceptor } from './interceptors/home'

const combinedMiddleware = [
  requestDataInterceptor
].map((f) => createMiddleware(f))

export default combinedMiddleware

type ApplcableActions =
  IRequestDataAction

/**
 * Wraps a given function as a redux middleware function.
 * @param f The function to wrap as a redux middleware function
 */
function createMiddleware (
  f: (
    action: ApplcableActions,
    next: Dispatch<ApplcableActions>,
    api: MiddlewareAPI<Dispatch<ApplcableActions>, IState>
  ) => ApplcableActions
) {
  return (api: MiddlewareAPI<Dispatch<ApplcableActions>, IState>) =>
    (next: Dispatch<ApplcableActions>) => (action: ApplcableActions) => f(action, next, api)
}
