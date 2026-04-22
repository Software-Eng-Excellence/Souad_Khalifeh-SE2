import fs from 'fs'; 
const xml2js = require("xml2js");

const parser = new xml2js.Parser();
const builder = new xml2js.Builder();
/*
Reads a XML file and returns its content as a JavaScript object
@param filePath - the path to the XML file
@returns a promise that resolves to the parsed JavaScript object
*/
export function readXMLFile(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return reject(err);

      parser.parseString(data, (err: Error | null, result: any) => {
        if (err) return reject(err);

        resolve(result);
      });
    });
  });
}

/**
 * Writes a JS object back to XML file
 */
export function writeXMLFile(filePath: string, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const xmlData = builder.buildObject(data);

    fs.writeFile(filePath, xmlData, "utf8", (err) => {
      if (err) return reject(err);

      resolve();
    });
  });
}