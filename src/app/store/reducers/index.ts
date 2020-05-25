import { ActionReducerMap } from "@ngrx/store";
import * as fromLaunchList from "./launch-list.reducer";
import * as fromLaunchDetails from "./launch-details.reducer";

export interface LaunchListState {
  launchList: fromLaunchList.LaunchListState;
}

export interface LaunchDetailsState {
  launchDetails: fromLaunchDetails.LaunchDetailsState;
}


export interface LaunchState {
  launchList: fromLaunchList.LaunchListState;
  launchDetails: fromLaunchDetails.LaunchDetailsState;
}

export const launchReducers: ActionReducerMap<LaunchState, any> = {
  launchList: fromLaunchList.reducer,
  launchDetails: fromLaunchDetails.reducer
}