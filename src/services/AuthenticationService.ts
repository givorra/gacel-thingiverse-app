import fetch from 'node-fetch';

export class AuthenticationService {
    static async getAccessToken(code: String): Promise<String> {
        const qParams = [
            `client_id=${process.env.THINGIVERSE_CLIENT_ID}`,
            `client_secret=${process.env.THINGIVERSE_CLIENT_SECRET}`,
            `code=${code}`
        ].join("&");

        const token: String = await fetch(`${process.env.THINGIVERSE_OAUTH_ACCESS_TOKEN_URL}?${qParams}`, {
                method: "POST"
            })
        .then(response => response.text())
        .then(response => {
            const responseFields = new URLSearchParams(response);
            console.log(response);
            return (responseFields && responseFields.get("access_token")) ? String(responseFields.get("access_token")) : '';
            // return '';
        })
        .catch(error => {
            console.error(error);
            // FIXME: return GraphQL ERROR
            return '';
        });

        return Promise.resolve(token);
    }

    static getAuthenticationRedirectUrl() {
        const qParams = [
            `redirect_uri=${process.env.AUTHORIZATION_REDIRECT_URI}`,
            `response_type=code`,
            `client_id=${process.env.THINGIVERSE_CLIENT_ID}`,
        ].join("&");

        return `${process.env.THINGIVERSE_OAUTH_AUTHORIZE_URL}?${qParams}`;
    }
}
