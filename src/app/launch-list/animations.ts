import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger
} from "@angular/animations";

export const fadeInAnimation = trigger("fadeInAnimation", [
  transition("* => *", [
    query(":enter",
      [
        style({ opacity: 0 }),
        stagger(100, [animate("0.3s", style({ opacity: 1 }))])
      ],
      { optional: true }
    )
  ])
]);