/**
 * Class model representing a Cake order.
 * Properties are private (encapsulation) and exposed only through getters.
 */
export class Cake {
    constructor(
        private id: number,
        private type: string,
        private flavor: string,
        private filling: string,
        private size: number,
        private layers: number,
        private frostingType: string,
        private frostingFlavor: string,
        private decorationType: string,
        private decorationColor: string,
        private customMessage: string,
        private shape: string,
        private allergies: string,
        private specialIngredients: string,
        private packagingType: string,
        private price: number,
        private quantity: number
    ) {}

    public getId(): number {
        return this.id;
    }

    public getType(): string {
        return this.type;
    }

    public getFlavor(): string {
        return this.flavor;
    }

    public getFilling(): string {
        return this.filling;
    }

    public getSize(): number {
        return this.size;
    }

    public getLayers(): number {
        return this.layers;
    }

    public getFrostingType(): string {
        return this.frostingType;
    }

    public getFrostingFlavor(): string {
        return this.frostingFlavor;
    }

    public getDecorationType(): string {
        return this.decorationType;
    }

    public getDecorationColor(): string {
        return this.decorationColor;
    }

    public getCustomMessage(): string {
        return this.customMessage;
    }

    public getShape(): string {
        return this.shape;
    }

    public getAllergies(): string {
        return this.allergies;
    }

    public getSpecialIngredients(): string {
        return this.specialIngredients;
    }

    public getPackagingType(): string {
        return this.packagingType;
    }

    public getPrice(): number {
        return this.price;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}
