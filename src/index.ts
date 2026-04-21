import path from "path";
import logger from "./util/logger";
import { readCSVFile } from "./util/parsers/csvParser";
import { readJSONFile } from "./util/parsers/jsonParser"; 
import { readXMLFile } from "./util/parsers/xmlParser";

const csvFile = path.resolve(__dirname, "data/cake_orders.csv");
const jsonFile = path.resolve(__dirname, "data/book_orders.json");
const xmlFile = path.resolve(__dirname, "data/toy_orders.xml"); 

async function main(){
  try {
    //Read CSV data
      const orders = await readCSVFile(csvFile, true);
      //for each data row, log the row 
      orders.forEach((row)=>logger.info(row));

      //Read JSON data
      const books = await readJSONFile(jsonFile);
      books.forEach((name: string)=>logger.info(JSON.stringify(books)));

      //Read XML data
      const toys = await readXMLFile(xmlFile);
      // logger.info(JSON.stringify(toys));
      if (toys?.data?.row && Array.isArray(toys.data.row)) {
        toys.data.row.forEach((toy: any) => logger.info(JSON.stringify(toy)));
      }

  }catch(err){
    logger.error("Error in Parse: %s", err);
  }

}

main();
