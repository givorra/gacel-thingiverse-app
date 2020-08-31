import {Resolver, Arg, Query, ID, Ctx, Int} from "type-graphql";
import {ThingService} from "../../services/ThingService";
import Thing from "../models/Thing";
import {Context} from "../../index";


@Resolver()
export class ThingResolver {
    // constructor(private thingService: ThingService) {
    //     this.thingService = thingService;
    // }

    @Query(returns => Thing)
    async getThingById(@Arg("id", type => ID, {nullable: false}) id: number, @Ctx() ctx: Context): Promise<Thing> {
        return ThingService.findById(id, ctx.token);
    };

    @Query(returns => [Thing])
    async popularThings(@Arg("page", type => Int!, {nullable: false}) page: number,
                        @Arg("per_page", type => Int, {nullable: false}) per_page: number,
                        @Ctx() ctx: Context): Promise<Thing[]> {
        return ThingService.getPopular(page, per_page, ctx.token);
    };


    // @Query(() => [Categories])
    // async returnAllCategories(){
    //     return await CategoriesModel.find();
    // };
    //
    // @Mutation(() => Categories)
    // async createCategory(@Arg("data"){name,description}: CategoriesInput): Promise<Categories> {
    //     const category = (await CategoriesModel.create({
    //         name,
    //         description
    //     })).save();
    //     return category;
    // };
    //
    //
    // @Mutation(() => Boolean)
    // async deleteCategory(@Arg("id") id: string) {
    //     await CategoriesModel.deleteOne({id});
    //     return true;
    // }

}
