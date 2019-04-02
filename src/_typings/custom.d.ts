declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor()
  }
 
  export default WebpackWorker
}

declare const SERVICE_URL_BASE: string
