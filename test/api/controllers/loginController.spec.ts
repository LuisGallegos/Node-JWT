import app from '../../../src/app';
import request from "supertest";

describe("POST /login", ()=>{

    it("return status 201 if user is found", async ()=> {
        const res = await request(app)
            .post('/api/inter/v1/login')
            .send(
                {
                "user": "root",
                "password": "1234"
                }
            );

        expect(res.statusCode).toEqual(201);
    })

    it("return status 401 if user is found", async ()=> {
        const res = await request(app)
            .post('/api/inter/v1/login')
            .send(
                {
                "user": "wrong",
                "password": "badPass"
                }
            );

        expect(res.statusCode).toEqual(401);
    })


})