export const setSeason = (state = false, action: any) => {
  switch (action.type) {
    case 'SET_SEASON':
      return action.season;
    default:
      return state;
  }
}

