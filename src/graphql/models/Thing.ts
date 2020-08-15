import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
class Thing {
    @Field(type => ID)
    public id: number = 0;
}

export default Thing;
