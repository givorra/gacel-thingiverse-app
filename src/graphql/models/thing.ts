import {Field, ID, Int, ObjectType} from "type-graphql";

@ObjectType()
class Thing {
    @Field(type => ID)
    public id: number;
    @Field()
    public name: string;
    @Field()
    public public_url: string;
    @Field(type => Int)
    public like_count: number;
    @Field()
    public is_liked: boolean;
    @Field(type => Int)
    public comment_count: number;
    @Field()
    public preview_image: string;

    constructor(id?: number, name?: string, public_url?: string, like_count?: number, is_liked?: boolean, comment_count?: number, preview_image?: string) {
        this.id = id || 0;
        this.name = name || "";
        this.public_url = public_url || "";
        this.like_count = like_count || 0;
        this.is_liked = is_liked || false;
        this.comment_count = comment_count || 0;
        this.preview_image = preview_image || "";
    }
}

export default Thing;
