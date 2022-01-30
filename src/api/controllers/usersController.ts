import { Request, Response, Router } from "express";
import { decodeSession } from "../../common/jwt";
import { updateUserRepo } from "../../common/userRepo";
import { DecodeResult } from "../../models/jwt/DecodeResult";

export const usersController = Router();

usersController.post("/updateUser", async (req: Request, res: Response) =>{
    const requestHeader = "X-JWT-Token";
    const header = req.header(requestHeader);
    const userSession : DecodeResult = decodeSession(header);
    if(userSession.session.username !== req.body.user){
        res.status(401).send(`You are not allowed to modify this user.`)
    } else {
        await updateUserRepo(req.body.user, req.body.name)
        res.status(200).json(userSession.session.username)
    }
})