import {Resolver, Arg, Query, ID, Ctx, Int, Authorized} from "type-graphql";
import {ThingService} from "../../services/thing-service";
import Thing from "../models/thing";
import {Context} from "../../index";


@Resolver()
export class ThingResolver {
    @Authorized()
    @Query(returns => Thing)
    async getThingById(@Arg("id", type => ID, {nullable: false}) id: number, @Ctx() ctx: Context): Promise<Thing> {
        return ThingService.findById(id, ctx.token);
    };

    @Authorized()
    @Query(returns => [Thing])
    async searchThings(@Arg("page", type => Int!, {nullable: false}) page: number,
                        @Arg("per_page", type => Int!, {nullable: false}) per_page: number,
                        @Arg("sort", type => String!, {nullable: false}) sort: string,
                        @Arg("query", type => String, {nullable: true}) query: string,
                        @Arg("is_featured", type => Boolean, {nullable: true}) is_featured: boolean,
                        @Ctx() ctx: Context): Promise<Thing[]> {
        return ThingService.search(page, per_page, ctx.token, {sort, query, is_featured});
    };
}
