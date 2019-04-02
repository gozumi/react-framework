import { Observable, of, throwError } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import handleGet from '..'
import {
  CTX,
  ERROR,
  EXPECTED_ERROR_MESSAGE_PAYLOAD,
  EXPECTED_MESSAGE_PAYLOAD,
  EXPECTED_REQUEST,
  OBSERVABLE_RESPONSE,
  PARAMS,
  PARAMS_WITH_ID
} from './_fixtures'

let source$: Observable<any> = null
jest.mock(
  'rxjs/ajax',
  () => ({ ajax: jest.fn().mockImplementation(() => source$) })
)

describe('Rest Web Worker: handle-get()', () => {
  it('should post a message to the web worker with the GET response upon success', () => {
    source$ = of(OBSERVABLE_RESPONSE)
    CTX.postMessage = jest.fn()
    handleGet(PARAMS, CTX)
    expect(CTX.postMessage).toBeCalledWith(EXPECTED_MESSAGE_PAYLOAD)
  })

  it('should post an error to the web worker with the GET response upon failure', () => {
    source$ = throwError(ERROR)
    CTX.postMessage = jest.fn()
    handleGet(PARAMS, CTX)
    expect(CTX.postMessage).toBeCalledWith(EXPECTED_ERROR_MESSAGE_PAYLOAD)
  })

  it('should add the id to the end of the URL if an id is passed in', () => {
    source$ = of(OBSERVABLE_RESPONSE)
    CTX.postMessage = jest.fn()
    handleGet(PARAMS_WITH_ID, CTX)
    expect(ajax).toBeCalledWith(EXPECTED_REQUEST)
  })
})
