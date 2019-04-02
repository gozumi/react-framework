import { Observable } from 'rxjs'
import { ajax as ajaxObservable, AjaxRequest, AjaxResponse } from 'rxjs/ajax'

type HttpMethod = 'GET' | 'POST' | 'PUT'

interface IApiParams {
  endpoint: string,
  query?: IApiParamsQuery,
  accessToken?: string,
  body?: any
}

export interface IApiParamsQuery {
  [name: string]: string
}

/**
 * Returns an ajax Observable using http method 'GET' and the given parameters
 * @param params An object containing the parameters to send in the HTTP request.
 * The object contains the following properties:
 * endpoint: The path to the endpoint that the ajax request should be made to.
 *           It is expected that the SERVICE_URL_BASE will be appended to the front
 *           of this string before the request is made.
 * token: The JWT token that should be sent with the request
 * data: Any data that should be sent with the request
 */
export function get (params: IApiParams): Observable<AjaxResponse> {
  return ajax(params, 'GET')
}

/**
 * Returns an ajax Observable using http method 'POST' and the given parameters
 * @param params An object containing the parameters to send in the HTTP request.
 * The object contains the following properties:
 * endpoint: The path to the endpoint that the ajax request should be made to.
 *           It is expected that the SERVICE_URL_BASE will be appended to the front
 *           of this string before the request is made.
 * token: The JWT token that should be sent with the request
 * data: Any data that should be sent with the request
 */
export function post (params: IApiParams) {
  return ajax(params, 'POST')
}

/**
 * Returns an ajax Observable using http method 'PUT' and the given parameters
 * @param params An object containing the parameters to send in the HTTP request.
 * The object contains the following properties:
 * endpoint: The path to the endpoint that the ajax request should be made to.
 *           It is expected that the SERVICE_URL_BASE will be appended to the front
 *           of this string before the request is made.
 * token: The JWT token that should be sent with the request
 * data: Any data that should be sent with the request
 */
export function put (params: IApiParams) {
  return ajax(params, 'PUT')
}

/**
 * Creates a URL by appending the SERVICE_URL_BASE to the front of the endpoint parameter then
 * makes an ajax call using this URL, the method, data & accessToken that are passed in.
 * @param endPointPath a string giving the path of the required URL endpoint
 * @param method the HTTP method to use
 * @param the data that should be sent with the request
 * @param accessToken the JWT access token to use
 */
function ajax (params: IApiParams, method: HttpMethod): Observable<AjaxResponse> {
  const { accessToken, endpoint, body, query } = params
  const queryString = calculateQueryString(query)
  const url = (queryString === '') ?
    `${SERVICE_URL_BASE}${endpoint}` :
    `${SERVICE_URL_BASE}${endpoint}?${queryString}`
  const request: AjaxRequest = {
    headers: {
      'Authorization': `Bearer ${accessToken || ''}`,
      'Content-Type': 'application/json'
    },
    method,
    url
  }

  if (body) {
    request.body = body
  }

  return ajaxObservable(request)
}

function calculateQueryString (query: IApiParamsQuery) {
  let queryString = ''
  if (query) {
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        queryString = `${queryString}${key}=${query[key]}&`
      }
    }
  }
  return queryString
}
