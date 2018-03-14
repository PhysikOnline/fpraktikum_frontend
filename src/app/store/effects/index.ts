import { RouterEffects } from './router.effects';
import { ErrorEffects } from './error.effects';
import { GlobalUserEffects } from './global-user.effects';

export const effects: any[] = [RouterEffects, GlobalUserEffects, ErrorEffects];

export * from './router.effects';
