import { prisma } from '../../../../../prisma/prisma'
import { type TaskScheduleData } from '../../../../domain/models/TaskScheduleData'
import { type TaskScheduleInterface } from '../../../../domain/protocols/TaskScheduleInterface'

export default class TaskSchedulerRepository implements TaskScheduleInterface {
  saveSchedule (schedule: TaskScheduleData): object {
    return prisma.schedule.create({
      data: schedule
    })
  }

  getAllSchedule (): object {
    return prisma.schedule.findMany({
      where: {
        deleted: false
      }
    })
  }

  getScheduleByName (name: string): object {
    console.log(name)
    return prisma.schedule.findMany({
      where: {
        name
      }
    })
  }

  updateSchedule (id: string, schedule: TaskScheduleData): object {
    return prisma.schedule.update({
      where: {
        id
      },
      data: schedule
    })
  }

  deleteSchedule (id: string): object {
    return prisma.schedule.update({
      where: {
        id
      },
      data: {
        deleted: true
      }
    })
  }

  getFilterSchedulerByDate (): object {
    return prisma.schedule.findMany({
      where: {
        dateSchedule: {
          lte: new Date()
        },
        done: false,
        deleted: false
      }
    })
  }

  updateApiReturn (id: string, returnOf: string, date: Date): object {
    return prisma.schedule.update({
      where: {
        id
      },
      data: {
        done: true,
        apiReturn: returnOf,
        dateApiReturn: date
      }
    })
  }
}
