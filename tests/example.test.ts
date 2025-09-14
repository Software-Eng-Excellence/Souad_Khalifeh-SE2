describe('Math functions',()=>{
    it('should return 4 when adding 2 and 2',()=>{
        expect(2+2).toBe(4);
    });

    it('should return 0 when subtracting 2 from 2',()=>{
        expect(2-2).toBe(0);
    })
});

describe("Example suite",()=>{
    beforeAll(() => {
        console.log("Before all tests");
    });

    afterAll(() => {
        console.log("After all tests.");
    });

    beforeEach(() => {
        console.log("Before each test");
    });

    afterEach(() => {
        console.log("After each test.");
    });

    it("should run the first test", () => {
        console.log("First test.");
    });
        it("should run the second test", () => {
        console.log("Second test.");
    });
})