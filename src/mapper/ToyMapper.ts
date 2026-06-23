import { IMapper } from "./IMapper";
import { Toy } from "../model/Toy";
import { ToyBuilder } from "../model/ToyBuilder";

export interface RawToy {
    OrderID: string[];
    Type: string[];
    AgeGroup: string[];
    Brand: string[];
    Material: string[];
    BatteryRequired: string[];
    Educational: string[];
    Price: string[];
    Quantity: string[];
}

/** Unwraps a single-element xml2js array, defaulting to "" when absent. */
function unwrap(value: string[] | undefined): string {
    return value && value.length > 0 ? value[0] : "";
}

/**
 * Unwraps a required numeric field. Returns NaN when the field is absent so the
 * builder rejects it, rather than silently coercing a missing value to 0.
 */
function unwrapNumber(value: string[] | undefined): number {
    return value && value.length > 0 ? Number(value[0]) : NaN;
}

export class ToyMapper implements IMapper<RawToy, Toy> {
    public map(record: RawToy): Toy {
        return new ToyBuilder()
            .setOrderId(unwrapNumber(record.OrderID))
            .setType(unwrap(record.Type))
            .setAgeGroup(unwrap(record.AgeGroup))
            .setBrand(unwrap(record.Brand))
            .setMaterial(unwrap(record.Material))
            .setBatteryRequired(unwrap(record.BatteryRequired).toLowerCase() === "yes")
            .setEducational(unwrap(record.Educational).toLowerCase() === "yes")
            .setPrice(unwrapNumber(record.Price))
            .setQuantity(unwrapNumber(record.Quantity))
            .build();
    }
}
