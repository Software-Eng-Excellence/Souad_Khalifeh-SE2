import { FinanceCalculator, Order, OrderManagement, Validator } from "../src/app-clean";

describe ("OrderManagement",()=>{
    //Before all, new validator and new calculator 
    //before each, new order manager 
    let validator: Validator;
    let calc: FinanceCalculator;
    let orderManager:OrderManagement;
    let baseValidator:(order: Order)=>void;
    beforeAll(()=>{
        validator=new Validator();
        calc=new FinanceCalculator();
    });
    beforeEach(()=>{
        baseValidator=validator.validate;
        validator.validate=jest.fn();
        orderManager=new OrderManagement(validator,calc);
    });
    afterEach(()=>{
        validator.validate=baseValidator;
    });

    it('should add an order',()=>{
        //Arrange
        const item ="Sponge";
        const price=15;

        // Act 
        orderManager.addOrders(item,price);

        //Assert
        expect(orderManager.getOrders()).toEqual([{id:1,item,price}])
    });
    it("should get a specific order",()=>{
        //Arrange
        const item="Sponge";
        const price =15;
        orderManager.addOrders(item,price);

        //Act 
        const order =orderManager.fetchOrder(1);

        //Assert
        expect(order).toEqual({id:1, item, price});
    });
    it("should call financial calculator getRevenue",()=>{
        //Arrange
        const item="Sponge";
        const price =15;
        orderManager.addOrders(item,price);
        const spy=jest.spyOn(calc,"getRevenue"); 

        //Act
        orderManager.getTotalRevenue();

        //Assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([{id:1, item, price}]);
        expect(spy).toHaveReturnedWith(15);
    });
    it("should throw addition exception if validator does not pass",()=>{
        //Arrange
        const item="Sponge";
        const price =10;
        (validator.validate as jest.Mock).mockImplementation(()=>{
            throw new Error("Invalid order");
        });

        //Assert
        expect(()=>orderManager.addOrders(item,price)).toThrow("Order Management error adding order:Invalid order")
    });

});

describe("FinanceCalculator",()=>{
    it('should get the total revenue',()=>{
        //Arrange
        const calc= new FinanceCalculator();
        const orders=[
            {id: 1, item:"Sponge",price:15},
            {id: 2, item:"Chocolate",price:10},
            {id: 3, item:"Fruit",price:5}
        ];
        //Act
        const revenue =calc.getRevenue(orders);

        //Assert
        expect(revenue).toEqual(30);
    });
    it('should get the average buy power',()=>{
        //Arrange
        const calc= new FinanceCalculator();
        const orders=[
            {id: 1, item:"Sponge",price:15},
            {id: 2, item:"Chocolate",price:10},
            {id: 3, item:"Fruit",price:5}
        ];
        //Act
        const revenue =calc.getAverageBuyPower(orders);

        //Assert
        expect(revenue).toEqual(10);
    });
})