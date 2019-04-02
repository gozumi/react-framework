import * as React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './app.component.css'
import WaitingRipple from './components/atomics/waiting-ripple/waiting-ripple.componnent'
import Home from './components/features/home'
import MainPage from './components/pages/main'
import { requestData } from './state/action-creators';
import { IState } from './state/reducers/_interfaces'
import { HomeStatus } from './state/reducers/home/default-state';
import store from './state/store'

store.dispatch(requestData())

const AppContainer = connect(mapStateToProps)(App)
export default AppContainer

interface IProps {
  status: HomeStatus
}

function App (props: IProps) {
  const { status } = props
  return status === 'READY' ?
    renderApp() : <WaitingRipple />
}

function renderApp () {
  return (
    <>
      <Router basename='/'>
        <Switch>
          <Route path='/home' render={renderHome} />
        </Switch>
      </Router>
    </>
  )
}

function mapStateToProps (state: IState) {
  const { status } = state.homeState
  return {
    status
  }
}

function renderHome () { return <MainPage feature={<Home />} /> }
