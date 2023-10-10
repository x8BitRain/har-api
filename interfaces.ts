export interface IHarApiConfig {
  har: string
  port: number
  debug: boolean
  apiUrl: string
}

export interface IHarContents {
  _priority: string
  _resourceType: string
  cache: Cache
  pageref: string
  request: Request
  response: Response
  serverIPAddress: string
  startedDateTime: string
  time: number
  timings: Timings
}

export interface Cache {}

export interface Request {
  method: string
  url: string
  httpVersion: string
  headers: Header[]
  queryString: any[]
  cookies: any[]
  headersSize: number
  bodySize: number
}

export interface Header {
  name: string
  value: string
}

export interface Response {
  status: number
  statusText: string
  httpVersion: string
  headers: Header2[]
  cookies: Cooky[]
  content: Content
  redirectURL: string
  headersSize: number
  bodySize: number
  _transferSize: number
  _error: any
}

export interface Header2 {
  name: string
  value: string
}

export interface Cooky {
  name: string
  value: string
  path: string
  domain: string
  expires: any
  httpOnly: boolean
  secure: boolean
}

export interface Content {
  size: number
  mimeType: string
  text: string
}

export interface Timings {
  blocked: number
  dns: number
  ssl: number
  connect: number
  send: number
  wait: number
  receive: number
  _blocked_queueing: number
}
