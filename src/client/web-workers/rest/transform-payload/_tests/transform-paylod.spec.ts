import { transformPayload } from '..'
import { UNKNOWN_ACTION } from './_fixtures'

describe('Rest Web Worker: Payload transformer', () => {
  it('should return the same action when no transformer is found', () => {
    const transformedAction = transformPayload(UNKNOWN_ACTION as any)
    expect(transformedAction).toEqual(UNKNOWN_ACTION)
  })
})
