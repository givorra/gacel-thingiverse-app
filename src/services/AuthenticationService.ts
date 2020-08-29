import fetch from 'node-fetch';

const ThingiverseConfig = {
    URL_ACCESS_TOKEN: "https://www.thingiverse.com/login/oauth/access_token",
    CLIENT_ID: "ae78d6c71cf7f968065f",
    CLIENT_SECRET: "b964b7b99c06479b475dd1654000536f"
};

export class AuthenticationService {
    static async getAccessToken(code: String): Promise<String> {
        const qParams = [
            `client_id=${ThingiverseConfig.CLIENT_ID}`,
            `client_secret=${ThingiverseConfig.CLIENT_SECRET}`,
            `code=${code}`
        ].join("&");

        const token: String = await fetch(`${ThingiverseConfig.URL_ACCESS_TOKEN}?${qParams}`, {
                method: "POST"
            }
        )
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
}
