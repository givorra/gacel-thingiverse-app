import {Response} from "node-fetch";

export async function checkStatus(response: Response): Promise<Response> {
    if (response.ok)
        return response;
    else
        throw new Error(response.statusText);
}
