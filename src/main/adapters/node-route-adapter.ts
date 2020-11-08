import { Controller, HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req, res) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      user: req.user
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return res.send(httpResponse.data, httpResponse.statusCode)
    } else {
      return res.send({ error: httpResponse.data.message }, httpResponse.statusCode)
    }
  }
}