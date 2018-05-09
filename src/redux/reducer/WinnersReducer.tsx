import { initialState } from '../AppState';
export const winnersLoading = (state = initialState.winners, action: any) => {
  switch (action.type) {
    case 'WINNERS_LOADING':
      return action.isLoading
    default:
      return state;
  }
}
export const winnersError = (state = initialState.winners, action: any) => {
  switch (action.type) {
    case 'WINNERS_ERROR':
      return action.hasError
    default:
      return state;
  }
}
export const winnersSuccess = (state = initialState.winners, action: any) => {
  switch (action.type) {
    case 'WINNERS_SUCCESS':
      return action.items
    default:
      return state;
  }
}

export const winnersAsGrid = (state = initialState.winners, action: any) => {
  switch (action.type) {
    case 'WINNERS_AS_GRID':
      return !state
    default:
      return state;
  }
}
