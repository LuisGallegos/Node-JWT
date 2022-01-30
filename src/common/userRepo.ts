import { User } from "../models/User";
import { readFile, writeFile } from "fs/promises";
import * as _ from 'underscore';

export async function findUserOnRepoFile(username: string, password: string): Promise<User> {
    const buffer = await readFile('./userRepo.json');
    const bufferString = buffer.toString();
    const userRepoList = JSON.parse(bufferString);
    const user : User = _.findWhere(userRepoList, { username: username, password: password})
    return user
}

export async function updateUserRepo(username: string, name: string) {
    const buffer = await readFile('./userRepo.json');
    const bufferString = buffer.toString();
    const userRepoList = JSON.parse(bufferString);
    _.each(userRepoList, x=>{
        if(x.username == username) {
            x.name = name
        }
    })
    await writeFile('./userRepo.json', JSON.stringify(userRepoList));
}

