import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { LaunchDetailsFacadeService } from "./../services/launch-details-facade.service";

@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsFacade: LaunchDetailsFacadeService
  ) {}

  launchDetails$ = this.route.paramMap.pipe(
    map(params => params.get("id") as string),
    switchMap(id => this.launchDetailsFacade.launchDetailsStoreCache(id)),
  );

  mainPhotoSource: string;
  currentPhotoIndex: number;

  changeMainPhoto(thumbnailSrc: string, idx: number) {
    this.mainPhotoSource = thumbnailSrc;
    this.currentPhotoIndex = idx;
  }
  getPrev(): void {}
  getNext(): void {}

  ngOnInit(): void {
    this.currentPhotoIndex = 0;
  }
}
