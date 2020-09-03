import {Resolver, Arg, Query, ID, Ctx, Int, Authorized} from "type-graphql";
import {ThingService} from "../../services/ThingService";
import Thing from "../models/Thing";
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
    async popularThings(@Arg("page", type => Int!, {nullable: false}) page: number,
                        @Arg("per_page", type => Int, {nullable: false}) per_page: number,
                        @Ctx() ctx: Context): Promise<Thing[]> {
        return ThingService.getPopular(page, per_page, ctx.token);
    };
}
