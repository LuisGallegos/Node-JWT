import { Session } from '../Session';

export type DecodeResult =
  | { type: 'valid'; session: Session }
  | { type: 'integrity-error'; session: null }
  | { type: 'invalid-token'; session: null };
