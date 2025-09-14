import { OrderManagement, FinanceCalculator, PremiumOrderManagement, Validator, PriceValidator, ItemValidator, MaxPriceValidator } from "app-clean";

// Main 
const listOrders = [
  { id: 1, item: "Sponge", price: 15 },
  { id: 2, item: "Chocolate", price: 20 },
  { id: 3, item: "Fruit", price: 18 },
  { id: 4, item: "Red Velvet", price: 25 },
  { id: 5, item: "Coffee", price: 8 },
];
const rules=[
        new PriceValidator(),
        new ItemValidator(),
        new MaxPriceValidator()

    ];
const orderManager= new PremiumOrderManagement(new Validator(rules), new FinanceCalculator());
for (const order of listOrders){
    orderManager.addOrders(order.item, order.price);
}

const nItem = "Marble";
const nPrice = 22;

orderManager.addOrders(nItem,nPrice);

console.log("Orders after adding a new order:", orderManager.getOrders());

console.log("Total Revenue:",  orderManager.getTotalRevenue());

console.log("Average Buy Power:", orderManager.getBuyPower());

const fetchid=2;
const fetchOrder=orderManager.fetchOrder(fetchid);
console.log(`Order with ID", ${fetchid}, ${fetchOrder}`)

const nonExistId=2;
const notExistOrder=orderManager.fetchOrder(nonExistId);
console.log(`Order with ID", ${nonExistId}, ${notExistOrder}`)