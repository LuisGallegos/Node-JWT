import { Request, Response, Router } from "express";
import { encodeSession } from "../../common/jwt";
import { findUserOnRepoFile } from "../../common/userRepo";

export const loginController = Router();

loginController.post("/", async (req: Request, res: Response) =>{
    const user = await findUserOnRepoFile(req.body.user, req.body.password)
    if(user){
        const session = encodeSession({
            id: user.id,
            username: user.username,
            dateCreated: user.dateCreated
        })
        res.status(201).json(session)
    } else {
        res.status(401).send(`Wrong UserName or Password`)
    }
    
})