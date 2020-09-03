import fetch from 'node-fetch';
import {
    THINGIVERSE_OAUTH_ACCESS_TOKEN_URL,
    THINGIVERSE_OAUTH_AUTHORIZE_URL,
    THINGIVERSE_OAUTH_VALIDATE_TOKEN_URL
} from "../consts";
import {ApolloError} from "apollo-server-errors";
import {checkStatus} from "../fetch-utils";

export class AuthenticationService {
    static async getAccessToken(code: String): Promise<String> {
        const qParams = [
            `client_id=${process.env.THINGIVERSE_CLIENT_ID}`,
            `client_secret=${process.env.THINGIVERSE_CLIENT_SECRET}`,
            `code=${code}`
        ].join("&");
        const url = `${THINGIVERSE_OAUTH_ACCESS_TOKEN_URL}?${qParams}`;

        return fetch(url, {
            method: "POST"
        })
            .then(checkStatus)
            .then(response => response.text())
            .then(response => {
                const responseFields = new URLSearchParams(response);
                console.log(response);
                return (responseFields && responseFields.get("access_token")) ? String(responseFields.get("access_token")) : '';
                // return '';
            })
            .catch(error => {
                console.error(error.toString());
                throw new ApolloError(error.toString());
            });
    }

    static getAuthenticationRedirectUrl(): string {
        const qParams = [
            `redirect_uri=${process.env.AUTHORIZATION_REDIRECT_URI}`,
            `response_type=code`,
            `client_id=${process.env.THINGIVERSE_CLIENT_ID}`,
        ].join("&");

        return `${THINGIVERSE_OAUTH_AUTHORIZE_URL}?${qParams}`;
    }

    static async validateToken(token: string): Promise<boolean> {
        const url = `${THINGIVERSE_OAUTH_VALIDATE_TOKEN_URL}?access_token=${token}`;
        return await fetch(url, {
            method: "POST"
        })
            .then(checkStatus)
            .then(response => response.json())
            .then(response => {
                if (response.error)
                    throw new ApolloError(response.error);

                return response.audience === process.env.THINGIVERSE_CLIENT_ID;
            })
            .catch(error => {
                console.error(error.toString());
                throw new ApolloError(error.toString());
            });
    }
}
