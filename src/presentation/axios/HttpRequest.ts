import axios from 'axios'
import { type BoredResponse } from '../protocols/AxiosBoredResponse'
import { type AxiosHttpRequest } from '../protocols/AxiosHttpRequest'

export class HttpRequest implements AxiosHttpRequest {
  async boredNeverMore (typeOf?: string, participantsOf?: number, priceOf?: number): Promise<BoredResponse> {
    const boredRequest: string = `${process.env.apiRequestURL}?`
    const response: BoredResponse = await axios.get(boredRequest, {
      params: {
        type: typeOf,
        participants: participantsOf,
        price: priceOf
      }
    })
    return response
  }
}
