import { TaskScheduleInterface } from '@/domain/protocols/taskScheduleInterface'
import { prisma } from '../../../../prisma/prisma'
import { TaskScheduleData } from '@/domain/models/taskScheduleData'

export default class TaskSchedulerRepository implements TaskScheduleInterface {
    saveSchedule(schedule: TaskScheduleData): any {
        return prisma.schedule.create({
            data: schedule
        })
    }

    getAllSchedule(): any {
        return prisma.schedule.findMany()
    }
    
    getScheduleByName(name: string): any {
        return prisma.schedule.findMany({
            where: {
                name: {
                    equals: name
                },
            }
        })
    }

    updateSchedule(id: string, schedule: TaskScheduleData): any {
        return prisma.schedule.update({
            where: {
                id
            },
            data: schedule
        })
    }

    deleteSchedule(id: string): any {
        return prisma.schedule.update({
            where: {
                id
              },
              data: {
                deleted: true
              }
        })
    }
}

