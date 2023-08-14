import * as scheduler from '../../../mock/schedule'
import * as controller from '../../../../presentation/features/taskController'
import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'

describe('taskController', () => {
  describe('POST', () => {
    it('Should return 400 if no name is provided', async () => {
      const httpRequest = {
        name: '',
        description: 'abc'
      }
      const sut = await controller.postSchedule(httpRequest)
      expect(sut).toEqual(HttpResponse.badRequest('name or description'))
    })

    it('Should return 400 if no description is provided', async () => {
      const httpRequest = {
        name: 'abc',
        description: ''
      }
      const sut = await controller.postSchedule(httpRequest)
      expect(sut).toEqual(HttpResponse.badRequest('name or description'))
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
