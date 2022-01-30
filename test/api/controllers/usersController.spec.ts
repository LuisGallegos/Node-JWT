import app from '../../../src/app';
import request from "supertest";
import { encodeSession } from '../../../src/common/jwt';
import { EncodeResult } from '../../../src/models/jwt/EncodeResult';


describe("POST /updateUser", ()=>{

    it("return status 201 if user is found", async ()=> {
        
        const token : EncodeResult = await encodeSession({
            id: 1,
            username: 'root',
            dateCreated: 1234
        });

        const res = await request(app)
            .post('/api/inter/v1/users/updateUser')
            .set({'X-JWT-Token': token.token })
            .send(
                {
                "user": "root",
                "name": "nameRoot"
                }
            );

        expect(res.statusCode).toEqual(200);
    })

    it("return status 401 if user is found", async ()=> {
        const token : EncodeResult = await encodeSession({
            id: 1,
            username: 'root',
            dateCreated: 1234
        });
        const res = await request(app)
            .post('/api/inter/v1/users/updateUser')
            .set({'X-JWT-Token': token.token })
            .send(
                {
                "user": "wrong",
                "password": "badPass"
                }
            );

        expect(res.statusCode).toEqual(401);
    })


})