class HttpResponse {
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
}