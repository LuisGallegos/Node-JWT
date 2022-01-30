import { Request, Response, NextFunction } from "express";
import { DecodeResult } from "../models/jwt/DecodeResult";
import { ExpirationStatus } from "../models/jwt/ExpirationStatus";
import { checkExpirationStatus, decodeSession } from "./jwt";

export function requireJwtAuth(request: Request, response: Response, next: NextFunction) {
    const unauthorized = (message: string) => response.status(401).json({
        ok: false,
        message: message
    })

    const requestHeader = "X-JWT-Token";
    const header = request.header(requestHeader);

    if(!header){
        unauthorized(`Required ${requestHeader} header not found.`);
        return;
    }

    const userSession : DecodeResult = decodeSession(header);

    if(userSession.type !== "valid") {
        unauthorized(`Token can't be decoded. Reason: ${userSession.type}.`)
        return;
    }

    const expiration : ExpirationStatus = checkExpirationStatus(userSession.session);

    if(expiration === "expired"){
        unauthorized(`Authorization token has expired. Renew this token`);
    }

    next();
}