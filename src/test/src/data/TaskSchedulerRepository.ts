import { type TaskScheduleInterface } from '../../../domain/protocols/TaskScheduleInterface'
import { HttpResponse } from '../../../presentation/helpers/HttpResponse'
import * as scheduler from '../../mock/schedule'

export const repository: jest.Mocked<TaskScheduleInterface> = {
  saveSchedule: jest.fn().mockResolvedValue(scheduler.mock.initialMockPost),
  getAllSchedule: jest.fn()
    .mockResolvedValueOnce(HttpResponse.notFound('no schedule found'))
    .mockResolvedValue(scheduler.mock),
  getScheduleByName: jest.fn()
    .mockResolvedValueOnce(HttpResponse.notFound('no schedule found'))
    .mockResolvedValue(scheduler.mock.initialMockPost),
  updateSchedule: jest.fn().mockResolvedValue(scheduler.mock.upadatedInitialMockPost),
  deleteSchedule: jest.fn().mockResolvedValue(scheduler.mock.afterDeleteMockPost),
  getFilterSchedulerByDate: jest.fn(),
  updateApiReturn: jest.fn()
}
