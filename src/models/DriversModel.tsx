import { CircuitsModel } from './CircuitsModel';

export interface DriversModel{
  driverId: string;
  driverCode: string;
  givenName: string;
  familyName: string;
  constructorId: string;
  constructorName: string;
  round: number;
}

export interface CircuitsDriversModel{
  circuit: CircuitsModel,
  driver: DriversModel
}

export interface WinnersReducerModel {
  isLoading: boolean
  hasError: boolean
  items: CircuitsDriversModel[]
  showAsGrid: boolean
}

export interface ChampionsReducerModel {
  isLoading: boolean
  hasError: boolean
  items: DriversModel[]
}