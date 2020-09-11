import {Field, ObjectType} from "type-graphql";
import Thing from "./thing";

@ObjectType()
class SearchThingResponse {
    @Field()
    public total: number;
    @Field(() => [Thing])
    public things: Thing[];

    constructor(total: number, things: Thing[]) {
        this.total = total;
        this.things = things;
    }
}

export default SearchThingResponse;
