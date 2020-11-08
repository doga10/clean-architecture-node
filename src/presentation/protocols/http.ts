export type HttpResponse = {
  statusCode: number
  data: any
}

export type HttpRequest = {
  body?: any
  headers?: any
  params?: any
  user?: any
}