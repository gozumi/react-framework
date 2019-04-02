export interface IAction {
  readonly type: string
  readonly payload?: any
}

export type ActionMapper<S, A extends IAction> = {
  readonly [K in A['type']]: (state: S, payload: Extract<A, { readonly type: K }>['payload']) => S;
}

export const StateReducer = <S, A extends IAction>(initialState: S, actionMapper: ActionMapper<S, A>) => {
  return (state: S = initialState, action: A) => {
    const reducer = (actionMapper as Record<string, any>)[action.type]
    if (reducer === undefined) {
      return state
    }
    return reducer(state, action.payload)
  }
}
