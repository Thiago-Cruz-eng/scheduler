import { type TaskScheduleInterface } from '../../../domain/protocols/TaskScheduleInterface'

export const repository: jest.Mocked<TaskScheduleInterface> = {
  saveSchedule: jest.fn(),
  getAllSchedule: jest.fn(),
  getScheduleByName: jest.fn(),
  updateSchedule: jest.fn(),
  deleteSchedule: jest.fn(),
  getFilterSchedulerByDate: jest.fn(),
  updateApiReturn: jest.fn()
}
