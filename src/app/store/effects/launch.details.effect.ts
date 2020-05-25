import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import { LaunchDetailsGQL } from "./../../services/spacexGraphql.service";
import {
  loadLaunchDetails,
  loadLaunchDetailsSuccess,
  loadLaunchDetailsFail
} from "../actions";
import { LaunchDetailsState } from '../reducers/launch-details.reducer';
import { getLaunchList } from '../selectors';
import { Store, select } from '@ngrx/store';

@Injectable()
export class LaunchDetailsEffects {
  constructor(
    private actions$: Actions,
    private readonly store: Store<LaunchDetailsState>,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) {}

  loadLaunchDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLaunchDetails),
      map(action => action.payload),
      withLatestFrom(this.store.pipe(select(getLaunchList))),
      switchMap(([id]) =>
        this.launchDetailsService.fetch({ id }).pipe(
          map((response: any) => {
            return loadLaunchDetailsSuccess({
              payload: response.data.launch as any
            });
          }),
          catchError(error => of(loadLaunchDetailsFail(error)))
        )
      )
    )
  );
}
