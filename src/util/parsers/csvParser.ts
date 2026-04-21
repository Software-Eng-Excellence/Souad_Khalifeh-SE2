//Reads a CSV & returns its content as a 2D array of strings
import { promises as fs } from 'fs'; //file system module with promises
import {parse as csvParse} from 'csv-parse';
import {stringify as csvStringify} from 'csv-stringify';

/* 
* Reads a CSV file and return its contents as a 2D array of strings 
* @param filePath - the path to the CSV file
* @param includeHeader - whether to include the header row in the output (default: false)
* @returns a promise that resolves to a 2D array of strings representing the CSV data
*/
export async function readCSVFile(filePath:string,includeHeader: boolean =false): Promise<string[][]> {
    try{
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return new Promise ((resolve, reject)=>{
            csvParse(fileContent,{
                trim: true, 
                skip_empty_lines: true,
            },(err, records: string[][])=>{
                if(err) reject(err);
                if (!includeHeader)records.shift();
                resolve(records);
            });
        });
    } catch(error){
        throw new Error (`Error reading CSV file: ${error}`);
    }
}

//Writes a 2D array of strings to a CSV File 

export async function writeCSVFile(filePath:string, data: string [][]):Promise<void>{
    try{
        const csvContent = await new Promise<string>((resolve, reject )=>{
            csvStringify(data,(err, output)=>{
                if(err)  reject (err);
                resolve(output);
            });
        });
        await fs.writeFile(filePath, csvContent, 'utf-8')
    }catch(error){
        throw new Error (`Error writing CSV file: ${error}`)
    };
}
