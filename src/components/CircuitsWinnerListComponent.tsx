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
  seasonWinner: () => string
}

interface CircuitsWinnerDispatchProps{
  setWinnersAsGrid: () => void
}

interface CircuitsWinnerProps extends CircuitsWinnerListValueProps,CircuitsWinnerDispatchProps{}

class CircuitsWinnerList extends React.Component<CircuitsWinnerProps, {}> {
  public render() {
    const seasonWinner = this.props.seasonWinner();
    return (
      <div className="my-3">
        <div className="row mb-0 ">
          <p className="col col-6 mb-1 pr-0">Show winners as 
            { this.props.showAsGrid ?
              <span onClick={this.props.setWinnersAsGrid} className="btn-show-as-grid" title="Show as list"> list</span> :
              <span onClick={this.props.setWinnersAsGrid} className="btn-show-as-grid" title="Show as grid"> grid</span>
            }
          </p>
          <p className={this.props.showAsGrid ? "d-none" : "col col-6 mb-1 pl-0 season-winner-legend text-right"}>Season's Champion</p>
        </div>
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
                      <div className="separator">
                        <hr className={ seasonWinner === cirWin.driver.driverId ? "season-winner-hr" : ""} />
                        { seasonWinner === cirWin.driver.driverId ? <p className="season-winner-p">Season's Champion</p> : null }
                      </div>
                      <DriverGridItemComponent driver={cirWin.driver}/>
                    </div>
                  </div>
                )
              })}
            </div>
          </div> :
          <div className="circuits-winners-list table-responsive my-2">
            <table className="table">
              <thead>
                <tr>
                  <th>Round</th>
                  <th>Circuit</th>
                  <th>Race</th>
                  <th>Location</th>
                  <th>Winner</th>
                  <th>Nationality</th>
                  <th>Contructor</th>
                </tr>
              </thead>
              <tbody>
                { this.props.circuitsWinners.map((cirWin) => {
                  return (
                    <tr key={cirWin.circuit.circuitId} className={ seasonWinner === cirWin.driver.driverId ? 'season-winner' : ''}>
                      <td>#{cirWin.circuit.round}</td>
                      <td>{cirWin.circuit.circuitName}</td>
                      <td>{cirWin.circuit.raceName}</td>
                      <td>{ `${cirWin.circuit.locality} - ${cirWin.circuit.country}` }</td>
                      <td>{ `${cirWin.driver.givenName} ${cirWin.driver.familyName}` }</td>
                      <td className="text-nowrap">{cirWin.driver.nationality} <span title={cirWin.driver.nationality} className={`flag-icon flag-icon-${cirWin.driver.nationalityShort}`}/></td>
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
    seasonWinner: () => {
      const standSeason = state.standing.items.filter((stand) => stand.season === state.season);
      return standSeason[0] ? standSeason[0].driver.driverId : "";
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