import path from "path";
import { readCSVFile } from "../src/util/parsers/csvParser";
import { readJSONFile } from "../src/util/parsers/jsonParser";
import { readXMLFile } from "../src/util/parsers/xmlParser";
import { CakeMapper } from "../src/mapper/CakeMapper";
import { BookMapper, RawBook } from "../src/mapper/BookMapper";
import { ToyMapper, RawToy } from "../src/mapper/ToyMapper";
import { Cake } from "../src/model/Cake";
import { Book } from "../src/model/Book";
import { Toy } from "../src/model/Toy";

describe("CakeMapper", () => {
    const mapper = new CakeMapper();
    const validRow = [
        "0", "Sponge", "Vanilla", "Cream", "20", "2", "Buttercream", "Vanilla",
        "Sprinkles", "Multi-color", "Happy Birthday", "Round", "Nut-Free",
        "Organic Ingredients", "Standard Box", "50", "1",
    ];

    it("maps a raw CSV row into a Cake with converted types", () => {
        const cake = mapper.map(validRow);
        expect(cake).toBeInstanceOf(Cake);
        expect(cake.getId()).toBe(0);
        expect(cake.getFlavor()).toBe("Vanilla");
        expect(cake.getSize()).toBe(20);
        expect(cake.getPrice()).toBe(50);
        expect(cake.getQuantity()).toBe(1);
    });

    it("maps real data read by the CSV parser", async () => {
        const filePath = path.resolve(__dirname, "../src/data/cake_orders.csv");
        const rows = await readCSVFile(filePath, false);
        const cake = mapper.map(rows[0]);
        expect(cake).toBeInstanceOf(Cake);
        expect(Number.isNaN(cake.getPrice())).toBe(false);
    });

    it("throws when a required field is missing (incorrect data type -> NaN)", () => {
        const row = [...validRow];
        row[15] = ""; // Price empty -> Number("") is 0, so use a non-numeric value instead
        row[0] = "not-a-number";
        expect(() => mapper.map(row)).toThrow(/valid numbers/);
    });

    it("throws on a malformed (too short) row", () => {
        expect(() => mapper.map(["0", "Sponge"])).toThrow();
    });
});

describe("BookMapper", () => {
    const mapper = new BookMapper();
    const validRecord: RawBook = {
        "Order ID": "2001",
        "Book Title": "Edge of Eternity",
        "Author": "Dan Brown",
        "Genre": "Science Fiction",
        "Format": "Paperback",
        "Language": "French",
        "Publisher": "Oxford Press",
        "Special Edition": "Signed Copy",
        "Packaging": "Eco-Friendly Packaging",
        "Price": "12",
        "Quantity": "5",
    };

    it("maps a raw JSON object into a Book with converted types", () => {
        const book = mapper.map(validRecord);
        expect(book).toBeInstanceOf(Book);
        expect(book.getOrderId()).toBe(2001);
        expect(book.getAuthor()).toBe("Dan Brown");
        expect(book.getPrice()).toBe(12);
        expect(book.getQuantity()).toBe(5);
    });

    it("maps real data read by the JSON parser", async () => {
        const filePath = path.resolve(__dirname, "../src/data/book_orders.json");
        const records = await readJSONFile(filePath);
        const book = mapper.map(records[0]);
        expect(book).toBeInstanceOf(Book);
        expect(Number.isNaN(book.getOrderId())).toBe(false);
    });

    it("throws on incorrect data type for a numeric field", () => {
        const bad = { ...validRecord, "Price": "twelve" };
        expect(() => mapper.map(bad)).toThrow(/valid numbers/);
    });

    it("throws on malformed input missing required fields", () => {
        const bad = { "Book Title": "Orphan" } as unknown as RawBook;
        expect(() => mapper.map(bad)).toThrow();
    });
});

describe("ToyMapper", () => {
    const mapper = new ToyMapper();
    const validRecord: RawToy = {
        OrderID: ["5001"],
        Type: ["Plush Toy"],
        AgeGroup: ["13+"],
        Brand: ["FunTime"],
        Material: ["Fabric"],
        BatteryRequired: ["Yes"],
        Educational: ["No"],
        Price: ["247"],
        Quantity: ["7"],
    };

    it("maps a raw XML row into a Toy with unwrapped/converted values", () => {
        const toy = mapper.map(validRecord);
        expect(toy).toBeInstanceOf(Toy);
        expect(toy.getOrderId()).toBe(5001);
        expect(toy.getBrand()).toBe("FunTime");
        expect(toy.isBatteryRequired()).toBe(true);
        expect(toy.isEducational()).toBe(false);
        expect(toy.getPrice()).toBe(247);
    });

    it("maps real data read by the XML parser", async () => {
        const filePath = path.resolve(__dirname, "../src/data/toy_orders.xml");
        const result = await readXMLFile(filePath);
        const toy = mapper.map(result.data.row[0]);
        expect(toy).toBeInstanceOf(Toy);
        expect(Number.isNaN(toy.getOrderId())).toBe(false);
    });

    it("throws on incorrect data type for a numeric field", () => {
        const bad: RawToy = { ...validRecord, Price: ["free"] };
        expect(() => mapper.map(bad)).toThrow(/valid numbers/);
    });

    it("throws on malformed input with missing fields", () => {
        const bad = { Type: ["Mystery"] } as unknown as RawToy;
        expect(() => mapper.map(bad)).toThrow();
    });
});
