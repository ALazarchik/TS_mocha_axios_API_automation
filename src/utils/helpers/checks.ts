import { expect, use } from "chai";
import chaiJsonSchema from "chai-json-schema";
import * as fs from "fs";
import { ENCODING } from "../../data/constants";

use(chaiJsonSchema);

export async function checkSchema(pathToJsonSchema: string, responseData: unknown) {
    const jsonFile = fs.readFileSync(pathToJsonSchema, ENCODING.UTF8);
    const schema = JSON.parse(jsonFile);
    expect(responseData).to.be.jsonSchema(schema);
}