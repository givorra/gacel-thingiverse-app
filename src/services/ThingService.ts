import Thing from "../graphql/models/Thing";
import fetch from 'node-fetch';
import {ApolloError} from "apollo-server-errors";


export class ThingService {
    static async findById(id: number, token: string): Promise<Thing> {
        const url = "https://api.thingiverse.com/things/1762299";
        const thing: Thing = await fetch(url, {
            method: "GET",
            headers: ThingService.getHeaders(token)
        })
            .then(res => res.json())
            .then(res => {
                return new Thing(res.id, res.name, res.public_url, res.like_count, res.is_liked, res.comment_count, res.default_image.url);
            })
            .catch(error => {
                console.log(error);
                throw new ApolloError(error.toString());
            });
        return Promise.resolve(thing);
    }

    static async getPopular(page: number, per_page: number, token: string) {
        const qParams = [
            `sort=popular`,
            `page=${page}`,
            `per_page=${per_page}`,
        ].join("&");

        const url = `https://api.thingiverse.com/search/things?${qParams}`;
        const things: Thing[] = await fetch(url, {
            method: "GET",
            headers: ThingService.getHeaders(token)
        })
            .then(res => res.json())
            .then(res => {
                let responseThings: Thing[] = [];
                for (const thing of res.hits) {
                    responseThings.push(new Thing(thing.id, thing.name, thing.public_url, thing.like_count, thing.is_liked, thing.comment_count, thing.preview_image))
                }
                return responseThings;
            })
            .catch(error => {
                console.log(error);
                throw new ApolloError(error.toString());
            });
        return Promise.resolve(things);
    }

    static getHeaders(token: string) {
        return {
            "Authorization": `Bearer ${token}`
        };
    }
}
