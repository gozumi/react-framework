import { IAction } from 'client/app/state/_typings'

export type ApplicableActions = any

const transformerMap: ActionMapper<ApplicableActions> = {
}

type ActionMapper<A extends IAction> = {
  readonly [K in A['type']]: (action: A) => any
}

/**
 * Traansforms the payload of an action into a format that can be easily used by the UI.
 * @param action The action with the payload that needs to be transformed
 */
export function transformPayload (action: ApplicableActions): ApplicableActions {
  const transformer = transformerMap[action.type]
  return transformer ? transformer(action) : action
}
