import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { LaunchDetailsGQL } from "../services/spacexGraphql.service";

@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) {}

  launchDetails$ = this.route.paramMap.pipe(
    map(params => params.get("id") as string),
    switchMap(id => this.launchDetailsService.fetch({ id })),
    map(res => res.data.launch)
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
