export const ACCESS_TOKEN = 'ACCESS_TOKEN'

export const GET_PARAMS_NO_QUERY = {
  accessToken: ACCESS_TOKEN,
  endpoint: ''
}

export const GET_PARAMS_WITH_QUERY = {
  accessToken: ACCESS_TOKEN,
  endpoint: '',
  query: {
    some: 'thing',
    someThing: 'more'
  }
}

const postBody = {
  some: 'thing',
  someThing: 'more'
}
export const POST_PARAMS = {
  accessToken: ACCESS_TOKEN,
  body: postBody,
  endpoint: ''
}

const putBody = {
  someOther: 'thing',
  someThing: 'else'
}
export const PUT_PARAMS = {
  accessToken: ACCESS_TOKEN,
  body: putBody,
  endpoint: ''
}

const headers = {
  'Authorization': `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
}

export const GET_REQUEST_WITH_NO_QUERY = {
  headers,
  method: 'GET',
  url: 'SERVICE_URL_BASE'
}

export const GET_REQUEST_WITH_QUERY = {
  headers,
  method: 'GET',
  url: 'SERVICE_URL_BASE?some=thing&someThing=more&'
}

export const POST_REQUEST = {
  body: postBody,
  headers,
  method: 'POST',
  url: 'SERVICE_URL_BASE'
}

export const PUT_REQUEST = {
  body: putBody,
  headers,
  method: 'PUT',
  url: 'SERVICE_URL_BASE'
}

export const OBSERVABLE_RESPONSE = { foo: 'bar' }
