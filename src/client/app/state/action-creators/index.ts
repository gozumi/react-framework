import { IData } from 'client/interfaces'
import { IAction } from '../_typings'

export interface IRequestDataAction extends IAction {
  readonly type: 'REQUEST_DATA'
}
export const requestData = (): IRequestDataAction => ({
  type: 'REQUEST_DATA'
})

export interface IAcknowledgeRequestDataSuccessAction extends IAction {
  readonly type: 'ACKNOWLEDGE_REQUEST_DATA_SUCCESS'
  readonly payload: IData
}
export const acknowledgeRequestDataSuccess = (data: IData): IAcknowledgeRequestDataSuccessAction => ({
  payload: data,
  type: 'ACKNOWLEDGE_REQUEST_DATA_SUCCESS'
})

export interface IAcknowledgeRequestDataFailureAction extends IAction {
  readonly payload: string
  type: 'ACKNOWLEDGE_REQUEST_DATA_FAILURE'
}
export const acknowledgeRequestDataFailure = (message: string): IAcknowledgeRequestDataFailureAction => ({
  payload: message,
  type: 'ACKNOWLEDGE_REQUEST_DATA_FAILURE'
})

export interface IAcknowledgeError {
  payload: string
  type: 'ACKNOWLEDGE_ERROR'
}
export const acknowledgeError = (message: string): IAcknowledgeError => ({
  payload: message,
  type: 'ACKNOWLEDGE_ERROR'
})
