//SOLID Principles 

// 1- Single Responsibility Principle (SRP)
// 2- Open Closed Principle (OCP)
// 3- Liskov Subsititution Principle (LSP)
// 4 - Interface Segregation Priciple (ISP)
// 5- Dependency Inversion Princile (DIP)
export interface Order{
    id: number;
    price: number;
    item: string;

}
export class OrderManagement{
    private orders: Order[] = [];
    constructor(private validator:IValidator,private calculator: ICalculator){

    }
    getOrders(){
        return this.orders
    }
    addOrders(item:string , price: number){
        const order:Order ={id:this.orders.length+1, item, price};
        this.validator.validate(order);
        this.orders.push(order);
    }
    fetchOrder(id:number){
        return this.getOrders().find(order =>order.id===id)
    }
    getTotalRevenue(){
        return this.calculator.getRevenue(this.orders);
    }
    getBuyPower(){
        return this.calculator.getAverageBuyPower(this.orders);
    }
}
export class PremiumOrderManagement extends OrderManagement{
    //Kel shi bdda ta3mlo hon bddo ykun override l yalle bt3mlo l OrderManagement, m fina nekhla2 new methods gher private mesh l2n extends OrderManagement
    fetchOrder(id: number): Order | undefined {
        console.log("ALERT: Premium Order being fetched")
        return super.fetchOrder(id);
    }

}

interface IValidator{
    validate(order:Order):void;
}
interface IPossibleItems{
    getPossibleItems():string[];
}
export class Validator implements IValidator{
    constructor(private rules:IValidator[]){

    }
    validate(order:Order):void{
        this.rules.forEach(rule=>rule.validate(order));

    }

}

export class ItemValidator implements IValidator, IPossibleItems{
    getPossibleItems(): string[] {
        return ItemValidator.possibleItems;
    }
    private static possibleItems = [
        "Sponge",
        "Chocolate",
        "Fruit",
        "Red Velvet",
        "Birthday",
        "Carrot",
        "Marble",
        "Coffee",
        ]; 
        validate(order:Order){
            if( !ItemValidator.possibleItems.includes(order.item)){
            throw new Error(`Invalid item. Must be one of ${ItemValidator.possibleItems.join(", ")}`);
        }
    }  
}     
export class PriceValidator implements IValidator{
    validate(order:Order){
        if (order.price <=0){
            throw new Error ("Price must be greater than 0")
        }
    }
}

export class MaxPriceValidator implements IValidator{
    validate(order:Order){
        if (order.price>100){
            throw new Error ("Price must be less than 100")
        }
    }
}
interface ICalculator{
    getRevenue(orders:Order []):number;
    getAverageBuyPower(orders:Order[]):number;
}
export class FinanceCalculator implements ICalculator{
    // Calculate Total Revenue 
    public getRevenue(orders:Order[]){
        return  orders.reduce((total, order) => total + order.price, 0);
    }
    //Average Buy Power directly
    public getAverageBuyPower(orders:Order[]){
        return orders.length === 0 ? 0 : this.getRevenue(orders) / orders.length;
        
    }
}

