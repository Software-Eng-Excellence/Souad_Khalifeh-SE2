import { Book } from "./Book";

/**
 * Builder for the Book model.
 * Use the set* methods to provide values (chainable), then call build()
 * to get a fully constructed Book. build() throws if a required field
 * (orderId, price, quantity) is missing or not a valid number.
 */
export class BookBuilder {
    private orderId?: number;
    private bookTitle: string = "";
    private author: string = "";
    private genre: string = "";
    private format: string = "";
    private language: string = "";
    private publisher: string = "";
    private specialEdition: string = "";
    private packaging: string = "";
    private price?: number;
    private quantity?: number;

    public setOrderId(orderId: number): this {
        this.orderId = orderId;
        return this;
    }

    public setBookTitle(bookTitle: string): this {
        this.bookTitle = bookTitle;
        return this;
    }

    public setAuthor(author: string): this {
        this.author = author;
        return this;
    }

    public setGenre(genre: string): this {
        this.genre = genre;
        return this;
    }

    public setFormat(format: string): this {
        this.format = format;
        return this;
    }

    public setLanguage(language: string): this {
        this.language = language;
        return this;
    }

    public setPublisher(publisher: string): this {
        this.publisher = publisher;
        return this;
    }

    public setSpecialEdition(specialEdition: string): this {
        this.specialEdition = specialEdition;
        return this;
    }

    public setPackaging(packaging: string): this {
        this.packaging = packaging;
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

    public build(): Book {
        if (this.orderId === undefined) {
            throw new Error("Cannot build Book: required field 'orderId' is missing");
        }
        if (this.price === undefined) {
            throw new Error("Cannot build Book: required field 'price' is missing");
        }
        if (this.quantity === undefined) {
            throw new Error("Cannot build Book: required field 'quantity' is missing");
        }
        if (Number.isNaN(this.orderId) || Number.isNaN(this.price) || Number.isNaN(this.quantity)) {
            throw new Error("Cannot build Book: orderId, price and quantity must be valid numbers");
        }

        return new Book(
            this.orderId,
            this.bookTitle,
            this.author,
            this.genre,
            this.format,
            this.language,
            this.publisher,
            this.specialEdition,
            this.packaging,
            this.price,
            this.quantity
        );
    }
}
