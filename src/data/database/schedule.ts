import { prisma } from '../../../prisma/prisma'
import { TaskScheduleInterface } from '../../domain/models/taskScheduleData'

export const saveSchedule = (schedule: TaskScheduleInterface) => {
    return prisma.schedule.create({
        data: schedule
    })
}

export const getAllSchedule = () => {
    return prisma.schedule.findMany()
}

export const getScheduleByName = (name: string) => {
    return prisma.schedule.findMany({
        where: {
            name: {
                equals: name
            },
        }
    })
}

export const updateSchedule = (id: string, schedule: TaskScheduleInterface) => {
    return prisma.schedule.update({
        where: {
            id
        },
        data: schedule
    })
}

export const deleteSchedule = (id: string) => {
    return prisma.schedule.update({
        where: {
            id
          },
          data: {
            deleted: true
          }
    })
}

