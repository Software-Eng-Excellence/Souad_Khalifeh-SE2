import { IMapper } from "./IMapper";
import { Cake } from "../model/Cake";
import { CakeBuilder } from "../model/CakeBuilder";

export class CakeMapper implements IMapper<string[], Cake> {
    public map(row: string[]): Cake {
        return new CakeBuilder()
            .setId(Number(row[0]))
            .setType(row[1])
            .setFlavor(row[2])
            .setFilling(row[3])
            .setSize(Number(row[4]))
            .setLayers(Number(row[5]))
            .setFrostingType(row[6])
            .setFrostingFlavor(row[7])
            .setDecorationType(row[8])
            .setDecorationColor(row[9])
            .setCustomMessage(row[10])
            .setShape(row[11])
            .setAllergies(row[12])
            .setSpecialIngredients(row[13])
            .setPackagingType(row[14])
            .setPrice(Number(row[15]))
            .setQuantity(Number(row[16]))
            .build();
    }
}
