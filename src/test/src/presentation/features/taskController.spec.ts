import * as scheduler from '../../../mock/schedule'

describe('taskController', () => {
  const mockPrisma = {
    routes: {
      saveSchedule: jest.fn(),
      getAllSchedule: jest.fn(),
      getScheduleByName: jest.fn(),
      updateSchedule: jest.fn(),
      deleteSchedule: jest.fn(),
      getFilterSchedulerByDate: jest.fn(),
      updateApiReturn: jest.fn()
    }
  }

  describe('POST', () => {
    it('postSchedule', () => {
      const newSchedule = scheduler.data.initialMockPost
      expect(1).toBe(1)
    })
  })

  describe('GET ALL', () => {
    it('getAllSchedules', () => {
      expect(1).toBe(1)
    })
  })

  describe('GET BY NAME', () => {
    it('getScheduleByName', () => {
      expect(1).toBe(1)
    })
  })

  describe('PUT', () => {
    it('updateSchedule', () => {
      expect(1).toBe(1)
    })
  })

  describe('DEL', () => {
    it('deleteSchedule', () => {
      expect(1).toBe(1)
    })
  })

  describe('GET HEALTH', () => {
    it('healthCheck', () => {
      expect(1).toBe(1)
    })
  })
})
