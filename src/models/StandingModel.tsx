import { DriversModel } from './DriversModel';

export interface StandingModel{
  driver: DriversModel
  season: string
}

export interface StandingReducerModel {
  isLoading: boolean
  hasError: boolean
  items: StandingModel[]
}