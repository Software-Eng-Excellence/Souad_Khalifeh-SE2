import path from "path";
import logger from "./util/logger";
import { readCSVFile } from "./util/parser";

const filePath = path.resolve(__dirname, "data/cake_orders.csv");

async function main(){
  try {
      const data = await readCSVFile(filePath, true);
      //for each data row, log the row 
      data.forEach((row)=>logger.info(row));
  }catch(err){
    logger.error("Error in CSV Parse: %s", err);
  }

}

main();
