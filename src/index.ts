import { OrderManagement, FinanceCalculator, PremiumOrderManagement, Validator, PriceValidator, ItemValidator, MaxPriceValidator } from "./app-clean";
import logger from "./util/logger"
// Main 
const listOrders = [
  { id: 1, item: "Sponge", price: 15 },
  { id: 2, item: "Chocolate", price: 20 },
  { id: 3, item: "Fruit", price: 18 },
  { id: 4, item: "Red Velvet", price: 25 },
  { id: 5, item: "Coffee", price: 8 },
];
// const rules=[
//         new PriceValidator(),
//         new ItemValidator(),
//         new MaxPriceValidator()

//     ];
const orderManager= new PremiumOrderManagement(new Validator(), new FinanceCalculator());
for (const order of listOrders){
    orderManager.addOrders(order.item, order.price);
}

const nItem = "Marble";
const nPrice = 22;

orderManager.addOrders(nItem,nPrice);

logger.info("Orders after adding a new order: %o", orderManager.getOrders());

logger.info("Total Revenue: %d",  orderManager.getTotalRevenue());

logger.info("Average Buy Power: %d", orderManager.getBuyPower());

const fetchid=2;
const fetchOrder=orderManager.fetchOrder(fetchid);
logger.info("Order with ID %d", fetchid, fetchOrder)

const nonExistId=10;
const notExistOrder=orderManager.fetchOrder(nonExistId);
logger.info("Order with ID %d not exists", nonExistId, notExistOrder)