export class MissingBodyError extends Error {
  constructor (param: string) {
    super(`Missing body ${param}`)
    this.name = 'MissingBodyError'
  }
}
