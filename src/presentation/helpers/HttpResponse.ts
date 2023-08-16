import { MissingParamError } from './MissingParamError'

export class HttpResponse {
  static serverError (): object {
    return {
      statusCode: 500
    }
  }

  static badRequest (paramName: string): object {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static notFound (paramName: string): object {
    return {
      stausCode: 401,
      body: `${paramName}`
    }
  }

  static goodRequest (paramName: object): object {
    return {
      body: paramName
    }
  }
}
