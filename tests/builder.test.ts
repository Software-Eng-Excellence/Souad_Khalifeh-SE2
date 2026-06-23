import { CakeBuilder } from "../src/model/CakeBuilder";
import { BookBuilder } from "../src/model/BookBuilder";
import { ToyBuilder } from "../src/model/ToyBuilder";
import { Cake } from "../src/model/Cake";
import { Book } from "../src/model/Book";
import { Toy } from "../src/model/Toy";

describe("CakeBuilder", () => {
    it("builds a Cake with the provided values", () => {
        const cake = new CakeBuilder()
            .setId(0)
            .setType("Sponge")
            .setFlavor("Vanilla")
            .setFilling("Cream")
            .setSize(20)
            .setLayers(2)
            .setFrostingType("Buttercream")
            .setFrostingFlavor("Vanilla")
            .setDecorationType("Sprinkles")
            .setDecorationColor("Multi-color")
            .setCustomMessage("Happy Birthday")
            .setShape("Round")
            .setAllergies("Nut-Free")
            .setSpecialIngredients("Organic Ingredients")
            .setPackagingType("Standard Box")
            .setPrice(50)
            .setQuantity(1)
            .build();

        expect(cake).toBeInstanceOf(Cake);
        expect(cake.getId()).toBe(0);
        expect(cake.getType()).toBe("Sponge");
        expect(cake.getFlavor()).toBe("Vanilla");
        expect(cake.getFilling()).toBe("Cream");
        expect(cake.getSize()).toBe(20);
        expect(cake.getLayers()).toBe(2);
        expect(cake.getFrostingType()).toBe("Buttercream");
        expect(cake.getFrostingFlavor()).toBe("Vanilla");
        expect(cake.getDecorationType()).toBe("Sprinkles");
        expect(cake.getDecorationColor()).toBe("Multi-color");
        expect(cake.getCustomMessage()).toBe("Happy Birthday");
        expect(cake.getShape()).toBe("Round");
        expect(cake.getAllergies()).toBe("Nut-Free");
        expect(cake.getSpecialIngredients()).toBe("Organic Ingredients");
        expect(cake.getPackagingType()).toBe("Standard Box");
        expect(cake.getPrice()).toBe(50);
        expect(cake.getQuantity()).toBe(1);
    });

    it("defaults optional fields when not set", () => {
        const cake = new CakeBuilder().setId(1).setPrice(10).setQuantity(2).build();
        expect(cake.getType()).toBe("");
        expect(cake.getLayers()).toBe(0);
    });

    it("throws when a required field is missing", () => {
        expect(() => new CakeBuilder().setPrice(50).setQuantity(1).build()).toThrow(/id/);
        expect(() => new CakeBuilder().setId(0).setQuantity(1).build()).toThrow(/price/);
        expect(() => new CakeBuilder().setId(0).setPrice(50).build()).toThrow(/quantity/);
    });

    it("throws when a numeric field is NaN", () => {
        expect(() =>
            new CakeBuilder().setId(Number("abc")).setPrice(50).setQuantity(1).build()
        ).toThrow(/valid numbers/);
    });
});

describe("BookBuilder", () => {
    it("builds a Book with the provided values", () => {
        const book = new BookBuilder()
            .setOrderId(2001)
            .setBookTitle("Edge of Eternity")
            .setAuthor("Dan Brown")
            .setGenre("Science Fiction")
            .setFormat("Paperback")
            .setLanguage("French")
            .setPublisher("Oxford Press")
            .setSpecialEdition("Signed Copy")
            .setPackaging("Eco-Friendly Packaging")
            .setPrice(12)
            .setQuantity(5)
            .build();

        expect(book).toBeInstanceOf(Book);
        expect(book.getOrderId()).toBe(2001);
        expect(book.getBookTitle()).toBe("Edge of Eternity");
        expect(book.getAuthor()).toBe("Dan Brown");
        expect(book.getGenre()).toBe("Science Fiction");
        expect(book.getFormat()).toBe("Paperback");
        expect(book.getLanguage()).toBe("French");
        expect(book.getPublisher()).toBe("Oxford Press");
        expect(book.getSpecialEdition()).toBe("Signed Copy");
        expect(book.getPackaging()).toBe("Eco-Friendly Packaging");
        expect(book.getPrice()).toBe(12);
        expect(book.getQuantity()).toBe(5);
    });

    it("throws when a required field is missing", () => {
        expect(() => new BookBuilder().setPrice(12).setQuantity(5).build()).toThrow(/orderId/);
        expect(() => new BookBuilder().setOrderId(2001).setQuantity(5).build()).toThrow(/price/);
        expect(() => new BookBuilder().setOrderId(2001).setPrice(12).build()).toThrow(/quantity/);
    });

    it("throws when a numeric field is NaN", () => {
        expect(() =>
            new BookBuilder().setOrderId(2001).setPrice(Number("xyz")).setQuantity(5).build()
        ).toThrow(/valid numbers/);
    });
});

describe("ToyBuilder", () => {
    it("builds a Toy with the provided values", () => {
        const toy = new ToyBuilder()
            .setOrderId(5001)
            .setType("Plush Toy")
            .setAgeGroup("13+")
            .setBrand("FunTime")
            .setMaterial("Fabric")
            .setBatteryRequired(true)
            .setEducational(true)
            .setPrice(247)
            .setQuantity(7)
            .build();

        expect(toy).toBeInstanceOf(Toy);
        expect(toy.getOrderId()).toBe(5001);
        expect(toy.getType()).toBe("Plush Toy");
        expect(toy.getAgeGroup()).toBe("13+");
        expect(toy.getBrand()).toBe("FunTime");
        expect(toy.getMaterial()).toBe("Fabric");
        expect(toy.isBatteryRequired()).toBe(true);
        expect(toy.isEducational()).toBe(true);
        expect(toy.getPrice()).toBe(247);
        expect(toy.getQuantity()).toBe(7);
    });

    it("defaults boolean fields to false when not set", () => {
        const toy = new ToyBuilder().setOrderId(5002).setPrice(67).setQuantity(1).build();
        expect(toy.isBatteryRequired()).toBe(false);
        expect(toy.isEducational()).toBe(false);
    });

    it("throws when a required field is missing", () => {
        expect(() => new ToyBuilder().setPrice(247).setQuantity(7).build()).toThrow(/orderId/);
        expect(() => new ToyBuilder().setOrderId(5001).setQuantity(7).build()).toThrow(/price/);
        expect(() => new ToyBuilder().setOrderId(5001).setPrice(247).build()).toThrow(/quantity/);
    });

    it("throws when a numeric field is NaN", () => {
        expect(() =>
            new ToyBuilder().setOrderId(5001).setPrice(247).setQuantity(Number("oops")).build()
        ).toThrow(/valid numbers/);
    });
});
