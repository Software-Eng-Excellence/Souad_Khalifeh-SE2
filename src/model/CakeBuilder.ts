import { Cake } from "./Cake";

export class CakeBuilder {
    private id?: number;
    private type: string = "";
    private flavor: string = "";
    private filling: string = "";
    private size: number = 0;
    private layers: number = 0;
    private frostingType: string = "";
    private frostingFlavor: string = "";
    private decorationType: string = "";
    private decorationColor: string = "";
    private customMessage: string = "";
    private shape: string = "";
    private allergies: string = "";
    private specialIngredients: string = "";
    private packagingType: string = "";
    private price?: number;
    private quantity?: number;

    public setId(id: number): this {
        this.id = id;
        return this;
    }

    public setType(type: string): this {
        this.type = type;
        return this;
    }

    public setFlavor(flavor: string): this {
        this.flavor = flavor;
        return this;
    }

    public setFilling(filling: string): this {
        this.filling = filling;
        return this;
    }

    public setSize(size: number): this {
        this.size = size;
        return this;
    }

    public setLayers(layers: number): this {
        this.layers = layers;
        return this;
    }

    public setFrostingType(frostingType: string): this {
        this.frostingType = frostingType;
        return this;
    }

    public setFrostingFlavor(frostingFlavor: string): this {
        this.frostingFlavor = frostingFlavor;
        return this;
    }

    public setDecorationType(decorationType: string): this {
        this.decorationType = decorationType;
        return this;
    }

    public setDecorationColor(decorationColor: string): this {
        this.decorationColor = decorationColor;
        return this;
    }

    public setCustomMessage(customMessage: string): this {
        this.customMessage = customMessage;
        return this;
    }

    public setShape(shape: string): this {
        this.shape = shape;
        return this;
    }

    public setAllergies(allergies: string): this {
        this.allergies = allergies;
        return this;
    }

    public setSpecialIngredients(specialIngredients: string): this {
        this.specialIngredients = specialIngredients;
        return this;
    }

    public setPackagingType(packagingType: string): this {
        this.packagingType = packagingType;
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

    public build(): Cake {
        if (this.id === undefined) {
            throw new Error("Cannot build Cake: required field 'id' is missing");
        }
        if (this.price === undefined) {
            throw new Error("Cannot build Cake: required field 'price' is missing");
        }
        if (this.quantity === undefined) {
            throw new Error("Cannot build Cake: required field 'quantity' is missing");
        }
        if (Number.isNaN(this.id) || Number.isNaN(this.price) || Number.isNaN(this.quantity)) {
            throw new Error("Cannot build Cake: id, price and quantity must be valid numbers");
        }

        return new Cake(
            this.id,
            this.type,
            this.flavor,
            this.filling,
            this.size,
            this.layers,
            this.frostingType,
            this.frostingFlavor,
            this.decorationType,
            this.decorationColor,
            this.customMessage,
            this.shape,
            this.allergies,
            this.specialIngredients,
            this.packagingType,
            this.price,
            this.quantity
        );
    }
}
