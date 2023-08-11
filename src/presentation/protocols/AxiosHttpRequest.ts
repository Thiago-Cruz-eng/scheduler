import { type BoredResponse } from './AxiosBoredResponse'

export interface AxiosHttpRequest {
  boredNeverMore (type?: string, participants?: number, price?: number): Promise<BoredResponse>
}
