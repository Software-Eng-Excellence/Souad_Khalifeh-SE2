import fs from 'fs'; 

/*
Reads a JSON file and returns its content as a JavaScript object
@param filePath - the path to the JSON file
@returns a promise that resolves to the parsed JavaScript object
*/
export async function readJSONFile(filePath:string): Promise<any> {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error reading or parsing JSON file: ${error}`);
    }
}


// Writes a JavaScript object to a JSON file
export async function writeJSONFile(filePath:string, data: any): Promise<void> {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf8');
    } catch (error) {
        throw new Error (`Error writing JSON file: ${error}`);

    }
}
