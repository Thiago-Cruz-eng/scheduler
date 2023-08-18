export const mock = {
  mockParamsToGetByName: {
    name: 'mock01'
  },

  mockRequest: {
    name: 'abc',
    description: 'cba'
  },

  mockRequestWithoutName: {
    name: '',
    description: 'abc'
  },

  mockRequestWithoutDescription: {
    name: 'abc',
    description: 'cba'
  },

  initialMockPost: {
    id: '906e3973-24d8-4ed6-b2c0-d2dfcd09db67',
    name: 'mock01',
    description: 'mock description',
    dateSchedule: '2023-08-18T13:30:36.912Z',
    done: false,
    deleted: false,
    apiReturn: null,
    dateApiReturn: null
  },

  upadatedInitialMockPost: {
    id: '906e3973-24d8-4ed6-b2c0-d2dfcd09db67',
    name: 'abc',
    description: 'cba',
    dateSchedule: '2023-08-18T13:30:36.912Z',
    done: false,
    deleted: false,
    apiReturn: null,
    dateApiReturn: null
  },

  afterDoneMockPost: {
    id: '906e3973-24d8-4ed6-b2c0-d2dfcd09db67',
    name: 'mock01',
    description: 'mock description',
    dateSchedule: '2023-08-18T13:30:36.912Z',
    done: true,
    deleted: false,
    apiReturn: 'mock return api',
    dateApiReturn: '2023-08-14T13:30:47.302Z'
  },

  afterDeleteMockPost: {
    id: '906e3973-24d8-4ed6-b2c0-d2dfcd09db67',
    name: 'mock01',
    description: 'mock description',
    dateSchedule: '2023-08-18T13:30:36.912Z',
    done: false,
    deleted: true,
    apiReturn: null,
    dateApiReturn: null
  }
}
