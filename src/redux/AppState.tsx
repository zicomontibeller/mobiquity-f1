import { WinnersReducerModel } from "../models/DriversModel";
import { StandingReducerModel } from "../models/StandingModel";

export interface AppState {
  winners: WinnersReducerModel
  standing: StandingReducerModel
  season: string
}

const defaultInitialFetchResults = {
  hasError: false,
  isLoading: false,
  items: [],
}

export const initialState: AppState = {
  season: "",
  winners: {...defaultInitialFetchResults, showAsGrid: false },
  standing: defaultInitialFetchResults
}


