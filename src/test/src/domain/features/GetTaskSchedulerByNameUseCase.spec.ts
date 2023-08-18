import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'
import * as scheduler from '../../../mock/schedule'
import { repository } from '../../data/TaskSchedulerRepository'
import { GetTaskSchedulerByNameUseCase } from '../../../../domain/features/GetTaskSchedulerByNameUseCase'

describe('GET BY NAME USE CASE', () => {
  it('should return no schedule found if incorrect apyload is provided', async () => {
    const payload = 'asghaihsuioahnshnoa'
    const sut = await new GetTaskSchedulerByNameUseCase(repository, payload).execute()

    expect(await sut).toEqual({ body: HttpResponse.notFound('no schedule found') })
  })

  it('should return missing param error if no payload is provided', async () => {
    const payload = ''
    const sut = await new GetTaskSchedulerByNameUseCase(repository, payload).execute()

    expect(await sut).toEqual(HttpResponse.badRequest('name'))
  })

  it('should return a scheduler if right name is provided', async () => {
    const payload = scheduler.mock.initialMockPost.name

    const sut = await new GetTaskSchedulerByNameUseCase(repository, payload).execute()

    expect(await sut).toEqual(HttpResponse.goodRequest(scheduler.mock.initialMockPost))
  })
})
