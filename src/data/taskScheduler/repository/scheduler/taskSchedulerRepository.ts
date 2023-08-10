import { TaskScheduleData } from '../../../../domain/models/taskScheduleData'
import { prisma } from '../../../../../prisma/prisma'
import { TaskScheduleInterface } from '../../../../domain/protocols/taskScheduleInterface'

export default class TaskSchedulerRepository implements TaskScheduleInterface {
    saveSchedule(schedule: TaskScheduleData): any {
        return prisma.schedule.create({
            data: schedule
        })
    }

    getAllSchedule(): any {
        return prisma.schedule.findMany({
            where: {
                deleted: false
            }
        })
    }
    
    getScheduleByName(name: string): any {
        console.log(name)
        return prisma.schedule.findMany({
            where: {
                name: name
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

    getFilterSchedulerByDate() {
        return prisma.schedule.findMany({
            where: {
                dateSchedule: {
                    lte: new Date()
                }
            }
        })
    }

    getFilterSchedulerByDone() {
        return prisma.schedule.findMany({
            where: {
                done: false
            }
        })
    }
}

