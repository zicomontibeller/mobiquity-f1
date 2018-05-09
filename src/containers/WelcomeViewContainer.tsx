import * as React from 'react';
import ChampionsList from '../components/ChampionsListComponent';

class WelcomeViewContainer extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="container">
        <p className="lead">Welcome to Mobiquity F1 app, to show the race's winners, please select a year or world champion below.</p>
        <ChampionsList/>
      </div>
    );
  }
}

export default WelcomeViewContainer;