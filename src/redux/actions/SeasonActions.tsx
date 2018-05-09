export const SeasonActionCreators = {
  SET_SEASON: (season: string) => {
    return{
      type: 'SET_SEASON',
      season
    }
  }
}