import { IRequestDataAction, requestData } from 'client/app/state/action-creators'
import { IState } from 'client/app/state/reducers/_interfaces'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Home from './home'

export default connect(mapStateToProps, mapDispatchToProps)(Home)

interface IProps {
  className?: string
}

function mapStateToProps (state: IState, ownProps: IProps) {
  const { className } = ownProps
  return {
    className
  }
}

type ApplicableActions =
  IRequestDataAction

function mapDispatchToProps (dispatch: Dispatch<ApplicableActions>) {
  return {
    requestData: () => dispatch(requestData())
  }
}
