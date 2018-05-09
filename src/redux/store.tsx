import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { winnersLoading, winnersError, winnersSuccess, winnersAsGrid } from './reducer/WinnersReducer';
import { standingLoading, standingError, standingSuccess } from './reducer/StandingReducer';
import { setSeason } from './reducer/SeasonReducer';
import { AppState, initialState } from './AppState';
import { createLogger } from 'redux-logger';

const mainReducer = combineReducers<AppState>({
  winners: combineReducers({
    isLoading:winnersLoading,
    hasError:winnersError,
    items:winnersSuccess,
    showAsGrid:winnersAsGrid
  }),
  standing: combineReducers({
    isLoading:standingLoading,
    hasError:standingError,
    items:standingSuccess
  }),
  season: setSeason
});

const logger = createLogger();

const store = createStore(
  mainReducer,
  initialState,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk,logger)
);

export default store;
