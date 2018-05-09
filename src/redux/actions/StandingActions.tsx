import { DriversModel } from '../../models/DriversModel';
import { Dispatch } from 'redux';
import { AppState } from '../AppState';
import { endpoint, getFirstSeason, seasons } from '../../util';

export const StandingActionCreators = {
  STANDING_ERROR: (hasError: boolean) => {
    return{
      type: 'STANDING_ERROR',
      hasError
    }
  },

  STANDING_LOADING: (isLoading: boolean) => {
    return{
      type: 'STANDING_LOADING',
      isLoading
    }
  },

  STANDING_SUCCESS: (items: DriversModel[]) => {
    return{
      type: 'STANDING_SUCCESS',
      items
    }
  },

  STANDING_FETCH_DATA: () => {
    return (dispatch: Dispatch<AppState>) => {
      dispatch(StandingActionCreators.STANDING_LOADING(true))
      // Calculate offset based on api first year 1950
      const offset = getFirstSeason() - 1950;
      fetch(`${endpoint}/driverStandings/1.json?offset=${offset}&limit=${seasons.length}`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          dispatch(StandingActionCreators.STANDING_LOADING(false));
          return response;
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
          const items = jsonResponse.MRData.StandingsTable.StandingsLists.map((item: any) => {
            const driverResult = item.DriverStandings[0];
            return{
              season: item.season,
              driver: {
                driverId: driverResult.Driver.driverId,
                driverCode: driverResult.Driver.code,
                givenName: driverResult.Driver.givenName,
                familyName: driverResult.Driver.familyName,
                constructorId: driverResult.Constructors[0].constructorId,
                constructorName: driverResult.Constructors[0].name,
                round: parseInt(item.round,10)
              }
            }
          });
          return dispatch(StandingActionCreators.STANDING_SUCCESS(items));
        })
        .catch(() => dispatch(StandingActionCreators.STANDING_ERROR(true)));
    }
  }
}
