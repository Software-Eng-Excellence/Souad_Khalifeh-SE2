describe("Test Lifecycle", () => {
    beforeAll(() => {
        console.log("beforeAll: runs once before all tests");
    });

    beforeEach(() => {
        console.log("beforeEach: runs before each test");
    });

    afterEach(() => {
        console.log("afterEach: runs after each test");
    });

    afterAll(() => {
        console.log("afterAll: runs once after all tests");
    });

    it("should log lifecycle on first test", () => {
        console.log("executing first test");
        expect(true).toBe(true);
    });

    it("should log lifecycle on second test", () => {
        console.log("executing second test");
        expect(true).toBe(true);
    });
});