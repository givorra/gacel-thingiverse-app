import Thing from "../graphql/models/Thing";

export class ThingService {
    static async findById(id: number): Promise<Thing> {
        let thing = new Thing();
        thing.id = id;
        return thing;
    }
}
