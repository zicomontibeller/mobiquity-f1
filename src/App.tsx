import * as React from 'react';
import './styles/App.scss';
import WelcomeViewContainer from './containers/WelcomeViewContainer';
import SeasonViewContainer from './containers/SeasonViewContainer';
import PageNotFoundViewContainer from './containers/PageNotFoundViewContainer';
import MainHeader from './components/MainHeader';
import { StandingActionCreators } from './redux/actions/StandingActions';
import { Dispatch } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from './redux/AppState';
import { StandingModel } from './models/StandingModel';
import { withRouter } from 'react-router';

interface AppValueProps{
  standing: StandingModel[],
}

interface AppDispatchProps{
  fetchStandingData: () => void
}

interface AppProps extends AppValueProps,AppDispatchProps{}

class App extends React.Component<AppProps, {}> {
  // Fetch standing data as soon as app is mounted so its result can be used in both welcome and season winners pages
  public componentWillMount(){
    const { standing } = this.props;
    if(!standing.length){
      this.props.fetchStandingData();
    }
  }
  public render() {
    return (
      <div className="f1-app">
        <MainHeader/>
        <main className="main-section">
          <Switch>
            <Route exact={true} path="/" component={WelcomeViewContainer} />
            <Route path="/season/:season" component={SeasonViewContainer} />
            <Route component={PageNotFoundViewContainer} />
          </Switch>
        </main>
      </div>
    )
  }
}
const mapStateToProps = (state: AppState): AppValueProps  => {
  return {
    standing: state.standing.items,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppState>): AppDispatchProps => {
  return {
    fetchStandingData: () => dispatch(StandingActionCreators.STANDING_FETCH_DATA())
  };
};

export default withRouter<any>(connect<AppValueProps, AppDispatchProps>(mapStateToProps, mapDispatchToProps)(App));
