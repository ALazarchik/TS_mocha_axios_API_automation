import { restfulBookerService } from "../utils/services/restfulBooker.service";
import { expect } from "chai";
import { checkSchema } from "../utils/helpers/checks";
import { ASSERTION_ERRORS } from "../data/constants";
import { before } from "mocha";

describe("GET requests: ", () => {
    before("health check", async () => {
        const healthCheckResponse = await restfulBookerService.healthCheck();
        if (healthCheckResponse.status !== 201) {
            throw new Error("Restfull Booker API doesn't work");
        }
    });

    it("get all booking ids", async () => {
        const schemaPath = "./src/utils/schemas/get.allBookingIds.schema.json";
        const response = await restfulBookerService.getAllBookingsIds();
        expect(response.status).to.be.equal(200, ASSERTION_ERRORS.RESPONSE_STATUS(200));
        const responseData = response.data;
        await checkSchema(schemaPath, responseData);
    });

    it("get booking by id", async () => {
        const schemaPath = "./src/utils/schemas/get.bookingById.json";
        const allBookingsResponse = await restfulBookerService.getAllBookingsIds();
        expect(allBookingsResponse.status).to.be.equal(200, ASSERTION_ERRORS.RESPONSE_STATUS(200));
        const response = await restfulBookerService.getBookingById(allBookingsResponse.data[0].bookingid);
        expect(response.status).to.be.equal(200, ASSERTION_ERRORS.RESPONSE_STATUS(200));
        const responseData = response.data;
        await checkSchema(schemaPath, responseData);
    });
});