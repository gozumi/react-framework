/**
 * Loads the service woker for the application.
 */
export default function loadServiceWorker () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        // TODO: Handle this promise & exception appropriately
        .then()
        .catch()
    })
  }
}
