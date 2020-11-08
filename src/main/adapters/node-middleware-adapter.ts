import { HttpRequest, Middleware } from '../../presentation/protocols'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req, res, next) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.data)
      next()
    } else {
      res.send({ error: httpResponse.data.message }, httpResponse.statusCode)
    }
  }
}