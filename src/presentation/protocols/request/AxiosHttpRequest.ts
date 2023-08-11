import { type BoredResponse } from '../response/AxiosBoredResponse'

export interface AxiosHttpRequest {
  boredNeverMore (type?: string, participants?: number, price?: number): Promise<BoredResponse | any>
}
