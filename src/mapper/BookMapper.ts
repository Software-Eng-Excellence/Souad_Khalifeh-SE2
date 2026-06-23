import { IMapper } from "./IMapper";
import { Book } from "../model/Book";
import { BookBuilder } from "../model/BookBuilder";

export interface RawBook {
    "Order ID": string;
    "Book Title": string;
    "Author": string;
    "Genre": string;
    "Format": string;
    "Language": string;
    "Publisher": string;
    "Special Edition": string;
    "Packaging": string;
    "Price": string;
    "Quantity": string;
}

export class BookMapper implements IMapper<RawBook, Book> {
    public map(record: RawBook): Book {
        return new BookBuilder()
            .setOrderId(Number(record["Order ID"]))
            .setBookTitle(record["Book Title"])
            .setAuthor(record["Author"])
            .setGenre(record["Genre"])
            .setFormat(record["Format"])
            .setLanguage(record["Language"])
            .setPublisher(record["Publisher"])
            .setSpecialEdition(record["Special Edition"])
            .setPackaging(record["Packaging"])
            .setPrice(Number(record["Price"]))
            .setQuantity(Number(record["Quantity"]))
            .build();
    }
}
