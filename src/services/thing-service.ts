import Thing from "../graphql/models/thing";
import fetch from 'node-fetch';
import {ApolloError} from "apollo-server-errors";
import {THINGIVERSE_API_SEARCH_URL, THINGIVERSE_API_THINGS_URL} from "../consts";
import {checkStatus} from "../fetch-utils";

interface ThingsSearchParams {
    sort: string
    is_featured?: boolean
    query?: string
}

export class ThingService {
    static async findById(id: number, token: string): Promise<Thing> {
        const url = `${THINGIVERSE_API_THINGS_URL}/${id}`;

        return fetch(url, {
            method: "GET",
            headers: ThingService.getHeaders(token)
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(response => {
                return new Thing(response.id, response.name, response.public_url, response.like_count, response.is_liked, response.comment_count, response.default_image.url);
            })
            .catch(error => {
                console.log(error);
                throw new ApolloError(error.toString());
            });
    }

    static getHeaders(token: string) {
        return {
            "Authorization": `Bearer ${token}`
        };
    }

    static async search(page: number, per_page: number, token: string, searchParams: ThingsSearchParams) {
        const qParams = [
            `sort=${searchParams.sort}`,
            // searchParams.is_featured ? `is_featured=1` : null,
            `page=${page}`,
            `per_page=${per_page}`,
        ].join("&");
        const url = `${THINGIVERSE_API_SEARCH_URL}${searchParams.query ? "/" + searchParams.query : "/things"}?${qParams}`;

        return fetch(url, {
            method: "GET",
            headers: ThingService.getHeaders(token),
            timeout: 20000
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(response => {
                let responseThings: Thing[] = [];
                for (const thing of response.hits) {
                    responseThings.push(new Thing(thing.id, thing.name, thing.public_url, thing.like_count, thing.is_liked, thing.comment_count, thing.preview_image))
                }
                return responseThings;
            })
            .catch(error => {
                console.log(error);
                throw new ApolloError(error.toString());
            });
    }
}
