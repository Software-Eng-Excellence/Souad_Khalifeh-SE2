/**
 * Class model representing a Book order.
 * Properties are private (encapsulation) and exposed only through getters.
 */
export class Book {
    constructor(
        private orderId: number,
        private bookTitle: string,
        private author: string,
        private genre: string,
        private format: string,
        private language: string,
        private publisher: string,
        private specialEdition: string,
        private packaging: string,
        private price: number,
        private quantity: number
    ) {}

    public getOrderId(): number {
        return this.orderId;
    }

    public getBookTitle(): string {
        return this.bookTitle;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getGenre(): string {
        return this.genre;
    }

    public getFormat(): string {
        return this.format;
    }

    public getLanguage(): string {
        return this.language;
    }

    public getPublisher(): string {
        return this.publisher;
    }

    public getSpecialEdition(): string {
        return this.specialEdition;
    }

    public getPackaging(): string {
        return this.packaging;
    }

    public getPrice(): number {
        return this.price;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}
