import { initialState } from '../AppState';
export const standingLoading = (state = initialState.standing, action: any) => {
  switch (action.type) {
    case 'STANDING_LOADING':
      return action.isLoading
    default:
      return state;
  }
}
export const standingError = (state = initialState.standing, action: any) => {
  switch (action.type) {
    case 'STANDING_ERROR':
      return action.hasError
    default:
      return state;
  }
}
export const standingSuccess = (state = initialState.standing, action: any) => {
  switch (action.type) {
    case 'STANDING_SUCCESS':
      return action.items
    default:
      return state;
  }
}
