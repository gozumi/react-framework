import { IData } from 'client/interfaces'

export type HomeStatus =
  'READY' | 'WATING_FOR_DATA'

export interface IHomeState {
  data: Partial<IData>
  status: HomeStatus
}

const DEFAULT_STATE: IHomeState = {
  data: {},
  status: 'READY'
}

export default DEFAULT_STATE
