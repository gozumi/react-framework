import { IAction } from 'client/app/state/_typings'
import { IHandlerParams } from '../../_typings'

const response = { foo: 'bar' }
const actionType = 'ACTION_TYPE'

export const OBSERVABLE_RESPONSE = { response }

const accessToken = 'ACCESS_TOKEN'
const successAction: IAction = {
  payload: { some: 'payload' },
  type: actionType
}

export const CTX: any = {}

export const PARAMS: IHandlerParams = {
  accessToken,
  successAction,
  type: 'HTTP_GET'
}

export const PARAMS_WITH_ID: IHandlerParams = {
  accessToken,
  id: 'SOME_ID',
  successAction,
  type: 'HTTP_GET'
}

export const EXPECTED_MESSAGE_PAYLOAD = {
  action: {
    payload: response,
    type: actionType
  }
}

export const EXPECTED_ERROR_MESSAGE_PAYLOAD = {
  action: {
    payload: {
      httpStatus: 400,
      text: 'Some error message'
    },
    type: 'ACKNOWLEDGE_ERROR'
  }
}

export const EXPECTED_REQUEST = {
  headers: {
    'Authorization': 'Bearer ACCESS_TOKEN',
    'Content-Type': 'application/json'
  },
  method: 'GET',
  url: 'SERVICE_URL_BASEapi/undefined/SOME_ID'
}

export const ERROR = { status: 400, message: 'Some error message' }
