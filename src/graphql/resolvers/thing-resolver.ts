import {Arg, Authorized, Ctx, ID, Int, Mutation, Query, Resolver} from "type-graphql";
import {ThingService} from "../../services/thing-service";
import Thing from "../models/thing";
import {Context} from "../../index";
import SearchThingResponse from "../models/search-thing-response";


@Resolver()
export class ThingResolver {
    @Authorized()
    @Query(returns => Thing)
    async getThingById(@Arg("id", type => ID, {nullable: false}) id: number, @Ctx() ctx: Context): Promise<Thing> {
        return ThingService.findById(id, ctx.token);
    };

    @Authorized()
    @Query(returns => SearchThingResponse)
    async searchThings(@Arg("page", type => Int!, {nullable: false}) page: number,
                        @Arg("per_page", type => Int!, {nullable: false}) per_page: number,
                        @Arg("sort", type => String!, {nullable: false}) sort: string,
                        @Arg("query", type => String, {nullable: true}) query: string,
                        @Arg("is_featured", type => Boolean, {nullable: true}) is_featured: boolean,
                        @Ctx() ctx: Context): Promise<SearchThingResponse> {
        return ThingService.search(page, per_page, ctx.token, {sort, query, is_featured});
    };

    @Authorized()
    @Mutation(returns => Boolean)
    async setThingLike(@Arg("like", type => Boolean, {nullable: false}) like: boolean,
                       @Arg("thing_id", type => ID, {nullable: false}) thing_id: number,
                       @Ctx() ctx: Context): Promise<Boolean> {
        return ThingService.setThingLike(like, thing_id, ctx.token);
    };
}
