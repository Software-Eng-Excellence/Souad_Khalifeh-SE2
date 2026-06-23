import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import {readCSVFile, writeCSVFile} from "../src/util/parsers/csvParser";
import { readJSONFile, writeJSONFile } from "../src/util/parsers/jsonParser";
import { readXMLFile, writeXMLFile } from "../src/util/parsers/xmlParser";

describe("CSV Parser",()=>{
    it("should read a CSV file and return its content as a 2D array of strings",async()=>{
        const filePath = path.resolve(__dirname, "../src/data/cake_orders.csv");
        const result = await readCSVFile(filePath, true);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });
    it("handles an empty CSV file", async () => {
    const file = path.resolve(__dirname, "../src/data/test_empty.csv");
    const data = await readCSVFile(file, true);
    expect(data.length).toBe(0);
  });

    it("throws an error when CSV file does not exist", async () => {
    const file = path.resolve(__dirname, "../src/data/does_not_exist.csv");
    await expect(readCSVFile(file, true)).rejects.toThrow();
    });

    it("throws an error on malformed CSV", async () => {
    const file = path.resolve(__dirname, "../src/data/book_orders.json");
    await expect(readCSVFile(file, true)).rejects.toThrow();
    });
    it("should write a CSV file successfully", async () => {
  const filePath = path.resolve(__dirname, "../src/data/output_test.csv");

  const data = [
    ["name", "age"],
    ["Souad", "25"],
  ];

  await writeCSVFile(filePath, data);

  const content = await fsPromises.readFile(filePath, "utf-8");

  expect(content).toContain("name,age");
  expect(content).toContain("Souad,25");
});
it("throws error when file path is invalid", async () => {
  const invalidPath = "/invalid-path/output.csv";

  await expect(writeCSVFile(invalidPath, [["a", "b"]]))
    .rejects
    .toThrow("Error writing CSV file");
});

});

describe("JSON Parser",()=>{
    it("should read a JSON file and return its content as a JavaScript object", async()=>{
        const filePath = path.resolve(__dirname, "../src/data/book_orders.json");
        const result = await readJSONFile(filePath);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });
     it("handles an empty JSON array", async () => {
    const file = path.resolve(__dirname, "../src/data/test_empty.json");
    const data = await readJSONFile(file);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
  it("throws on invalid JSON", async () => {
    const file = path.resolve(__dirname, "../src/data/toy_orders.xml");
    await expect(readJSONFile(file)).rejects.toThrow();
  });
  it("throws an error when JSON file does not exist", async () => {
  const file = path.resolve(__dirname, "../src/data/does_not_exist.json");
  await expect(readJSONFile(file)).rejects.toThrow();
});
it("should write a JSON file successfully", async () => {
  const filePath = path.resolve(__dirname, "../src/data/output_test.json");

  const data = [
    { name: "Souad", age: 25 },
    { name: "Ali", age: 30 }
  ];

  await writeJSONFile(filePath, data);

  const content = await fsPromises.readFile(filePath, "utf-8");
  const parsed = JSON.parse(content);

  expect(parsed).toEqual(data);
});
it("throws error when writing JSON to invalid path", async () => {
  const invalidPath = "/invalid-path/output.json";

  await expect(writeJSONFile(invalidPath, { a: 1 }))
    .rejects
    .toThrow("Error writing JSON file");
});
    
});

describe("XML Parser",()=>{
    it("should read a XML file and return its content as a JavaScript object", async()=>{
        const filePath = path.resolve(__dirname, "../src/data/toy_orders.xml");
        const result = await readXMLFile(filePath);
        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        expect(result.data.row).toBeDefined();
        expect(Array.isArray(result.data.row)).toBe(true);
        expect(result.data.row.length).toBeGreaterThan(0);
    });
      it("handles an empty XML file", async () => {
    const file = path.resolve(__dirname, "../src/data/cake_orders.csv");
    await expect(readXMLFile(file)).rejects.toThrow();
  });
  it("throws an error when XML file does not exist", async () => {
  const file = path.resolve(__dirname, "../src/data/does_not_exist.xml");
  await expect(readXMLFile(file)).rejects.toThrow();
});
it("should write an XML file successfully", async () => {
  const filePath = path.resolve(__dirname, "../src/data/output_test.xml");

  const data = {
    data: {
      row: [
        { name: "Toy1", price: "10" },
        { name: "Toy2", price: "20" }
      ]
    }
  };

  await writeXMLFile(filePath, data);

  const content = await fsPromises.readFile(filePath, "utf-8");

  expect(content).toContain("<data>");
  expect(content).toContain("<row>");
  expect(content).toContain("Toy1");
});
it("throws error when writing XML to invalid path", async () => {
  const invalidPath = "../src/data/output.xml";

  await expect(writeXMLFile(invalidPath, { data: {} }))
    .rejects
    .toThrow();
});
});