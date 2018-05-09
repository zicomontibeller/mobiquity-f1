import { AppState } from '../redux/AppState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { WinnersActionCreators } from '../redux/actions/WinnersActions';
import { SeasonActionCreators } from '../redux/actions/SeasonActions';
import { SeasonViewPage } from '../components/SeasonViewPage';
import { RouteComponentProps } from 'react-router';
import { getLastSeason, getFirstSeason } from '../util';
export interface SeasonViewValueProps{
  season: string,
  loading: boolean
  hasError: boolean
}
export interface SeasonViewDispatchProps{
  setSeason: (season: string) => void
  fetchWinnersData: (season: string) => void
}
export interface SeasonViewProps extends SeasonViewValueProps, SeasonViewDispatchProps, RouteComponentProps<SeasonViewValueProps> {}

const mapStateToProps = (state: AppState): SeasonViewValueProps => {
  return {
    season: state.season,
    loading: state.winners.isLoading,
    hasError: state.winners.hasError,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppState>): SeasonViewDispatchProps => {
  return {
    setSeason: (season:string) => {
      const intSeason = parseInt(season,10);
      if(intSeason < getFirstSeason() || intSeason > getLastSeason()){
        dispatch(WinnersActionCreators.WINNERS_ERROR(true))
      } else {
        dispatch(WinnersActionCreators.WINNERS_ERROR(false))
        dispatch(SeasonActionCreators.SET_SEASON(season))
      }
    },
    fetchWinnersData: (season:string) => dispatch(WinnersActionCreators.WINNERS_FETCH_DATA(season)),
  };
};

export default connect<SeasonViewValueProps, SeasonViewDispatchProps>(mapStateToProps, mapDispatchToProps)(SeasonViewPage);
