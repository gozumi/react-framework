import { ActionMapper, StateReducer } from '../../_typings'
import {
  IAcknowledgeRequestDataFailureAction,
  IAcknowledgeRequestDataSuccessAction,
  IRequestDataAction
} from '../../action-creators'
import DEFAULT_STATE, { IHomeState } from './default-state'

type ApplicableActions =
  IRequestDataAction | IAcknowledgeRequestDataSuccessAction | IAcknowledgeRequestDataFailureAction

const reducerMap: ActionMapper<IHomeState, ApplicableActions> = {
  ACKNOWLEDGE_REQUEST_DATA_FAILURE: (currentState, message): IHomeState =>
    ({ ...currentState, data: { errorMessage: message }, status: 'READY' }),
  ACKNOWLEDGE_REQUEST_DATA_SUCCESS: (currentState, body): IHomeState =>
  ({ ...currentState, data: { body }, status: 'READY' }),
  REQUEST_DATA: (curresntState): IHomeState => ({ ...curresntState, status: 'WATING_FOR_DATA' })
}

export default StateReducer<IHomeState, ApplicableActions>(DEFAULT_STATE, reducerMap)
