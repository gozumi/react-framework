import store from 'client/app/state/store'
import RestWorker from 'worker-loader!web-workers/rest'
import { IAction } from '../../_typings'

export const restWorker: Worker = new RestWorker()
restWorker.onmessage = messageHandler

export default function messageHandler (evt: MessageEvent) {
  const action: IAction = evt.data.action
  store.dispatch(action)
}
