import { DriversModel } from '../../models/DriversModel';
import { Dispatch } from 'redux';
import { AppState } from '../AppState';
import { endpoint } from '../../util';

export const WinnersActionCreators = {
  WINNERS_ERROR: (hasError: boolean) => {
    return{
      type: 'WINNERS_ERROR',
      hasError
    }
  },

  WINNERS_LOADING: (isLoading: boolean) => {
    return{
      type: 'WINNERS_LOADING',
      isLoading
    }
  },

  WINNERS_AS_GRID: () => {
    return{
      type: 'WINNERS_AS_GRID'
    }
  },

  WINNERS_SUCCESS: (items: DriversModel[]) => {
    return{
      type: 'WINNERS_SUCCESS',
      items
    }
  },

  WINNERS_FETCH_DATA: (season: string) => {
    return (dispatch: Dispatch<AppState>) => {
      dispatch(WinnersActionCreators.WINNERS_LOADING(true))

      fetch(`${endpoint}/${season}/results/1.json`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          dispatch(WinnersActionCreators.WINNERS_LOADING(false));
          return response;
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
          console.log(jsonResponse)
          const items = jsonResponse.MRData.RaceTable.Races.map((item: any) => {
            const result = item.Results[0];
            return{
              circuit: {
                circuitId: item.Circuit.circuitId,
                circuitName: item.Circuit.circuitName,
                country: item.Circuit.Location.country,
                locality: item.Circuit.Location.locality,
                round: parseInt(item.round,10),
                raceName: item.raceName
              },
              driver:{
                driverId: result.Driver.driverId,
                driverCode: result.Driver.code,
                driverNumber: result.Driver.permanentNumber,
                givenName: result.Driver.givenName,
                familyName: result.Driver.familyName,
                constructorId: result.Constructor.constructorId,
                constructorName: result.Constructor.name,
              }
            }
          });
          return dispatch(WinnersActionCreators.WINNERS_SUCCESS(items));
        })
        .catch(() => dispatch(WinnersActionCreators.WINNERS_ERROR(true)));
    }
  }
}
