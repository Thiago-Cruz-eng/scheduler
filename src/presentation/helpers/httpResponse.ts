import { MissingParamError } from "./missingParamError"

export class HttpResponse {
    static serverError () {
        return {
        statusCode: 500
        }
    }

    static badRequest (paramName: string) {
        return {
        statusCode: 400,
        body: new MissingParamError(paramName)
        }
    }

    static notFound (paramName: string) {
        return {
            stausCode: 404,
            body: `${paramName}`
        }
    }

    static goodRequest (paramName: object){
        return {
            body: new Object()
        }
    }
}