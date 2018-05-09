import * as React from 'react';
import { AppState } from '../redux/AppState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CircuitsDriversModel } from '../models/DriversModel';
import DriverGridItemComponent from './DriverGridItemComponent';
import { WinnersActionCreators } from '../redux/actions/WinnersActions';


interface CircuitsWinnerListValueProps{
  circuitsWinners: CircuitsDriversModel[],
  showAsGrid: boolean,
  roundWinner: () => number
}

interface CircuitsWinnerDispatchProps{
  setWinnersAsGrid: () => void
}

interface CircuitsWinnerProps extends CircuitsWinnerListValueProps,CircuitsWinnerDispatchProps{}

class CircuitsWinnerList extends React.Component<CircuitsWinnerProps, {}> {
  public render() {
    const roundWinner = this.props.roundWinner();
    const trophyImg = require(`../static/img/trophy.svg`);
    return (
      <div className="my-3">
        <p className="lead mb-0">Show winners as 
          { this.props.showAsGrid ?
            <span onClick={this.props.setWinnersAsGrid} className="btn-show-as-grid" title="Show as list"> list</span> :
            <span onClick={this.props.setWinnersAsGrid} className="btn-show-as-grid" title="Show as grid"> grid</span>
          }
        </p>
        { this.props.showAsGrid ?
          <div className="circuits-winners-grid">
            <div className="row justify-content-around circuits-winners-grid-item" >
              { this.props.circuitsWinners.map((cirWin) => {
                return (
                  <div className="col col-12 col-md-6" key={cirWin.circuit.circuitId}>
                    <div className="border my-2 p-2 p-sm-3">
                      <h4>Round #{cirWin.circuit.round}</h4>
                      <div className="d-flex w-100 mb-0">
                        <h5 className="main-title">{cirWin.circuit.raceName}</h5>
                      </div>
                      <p className="m-0 text-muted">{ cirWin.circuit.circuitName }</p>
                      <p className="m-0 text-muted">{ `${cirWin.circuit.locality} - ${cirWin.circuit.country}` }</p>
                      <hr/>
                      <DriverGridItemComponent driver={cirWin.driver}/>
                    </div>
                  </div>
                )
              })}
            </div>
          </div> :
          <div className="circuits-winners-list">
            <table className="table">
              <thead>
                <tr>
                  <th>Round</th>
                  <th>Circuit</th>
                  <th>Race</th>
                  <th>Location</th>
                  <th>Winner</th>
                  <th>Contructor</th>
                </tr>
              </thead>
              <tbody>
                { this.props.circuitsWinners.map((cirWin) => {
                  return (
                    <tr key={cirWin.circuit.circuitId} className={ roundWinner === cirWin.circuit.round ? 'round-winner' : ''}>
                      <td style={ roundWinner === cirWin.circuit.round ? { backgroundImage: `url(${trophyImg})`} : {}}>#{cirWin.circuit.round}</td>
                      <td>{cirWin.circuit.circuitName}</td>
                      <td>{cirWin.circuit.raceName}</td>
                      <td>{ `${cirWin.circuit.locality} - ${cirWin.circuit.country}` }</td>
                      <td>{ `${cirWin.driver.givenName} ${cirWin.driver.familyName}` }</td>
                      <td>{ cirWin.driver.constructorName }</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): CircuitsWinnerListValueProps  => {
  return {
    roundWinner: () => {
      const standSeason = state.standing.items.filter((stand) => stand.season === state.season);
      if( standSeason[0] ){
        // TODO figure it out where/how to get the round when driver became world champion
        // return standSeason[0].driver.round
      }
      return 0;
    },
    circuitsWinners: state.winners.items,
    showAsGrid: state.winners.showAsGrid
  };
};


const mapDispatchToProps = (dispatch: Dispatch<AppState>): CircuitsWinnerDispatchProps => {
  return {
    setWinnersAsGrid: () => {
      dispatch(WinnersActionCreators.WINNERS_AS_GRID())
    },
  };
};

export default connect<CircuitsWinnerListValueProps, CircuitsWinnerDispatchProps>(mapStateToProps, mapDispatchToProps)(CircuitsWinnerList);