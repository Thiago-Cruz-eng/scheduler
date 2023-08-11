import axios from 'axios'
import { type BoredResponse } from '../protocols/response/AxiosBoredResponse'
import { type AxiosHttpRequest } from '../protocols/request/AxiosHttpRequest'

export class HttpRequest implements AxiosHttpRequest {
  async boredNeverMore (typeOf?: string, participantsOf?: number, priceOf?: number): Promise< | any> {
    const boredRequest: string = `${process.env.apiRequestURL}?`
    try {
      const response: BoredResponse = await axios.get(boredRequest, {
        params: {
          type: typeOf,
          participants: participantsOf,
          price: priceOf
        }
      })
      return response
    } catch (error) {
      console.log(error, 'unsual behave on external API, please try latter.')
    }
  }
}
