import { UserEffects } from './user.effect';
import { RegistrationInfoEffects } from './registration.effect';
import { MetaInfoEffects } from './meta-info.effect';
import { PartnerEffects } from './partner.effect';

export const effects = [
  UserEffects,
  RegistrationInfoEffects,
  MetaInfoEffects,
  PartnerEffects,
];

export * from './user.effect';
export * from './registration.effect';
export * from './meta-info.effect';
export * from './partner.effect';
