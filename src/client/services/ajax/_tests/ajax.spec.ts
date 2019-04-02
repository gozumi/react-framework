import { of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { get, post, put } from '..'
import {
  GET_PARAMS_NO_QUERY,
  GET_PARAMS_WITH_QUERY,
  GET_REQUEST_WITH_NO_QUERY,
  GET_REQUEST_WITH_QUERY,
  OBSERVABLE_RESPONSE,
  POST_PARAMS,
  POST_REQUEST,
  PUT_PARAMS,
  PUT_REQUEST
} from './_fixtures'

jest.mock(
  'rxjs/ajax',
  () => ({ ajax: jest.fn().mockImplementation(() => of(OBSERVABLE_RESPONSE)) })
)

describe('Ajax wrapper', () => {
  describe('get()', () => {
    it('should execute the correct AJAX request and return the GET observable ajax response', (done) => {
      const response = get(GET_PARAMS_NO_QUERY)

      response
        .subscribe(
          (ar) => {
            expect(ar).toEqual(OBSERVABLE_RESPONSE)
            expect(ajax).toBeCalledWith(GET_REQUEST_WITH_NO_QUERY)
            done()
          }
        )
    })

    it('should handle query strings correctly', (done) => {
      const response = get(GET_PARAMS_WITH_QUERY)

      response
        .subscribe(
          (ar) => {
            expect(ajax).toBeCalledWith(GET_REQUEST_WITH_QUERY)
            done()
          }
        )
    })
  })

  describe('post()', () => {
    it('should execute the correct AJAX request and return the POST observable ajax response', (done) => {
      const response = post(POST_PARAMS)

      response
        .subscribe(
          (ar) => {
            expect(ar).toEqual(OBSERVABLE_RESPONSE)
            expect(ajax).toBeCalledWith(POST_REQUEST)
            done()
          }
        )
    })
  })

  describe('put()', () => {
    it('should execute the correct AJAX request and return the PUT observable ajax response', (done) => {
      const response = put(PUT_PARAMS)

      response
        .subscribe(
          (ar) => {
            expect(ar).toEqual(OBSERVABLE_RESPONSE)
            expect(ajax).toBeCalledWith(PUT_REQUEST)
            done()
          }
        )
    })
  })
})
