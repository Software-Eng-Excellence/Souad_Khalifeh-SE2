import logger from "./util/logger";
import { readCSVFile } from "./util/parser";


async function main(){
  const data = await readCSVFile("src/data/cake_orders.csv");
  //for each data row, log the row 
  data.forEach((row)=>logger.info(data));
}

main();
