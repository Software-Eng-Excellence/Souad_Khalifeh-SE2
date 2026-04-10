import {FinanceCalculator, Order, OrderManagement, Validator} from "../src/app";

describe("OrderManagement", () => {
    let validator: Validator;
    let calculator: FinanceCalculator;
    let orderManager: OrderManagement;
    let baseValidator:(order: Order)=> void;
    //beforeAll, new valdator and calculator for each test
    beforeAll(() => {
        validator = new Validator([]);
        calculator = new FinanceCalculator();    });

    //before each test, we create new order manager 
    beforeEach(() => {
        baseValidator=validator.validate;
        validator.validate=jest.fn();
        orderManager = new OrderManagement(validator, calculator);
    });
    //after each, reset order manager
    afterEach(() => {
        validator.validate=baseValidator;

    });

    //after all, reset validator and calculator



    it ("should add an order", () => {
        //Arrange
        const validator = new Validator([]);
        const calculator = new FinanceCalculator();
        const orderManager = new OrderManagement(validator,calculator);
        const item = "Sponge";
        const price = 15;

        //Act
        orderManager.addOrders(item, price);

        //Assert
        expect(orderManager.getOrders()).toEqual([{ id: 1, item, price }]);
    });

    it("should fetch an order by ID", () => {
        //Arrange
        const validator = new Validator([]);
        const calculator = new FinanceCalculator();
        const orderManager = new OrderManagement(validator,calculator);
        const item = "Sponge";
        const price = 15;
        orderManager.addOrders(item, price);

        //Act
        const order = orderManager.fetchOrder(1);

        //Assert
        expect(order).toEqual({ id: 1, item, price });
    });

    it ("should call finance calculator to get total revenue", () => {
        //Arrange 
        const item= "Sponge";
        const price = 15;
        orderManager.addOrders(item, price);
        const spy = jest.spyOn(calculator, "getRevenue");

        //Act
        orderManager.getTotalRevenue();

        //Assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([{ id: 1, item, price }]);
        expect(spy).toHaveReturnedWith(15);

    });

    it ("should throw addition exception if validator does not pass", () => {       
        //Arrange
        const item= "Sponge";
        const price = 15;
       ( validator.validate as jest.Mock).mockImplementation(() => {
            throw new Error("Validation failed");
        });
        // ACt & Assert
        expect(() => orderManager.addOrders(item,price)).toThrow("[Order Management]Failed to add order: Validation failed");
    });
});


describe("FinanceCalculator", () => {
    it("should calculate total revenue", () => {
        //Arrange   
        const calculator = new FinanceCalculator();
        const orders = [
            { id: 1, item: "Sponge", price: 15 },
            { id: 2, item: "Chocolate", price: 20 },
            { id: 3, item: "Fruit", price: 18 },
        ];
        //aCT 
        const totalRevenue = calculator.getRevenue(orders);

        //Assert
        expect(totalRevenue).toBe(53);
    });

    it("should calculate average buy power", () => {
        //Arrange   
        const calculator = new FinanceCalculator();
        const orders = [
            { id: 1, item: "Sponge", price: 15 },
            { id: 2, item: "Chocolate", price: 20 },
            { id: 3, item: "Fruit", price: 18 },
        ];
        //aCT 
        const averageBuyPower = calculator.getAverageBuyPower(orders);
        //Assert
        expect(averageBuyPower).toBeCloseTo(17.67, 2);
    });
});