import { Toy } from "./Toy";

/**
 * Builder for the Toy model.
 * Use the set* methods to provide values (chainable), then call build()
 * to get a fully constructed Toy. build() throws if a required field
 * (orderId, price, quantity) is missing or not a valid number.
 */
export class ToyBuilder {
    private orderId?: number;
    private type: string = "";
    private ageGroup: string = "";
    private brand: string = "";
    private material: string = "";
    private batteryRequired: boolean = false;
    private educational: boolean = false;
    private price?: number;
    private quantity?: number;

    public setOrderId(orderId: number): this {
        this.orderId = orderId;
        return this;
    }

    public setType(type: string): this {
        this.type = type;
        return this;
    }

    public setAgeGroup(ageGroup: string): this {
        this.ageGroup = ageGroup;
        return this;
    }

    public setBrand(brand: string): this {
        this.brand = brand;
        return this;
    }

    public setMaterial(material: string): this {
        this.material = material;
        return this;
    }

    public setBatteryRequired(batteryRequired: boolean): this {
        this.batteryRequired = batteryRequired;
        return this;
    }

    public setEducational(educational: boolean): this {
        this.educational = educational;
        return this;
    }

    public setPrice(price: number): this {
        this.price = price;
        return this;
    }

    public setQuantity(quantity: number): this {
        this.quantity = quantity;
        return this;
    }

    public build(): Toy {
        if (this.orderId === undefined) {
            throw new Error("Cannot build Toy: required field 'orderId' is missing");
        }
        if (this.price === undefined) {
            throw new Error("Cannot build Toy: required field 'price' is missing");
        }
        if (this.quantity === undefined) {
            throw new Error("Cannot build Toy: required field 'quantity' is missing");
        }
        if (Number.isNaN(this.orderId) || Number.isNaN(this.price) || Number.isNaN(this.quantity)) {
            throw new Error("Cannot build Toy: orderId, price and quantity must be valid numbers");
        }

        return new Toy(
            this.orderId,
            this.type,
            this.ageGroup,
            this.brand,
            this.material,
            this.batteryRequired,
            this.educational,
            this.price,
            this.quantity
        );
    }
}
