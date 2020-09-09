import {AuthChecker} from "type-graphql";
import {Context} from "../index";
import {AuthenticationService} from "../services/authentication-service";
import {tokenCache} from "../server-cache";

export const customAuthChecker: AuthChecker<Context> = async ({context}) => {
    let isValidToken: boolean | undefined = tokenCache.get(context.token);

    if (isValidToken === true) {
        return true;
    } else if (isValidToken === false) {
        return false;
    } else {
        isValidToken = await AuthenticationService.validateToken(context.token);
        tokenCache.set(context.token, isValidToken);
        return isValidToken;
    }
};
