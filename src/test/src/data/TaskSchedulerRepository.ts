import { type TaskScheduleInterface } from '../../../domain/protocols/TaskScheduleInterface'
import * as scheduler from '../../mock/schedule'

export const repository: jest.Mocked<TaskScheduleInterface> = {
  saveSchedule: jest.fn().mockResolvedValue(scheduler.mock.initialMockPost),
  getAllSchedule: jest.fn(),
  getScheduleByName: jest.fn(),
  updateSchedule: jest.fn(),
  deleteSchedule: jest.fn(),
  getFilterSchedulerByDate: jest.fn(),
  updateApiReturn: jest.fn()
}
