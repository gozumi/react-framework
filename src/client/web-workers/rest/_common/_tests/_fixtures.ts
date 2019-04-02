import { IAction } from 'client/app/state/_typings'

const errorStatus = 400
const errorMessage = 'Some error message'
const actionType = 'FAILURE_ACTION_TYPE'

export const ERROR = {
  message: errorMessage,
  status: errorStatus
}

export const FAILURE_ACTION: IAction = {
  type: actionType
}

export const CTX: any = {}

export const EXPECTED_POST_MESSAGE = {
  action: {
    payload: {
      httpStatus: errorStatus,
      text: errorMessage
    },
    type: actionType
  }
}

export const EXPECTED_POST_MESSAGE_WHEN_NO_FAILURE_ACTION_PASSED_IN = {
  ...EXPECTED_POST_MESSAGE,
  action: {
    ...EXPECTED_POST_MESSAGE.action,
    type: 'ACKNOWLEDGE_ERROR'
  }
}
