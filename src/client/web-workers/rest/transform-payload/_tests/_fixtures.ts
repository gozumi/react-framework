import { IAction } from 'client/app/state/_typings'

export const response = {
  callSheets: [{
    description: 'Another call sheet',
    id: 'call-sheet-1',
    type: 'call_sheet',
    when: 1545054960000
  }, {
    description: 'My call sheet',
    id: 'call-sheet-2',
    type: 'call_sheet',
    when: 1544789220000
  }, {
    description: 'My other call sheet',
    id: 'call-sheet-3',
    type: 'call_sheet',
    when: 1544804340000
  }],
  created_at: 1544789237870,
  id: 'project-1',
  ownerId: 'owner-1',
  title: 'My Project'
}

export const UNKNOWN_ACTION: IAction = {
  payload: { foo: 'bar' },
  type: 'UNKNOWN_ACTION'
}

export const TRANSFORMED_RESULT = {
  payload: {
    callSheets: [
      {
        dayOfShooting: 1,
        description: 'My call sheet',
        id: 'call-sheet-2',
        shootNumber: 1,
        supportingInfo: '14th Dec 2018 - 12:07',
        totalDays: 2,
        totalShoots: 3,
        type: 'call_sheet',
        when: 1544789220000
      },
      {
        dayOfShooting: 1,
        description: 'My other call sheet',
        id: 'call-sheet-3',
        shootNumber: 2,
        supportingInfo: '14th Dec 2018 - 16:19',
        totalDays: 2,
        totalShoots: 3,
        type: 'call_sheet',
        when: 1544804340000
      },
      {
        dayOfShooting: 2,
        description: 'Another call sheet',
        id: 'call-sheet-1',
        shootNumber: 3,
        supportingInfo: '17th Dec 2018 - 13:56',
        totalDays: 2,
        totalShoots: 3,
        type: 'call_sheet',
        when: 1545054960000
      }
    ],
    created_at: 1544789237870,
    id: 'project-1',
    ownerId: 'owner-1',
    title: 'My Project'
  },
  type: 'SET_PROJECT'
}
