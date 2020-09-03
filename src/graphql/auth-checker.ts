import {AuthChecker} from "type-graphql";
import {Context} from "../index";
import {AuthenticationService} from "../services/authentication-service";

export const customAuthChecker: AuthChecker<Context> = async ({context}) => {
    return await AuthenticationService.validateToken(context.token);
};
