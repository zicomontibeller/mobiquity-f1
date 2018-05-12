import * as React from 'react';

import { SeasonViewProps } from '../containers/SeasonViewContainer';
import CircuitsWinnerList from './CircuitsWinnerListComponent';
import LoadingComponent from './LoadingComponent';
import { getFirstSeason, getLastSeason } from '../util';
import { Link } from 'react-router-dom';

export class SeasonViewPage extends React.Component<SeasonViewProps, {}> {
  public resetSeason(season: string){
    // TODO, change redux to keep season state saved
    this.props.setSeason(season);
    this.props.fetchWinnersData(season);
  }
  public componentWillMount(){
    const { season } = this.props.match.params;
    this.resetSeason(season)
  }
  public componentWillReceiveProps(nextProps: SeasonViewProps){
    if(nextProps.match.params.season!==this.props.match.params.season){
      this.resetSeason(nextProps.match.params.season)
    }
  }
  public render() {
    const prevSeason = parseInt(this.props.season,10) - 1;
    const nextSeason = parseInt(this.props.season,10) + 1;

    const linkPrev = prevSeason < getFirstSeason() ? 
      <span className="btn btn-link btn-season btn-season-prev disabled"><span className="ion-chevron-left"/></span> : 
      <Link className="btn btn-link btn-season btn-season-prev" title={`Go to season ${prevSeason}`} to={`/season/${prevSeason}`}><span className="ion-chevron-left"/></Link>

    const linkNext = nextSeason > getLastSeason() ? 
      <span className="btn btn-link btn-season btn-season-next disabled"><span className="ion-chevron-right"/></span> : 
      <Link className="btn btn-link btn-season btn-season-next" title={`Go to season ${nextSeason}`} to={`/season/${nextSeason}`}><span className="ion-chevron-right"/></Link>
    if(this.props.hasError){
      return (
        <div className="container season-not-found">
          <div className="d-flex w-100 mb-0">
            <h5 className="main-title">Season not found</h5>
          </div>
          <p className="lead">Something went wrong, maybe the season selected is not on the requested years range, or perhaps some connection issue, try to select the year again <Link to="/">here</Link>.</p>
        </div>
      )
    }
    return (
      <div className="container season-page">
        <div className="season-title">
          { linkPrev }
          <h1 className="text-center">Season {this.props.season}</h1>
          { linkNext }
        </div>
        { this.props.loading ? <LoadingComponent/> : <CircuitsWinnerList/>}
      </div>
    );
  }
}