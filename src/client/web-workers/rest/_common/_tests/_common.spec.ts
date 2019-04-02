import { handleError } from '..'
import {
  CTX, ERROR,
  EXPECTED_POST_MESSAGE,
  EXPECTED_POST_MESSAGE_WHEN_NO_FAILURE_ACTION_PASSED_IN, FAILURE_ACTION
} from './_fixtures'

describe('Rest Web Worker: Common functions', () => {
  describe('handleError()', () => {
    it('should post a message with the correct payload', () => {
      CTX.postMessage = jest.fn()

      handleError(ERROR, CTX, FAILURE_ACTION)
      expect(CTX.postMessage).toBeCalledWith(EXPECTED_POST_MESSAGE)
    })

    it('should post a message with the correct payload when no failure action is passed in', () => {
      CTX.postMessage = jest.fn()

      handleError(ERROR, CTX, null)
      expect(CTX.postMessage)
        .toBeCalledWith(EXPECTED_POST_MESSAGE_WHEN_NO_FAILURE_ACTION_PASSED_IN)
    })
  })
})
