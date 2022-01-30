import { encode, TAlgorithm, decode } from 'jwt-simple';
import * as dotenv from 'dotenv';
import { PartialSession } from '../models/types/PartialSession';
import { Session } from '../models/Session';
import { EncodeResult } from '../models/jwt/EncodeResult';
import { DecodeResult } from '../models/jwt/DecodeResult';
import { ExpirationStatus } from '../models/jwt/ExpirationStatus';

dotenv.config();

const algorithm: TAlgorithm = 'HS512';
const secretKey = process.env.SECRET_JWT as string;

export function encodeSession(partialSession: PartialSession): EncodeResult {
  const issued = Date.now();

  const fifteenMins = 15 * 60 * 1000;

  const expires = issued + fifteenMins;
  
  const session: Session = {
    ...partialSession,
    issued: issued,
    expires: expires,
  };

  return {
    token: encode(session, secretKey, algorithm),
    issued: issued,
    expires: expires,
  };
}

export function decodeSession(token: string): DecodeResult {
  let result: Session;

  try {
    result = decode(token, secretKey, false, algorithm);
  } catch (e) {
    const error: Error = e;
    if (
      error.message === 'No token supplied' ||
      error.message === 'Not enough or too many segments'
    ) {
      return {
        type: 'invalid-token',
        session: null
      };
    }

    if (
      error.message === 'Signature verification failed' ||
      error.message === 'Algorithm not supported'
    ) {
      return {
        type: 'integrity-error',
        session: null
      };
    }

    // Handle json parse errors, thrown when the payload is nonsense
    if (error.message.indexOf('Unexpected token') === 0) {
      return {
        type: 'invalid-token',
        session: null
      };
    }

    throw e;
  }

  return {
    type: 'valid',
    session: result,
  };
}

export function checkExpirationStatus(token: Session): ExpirationStatus {
    const now = Date.now();

    if(token.expires > now) return "active";

    return "expired";
}
