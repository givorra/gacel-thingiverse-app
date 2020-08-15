import {Resolver, Arg, Query, ID} from "type-graphql";
import {ThingService} from "../../services/ThingService";
import Thing from "../models/Thing";


@Resolver()
export class ThingResolver {
    // constructor(private thingService: ThingService) {
    //     this.thingService = thingService;
    // }

    @Query(returns => Thing)
    async getThingById(@Arg("id", type => ID, {nullable: false}) id: number): Promise<Thing> {
        return ThingService.findById(id);
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
