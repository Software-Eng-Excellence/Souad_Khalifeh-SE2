/**
 * Class model representing a Toy order.
 * Properties are private (encapsulation) and exposed only through getters.
 */
export class Toy {
    constructor(
        private orderId: number,
        private type: string,
        private ageGroup: string,
        private brand: string,
        private material: string,
        private batteryRequired: boolean,
        private educational: boolean,
        private price: number,
        private quantity: number
    ) {}

    public getOrderId(): number {
        return this.orderId;
    }

    public getType(): string {
        return this.type;
    }

    public getAgeGroup(): string {
        return this.ageGroup;
    }

    public getBrand(): string {
        return this.brand;
    }

    public getMaterial(): string {
        return this.material;
    }

    public isBatteryRequired(): boolean {
        return this.batteryRequired;
    }

    public isEducational(): boolean {
        return this.educational;
    }

    public getPrice(): number {
        return this.price;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}
