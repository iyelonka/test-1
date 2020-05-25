import { LaunchDetailsState } from "./../store/reducers/launch-details.reducer";
import { map } from "rxjs/operators";
import { LaunchDetailsGQL } from "./spacexGraphql.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadLaunchDetails } from "../store/actions";
import * as launchDetailsQuery from "../store/selectors";

@Injectable({
  providedIn: "root"
})
export class LaunchDetailsFacadeService {
  launchDetialsState$ = this.store.select(launchDetailsQuery.getLaunchDetailsState);
  launchDetails$ = this.store.select(launchDetailsQuery.getLaunchDetails);
  launchDetailsLoaded$ = this.store.select(launchDetailsQuery.getLaunchDetailsLoaded);
  launchDetailsLoading$ = this.store.select(launchDetailsQuery.getLaunchDetailsLoading);

  constructor(
    private readonly store: Store<LaunchDetailsState>,
    private readonly launchDeatilsService: LaunchDetailsGQL
  ) {}

  launchDetailsStoreCache(id: string) {
    this.store.dispatch(loadLaunchDetails({ payload: id }));
    return this.launchDetails$;
  }

  launchDetailsFacade(id: string) {
    return this.launchDeatilsService
      .fetch({ id })
      .pipe(map(res => res.data.launch));
  }
}
