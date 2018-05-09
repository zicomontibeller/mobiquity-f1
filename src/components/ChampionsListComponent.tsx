import * as React from 'react';
import { AppState } from '../redux/AppState';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
// import { seasons as utilSeasons } from '../util';
// import { DriversModel } from '../models/DriversModel';
import { StandingModel  } from '../models/StandingModel';

import LoadingComponent from './LoadingComponent';
import DriverGridItemComponent from './DriverGridItemComponent';

interface ChampionsListValueProps{
  standing: StandingModel[],
  isLoading: boolean
}


class ChampionsList extends React.Component<ChampionsListValueProps, {}> {
  
  public render() {
    return (
      this.props.isLoading ? <LoadingComponent/> :
      <div className="container">
        <div className="row justify-content-around standing-grid-item">
        {this.props.standing.map((item:StandingModel) => {
          return (
              <div className="col col-12 col-md-6" key={item.season} >
                <Link to={`/season/${item.season}`} >
                  <div className="border my-2 p-3">
                    <div className="d-flex w-100 justify-content-between mb-3">
                      <h5 className="main-title">Year {item.season}</h5>
                    </div>
                    <DriverGridItemComponent driver={item.driver}/>
                  </div>
                </Link>
              </div>
          )
        })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): ChampionsListValueProps  => {
  return {
    standing: state.standing.items,
    isLoading: state.standing.isLoading
  };
};



export default connect<ChampionsListValueProps, {}>(mapStateToProps, {})(ChampionsList);