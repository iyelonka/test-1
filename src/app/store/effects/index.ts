import { LaunchListEffects } from "./launch.list.effect";
import { LaunchDetailsEffects } from "./launch.details.effect";

export const launchListEffects = [LaunchListEffects];
export const launchDetailsEffects = [LaunchDetailsEffects];

export * from "./launch.list.effect";
export * from "./launch.details.effect";

export const launchEffects: any[] = [launchListEffects, launchDetailsEffects];