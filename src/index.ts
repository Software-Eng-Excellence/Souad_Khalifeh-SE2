import path from "path";
import logger from "./util/logger";
import { readCSVFile } from "./util/parsers/csvParser";
import { readJSONFile } from "./util/parsers/jsonParser"; 

const csvFile = path.resolve(__dirname, "data/cake_orders.csv");
const jsonFile = path.resolve(__dirname, "data/book_orders.json");

async function main(){
  try {
    //Read CSV data
      const orders = await readCSVFile(csvFile, true);
      //for each data row, log the row 
      orders.forEach((row)=>logger.info(row));

      //Read JSON data
      const books = await readJSONFile(jsonFile);
      books.forEach((name: string)=>logger.info(JSON.stringify(books)));

  }catch(err){
    logger.error("Error in Parse: %s", err);
  }

}

main();
