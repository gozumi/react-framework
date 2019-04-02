import App from 'client/app/app.component'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import './_styles/main.css'
import store from './app/state/store'
import './load-icons'
import loadServiceWorker from './load-service-worker'
import textLoader from './text/load-text'

textLoader()
  .then(() => {
    loadServiceWorker()
    const rootElement = document.getElementById('app')

    renderRoot(App)

    if ((module as any).hot) {
      (module as any).hot.accept('./app/app.component', () => {
        const NextApp = require('./app/app.component').default
        renderRoot(NextApp)
      })
    }

    /**
     * Renders a given component on the root element
     * @param Component The component to render on the root element
     */
    function renderRoot (Component: typeof App) {
      ReactDOM.render(
        (
          <AppContainer>
            <Provider store={store}>
              <Component />
            </Provider>
          </AppContainer>
        ),
        rootElement
      )
    }
  })
  // tslint:disable-next-line:no-console
  .catch((error: any) => console.log(error))
