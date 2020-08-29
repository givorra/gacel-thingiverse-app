import {Arg, Query, Resolver} from "type-graphql";
import {AuthenticationService} from "../../services/AuthenticationService";

@Resolver()
export class AuthenticationResolver {
    @Query(returns => String)
    async getAccessToken(@Arg("code", {nullable: false}) code: String): Promise<String> {
        return AuthenticationService.getAccessToken(code);
    };
}
